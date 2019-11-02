import { Types } from "mongoose";
import { IssueDAL } from "./issue.dal";
import { Issue } from "./issue.schema";
import { CreateIssueInput } from "./issue.resolver";
import { Context } from "../../network/context";
// import { ProjectDAL } from "../project/project.dal";

export class IssueService {
    constructor(private ctx: Context) {}

    private get ID() {
        return Types.ObjectId(this.ctx.USER.ID);
    }

    issues(_ids?: Types.ObjectId[]): Promise<Issue[]> {
        const query = _ids
            ? {
                  _id: { $in: _ids },
              }
            : {};

        return new IssueDAL(query as Partial<Issue>).findAll();
    }

    issue(_id: Types.ObjectId): Promise<Issue> {
        return new IssueDAL({ _id }).findOne();
    }

    async createIssue({ title, description }: CreateIssueInput) {
        // const firstColumn = await new ProjectDAL().firstColumnID(projectID);

        return new IssueDAL().create({
            title,
            description,
            userID: this.ID,
        });
    }
}
