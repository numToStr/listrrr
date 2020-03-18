import { Types } from "mongoose";
import { Inject, Service } from "typedi";
import { connectionFromArraySlice, Connection } from "graphql-relay";
import { Issue, IssueConnection } from "./issue.schema";
import { IssueDAL } from "./issue.dal";
import { TokenPayload, MongoSelectionSet } from "../../@types/types";
import { parseQueryFilters } from "../../utils/fns/object.util";
import { Filters, FindInput } from "../shared/shared.schema";
import { CreateIssueInput, UpdateIssueProjectInput } from "./issue.resolver";
import { ProjectDAL } from "../project/project.dal";
import { ColumnDAL, OK } from "../column/column.dal";
import { ConnectionArgsType } from "../../utils/schema/connection";

@Service()
export class IssueService {
    @Inject("USER")
    private readonly user: TokenPayload;

    private parseFilters(f: Filters) {
        return parseQueryFilters(f);
    }

    issues(select: MongoSelectionSet, filters: Filters): Promise<Issue[]> {
        const { closed, sort } = this.parseFilters(filters);

        return new IssueDAL({ userID: this.user.ID, closed }).findAll({
            sort,
            select,
        });
    }

    issue(_id: Types.ObjectId, select: MongoSelectionSet): Promise<Issue> {
        return new IssueDAL({ _id, userID: this.user.ID }).findOne({
            select,
        });
    }

    async createIssue(createIssueDTO: CreateIssueInput): Promise<Issue> {
        const { projectIDs, title, description } = createIssueDTO;

        const issue = await new IssueDAL().create({
            title,
            description,
            userID: Types.ObjectId(this.user.ID),
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
                userID: this.user.ID,
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
            userID: this.user.ID,
        }).deleteOne();

        if (isDeleted) {
            await ColumnDAL.removeIssueFromColumns(_id);
            // throw Error(`You are not authorized to delete this issue`);
        }

        return isDeleted;
    }

    closedCount() {
        return new IssueDAL({ userID: this.user.ID, closed: true }).count();
    }

    openCount() {
        return new IssueDAL({ userID: this.user.ID, closed: false }).count();
    }

    async paginated(
        args: ConnectionArgsType,
        select: MongoSelectionSet,
        filters: Filters
    ): Promise<Connection<Issue> | IssueConnection> {
        const { offset, limit } = args.pagingParams();
        const { sort, closed } = this.parseFilters(filters);

        const dal = new IssueDAL({ userID: this.user.ID, closed });

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
