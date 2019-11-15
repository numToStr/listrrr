import { Types } from "mongoose";
import { IssueDAL } from "./issue.dal";
import { Issue } from "./issue.schema";
import { CreateIssueInput, UpdateIssueProjectInput } from "./issue.resolver";
import { Context } from "../../network/context";
import { ProjectDAL } from "../project/project.dal";
import { ColumnDAL } from "../column/column.dal";
import { DALQuery } from "../../@types/types";
import { FindInput } from "../../utils/schema/schema";

export class IssueService {
    constructor(private ctx: Context) {}

    private get ID() {
        return Types.ObjectId(this.ctx.USER.ID);
    }

    issues(_ids?: Types.ObjectId[]): Promise<Issue[]> {
        const query: DALQuery = {
            userID: this.ID,
        };

        if (_ids) {
            query._id = {
                $in: _ids,
            };
        }

        return new IssueDAL(query as Partial<Issue>).findAll({
            sort: {
                createdAt: -1,
            },
        });
    }

    issue(_id: Types.ObjectId): Promise<Issue> {
        return new IssueDAL({ _id, userID: this.ID }).findOne();
    }

    async createIssue({ projectIDs, title, description }: CreateIssueInput) {
        const issue = await new IssueDAL().create({
            title,
            description,
            userID: this.ID,
            projectIDs,
        });

        if (projectIDs && projectIDs.length) {
            const columnIDs = await ProjectDAL.columns(projectIDs);

            if (columnIDs && columnIDs.length) {
                await ColumnDAL.updateColumnWithIssue(columnIDs, issue._id);
            }
        }

        return issue;
    }

    updateIssueProjects(
        { _id }: FindInput,
        { projectIDs }: UpdateIssueProjectInput
    ) {
        return new IssueDAL({
            _id,
            userID: this.ID,
        }).updateOne({
            projectIDs,
        });
    }

    async deleteIssue({ _id }: FindInput) {
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
}
