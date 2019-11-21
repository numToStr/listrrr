import { Types } from "mongoose";
import { UserInputError } from "apollo-server";
import { ProjectDAL } from "./project.dal";
import { Project } from "./project.schema";
import {
    CreateProjectInput,
    RearrangeColumnFindInput,
} from "./project.resolver";
import { Context } from "../../network/context";
import { TemplateDAL } from "../template/template.dal";
import { ColumnDAL } from "../column/column.dal";
import { RearrangeColumnInput } from "../../utils/schema/schema";

export class ProjectService {
    constructor(private ctx: Context) {}

    private get ID() {
        return Types.ObjectId(this.ctx.USER.ID);
    }

    projects(): Promise<Project[]> {
        return new ProjectDAL({
            userID: this.ID,
        }).findAll({
            sort: {
                createdAt: -1,
            },
        });
    }

    project(_id: Types.ObjectId): Promise<Project> {
        return new ProjectDAL({ _id, userID: this.ID }).findOne();
    }

    async createProject({
        title,
        description,
        templateID,
    }: Omit<CreateProjectInput, "_id">): Promise<Project> {
        const template = await new TemplateDAL({
            _id: templateID,
        }).findOne({
            select: "columns -_id",
        });

        if (!template) {
            throw new Error("Template not found");
        }

        const newColumns = template.columns.map(c => ({
            ...c,
            userID: this.ID,
        }));

        const { insertedIds } = await new ColumnDAL().createMany(newColumns);

        return new ProjectDAL().create({
            title,
            description,
            userID: this.ID,
            templateID,
            columnIDs: Object.values(insertedIds),
        });
    }

    async rearrangeColumn(
        { projectID, columnID }: RearrangeColumnFindInput,
        { initialPosition, finalPosition }: RearrangeColumnInput
    ): Promise<boolean> {
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
            userID: this.ID,
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
}
