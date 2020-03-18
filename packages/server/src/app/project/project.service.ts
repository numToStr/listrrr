import { Types } from "mongoose";
import { Service, Inject } from "typedi";
import { UserInputError } from "apollo-server-errors";
import { Connection, connectionFromArraySlice } from "graphql-relay";
import { TokenPayload, MongoSelectionSet } from "../../@types/types";
import { Project, ProjectConnection } from "./project.schema";
import { Filters, RearrangeColumnInput } from "../shared/shared.schema";
import { parseQueryFilters } from "../../utils/fns/object.util";
import { ProjectDAL } from "./project.dal";
import {
    CreateProjectInput,
    RearrangeColumnFindInput,
} from "./project.resolver";
import { TemplateDAL } from "../template/template.dal";
import { ColumnDAL } from "../column/column.dal";
import { ConnectionArgsType } from "../../utils/schema/connection";

@Service()
export class ProjectService {
    @Inject("USER")
    private user: TokenPayload;

    private parseFilters(f: Filters) {
        return parseQueryFilters(f);
    }

    projects(select: MongoSelectionSet, filters: Filters): Promise<Project[]> {
        const { sort, closed } = this.parseFilters(filters);

        return new ProjectDAL({ userID: this.user.ID, closed }).findAll({
            select,
            sort,
        });
    }

    project(_id: Types.ObjectId, select: MongoSelectionSet): Promise<Project> {
        return new ProjectDAL({ _id, userID: this.user.ID }).findOne({
            select,
        });
    }

    async createProject(
        createProjectDTO: Omit<CreateProjectInput, "_id">
    ): Promise<Project> {
        const { title, description, templateID } = createProjectDTO;

        const template = await new TemplateDAL({
            _id: templateID,
        }).findOne({
            select: "columns -_id",
        });

        if (!template) {
            throw new Error("Template not found");
        }

        const userID = Types.ObjectId(this.user.ID);

        const newColumns = template.columns.map(col => ({
            ...col,
            userID,
        }));

        const { insertedIds } = await new ColumnDAL().createMany(newColumns);

        return new ProjectDAL().create({
            title,
            description,
            userID,
            templateID,
            columnIDs: Object.values(insertedIds),
        });
    }

    async rearrangeColumn(
        where: RearrangeColumnFindInput,
        data: RearrangeColumnInput
    ): Promise<boolean> {
        const { projectID, columnID } = where;
        const { initialPosition, finalPosition } = data;

        if (initialPosition === finalPosition) {
            throw new UserInputError("Initial and Final position are equal :/");
        }

        /**
         * Cases:
         * 1. Column doesn't changed its position
         * 2. Column changed its position
         *  - It goes forward i.e. initial < final
         *  - It goes backward i.e. initial > final
         */

        const dal = new ProjectDAL({
            _id: projectID,
            userID: this.user.ID,
        });

        // Removing the columnId from the columnIDs[]
        await dal.updateOne(
            {
                $pull: {
                    columnIDs: columnID,
                },
            },
            { select: "_id" }
        );

        // Adding the columnId to its final position in columnIDs[]
        const isUpdated = await dal.updateOne(
            {
                $push: {
                    columnIDs: {
                        $each: [columnID],
                        $position: finalPosition,
                    },
                },
            },
            { select: "_id" }
        );

        return !!isUpdated;
    }

    closedCount() {
        return new ProjectDAL({ userID: this.user.ID, closed: true }).count();
    }

    openCount() {
        return new ProjectDAL({ userID: this.user.ID, closed: false }).count();
    }

    async paginated(
        args: ConnectionArgsType,
        select: MongoSelectionSet,
        filters: Filters
    ): Promise<Connection<Project> | ProjectConnection> {
        const { offset, limit } = args.pagingParams();
        const { sort, closed } = this.parseFilters(filters);

        const dal = new ProjectDAL({ userID: this.user.ID, closed });

        const [data, count] = await Promise.all([
            dal.findAll({
                sort,
                limit,
                skip: offset,
                select,
            }),
            dal.count(),
        ]);

        const pages = connectionFromArraySlice(data, args, {
            arrayLength: count,
            sliceStart: offset,
        });

        return {
            ...pages,
            totalCount: count,
        };
    }
}
