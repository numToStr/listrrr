import { Types } from "mongoose";
import { GraphQLResolveInfo } from "graphql";
import { Connection, connectionFromArraySlice } from "graphql-relay";
import { IssueDAL } from "./issue.dal";
import { Issue, IssueConnection } from "./issue.schema";
import { CreateIssueInput, UpdateIssueProjectInput } from "./issue.resolver";
import { AppContext } from "../../utils/schema/context";
import { ProjectDAL } from "../project/project.dal";
import { ColumnDAL, OK } from "../column/column.dal";
import { FindInput, Filters } from "../shared/shared.schema";
import { parseQueryFilters } from "../../utils/fns/object.util";
import { ConnectionArgsType } from "../../utils/schema/connection";
import { RootService } from "../../utils/fns/root.service";

export class IssueService extends RootService {
    constructor(ctx: AppContext, info: GraphQLResolveInfo) {
        super(ctx, info);
    }

    private fltr: Filters;

    private readonly aliases = {
        createdBy: "userID",
        projects: "projectIDs",
    };

    private parseF() {
        return parseQueryFilters(this.fltr);
    }

    private s() {
        return this.selections(this.aliases);
    }

    filters(f: Filters) {
        this.fltr = f;

        return this;
    }

    async paginated(
        args: ConnectionArgsType
    ): Promise<Connection<Issue> | IssueConnection> {
        const { offset, limit } = args.pagingParams();
        const { sort, closed } = this.parseF();

        const dal = new IssueDAL({ userID: this.ID, closed });

        const [data, count] = await Promise.all([
            dal.findAll({
                sort,
                limit,
                skip: offset,
                select: this.s(),
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

    async issues(): Promise<Issue[]> {
        const { closed, sort } = this.parseF();

        return new IssueDAL({ userID: this.ID, closed }).findAll({
            sort,
            select: this.s(),
        });
    }

    async issue(_id: Types.ObjectId): Promise<Issue> {
        return new IssueDAL({ _id, userID: this.ID }).findOne({
            select: this.s(),
        });
    }

    async createIssue({
        projectIDs,
        title,
        description,
    }: CreateIssueInput): Promise<Issue> {
        const issue = await new IssueDAL().create({
            title,
            description,
            userID: this.ID,
            projectIDs,
        });

        if (projectIDs.length) {
            const columnIDs = await ProjectDAL.columns(projectIDs);

            if (columnIDs.length) {
                await ColumnDAL.updateColumnWithIssue(columnIDs, issue._id);
            }
        }

        return issue;
    }

    async updateIssueProjects(
        { _id }: FindInput,
        { projectIDs }: UpdateIssueProjectInput
    ): Promise<boolean> {
        // First remove issue from the all projects/columns
        // Then update with the new projects
        const [issue] = await Promise.all<Issue, OK>([
            new IssueDAL({
                _id,
                userID: this.ID,
            }).updateOne({ projectIDs }, { select: "_id" }),
            ColumnDAL.removeIssueFromColumns(_id),
        ]);

        // If the projectIDs array is empty, which is when user deselect from all the projects
        // then this will not run
        if (projectIDs.length) {
            const columnIDs = await ProjectDAL.columns(projectIDs);

            if (columnIDs.length) {
                await ColumnDAL.updateColumnWithIssue(columnIDs, issue._id);
            }
        }

        return !!issue;
    }

    async deleteIssue({ _id }: FindInput): Promise<Issue> {
        const isDeleted = await new IssueDAL({
            _id,
            userID: this.ID,
        }).deleteOne();

        if (isDeleted) {
            await ColumnDAL.removeIssueFromColumns(_id);
            // throw Error(`You are not authorized to delete this issue`);
        }

        return isDeleted;
    }

    closedCount() {
        return new IssueDAL({ userID: this.ID, closed: true }).count();
    }

    openCount() {
        return new IssueDAL({ userID: this.ID, closed: false }).count();
    }
}
