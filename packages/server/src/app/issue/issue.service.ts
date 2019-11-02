import { Types } from "mongoose";
import { IssueDAL } from "./issue.dal";
import { Issue } from "./issue.schema";
import { CreateIssueInput } from "./issue.resolver";
import { Context } from "../../network/context";
import { ProjectDAL } from "../project/project.dal";
import { ColumnDAL } from "../column/column.dal";
import { DALQuery } from "../../@types/types";

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

        return new IssueDAL(query as Partial<Issue>).findAll();
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
            const columnsIDs = await ProjectDAL.columns(projectIDs);

            if (columnsIDs && columnsIDs.length) {
                await ColumnDAL.updateColumnWithIssue(columnsIDs, issue._id);
            }
        }

        return issue;
    }
}