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

    issues(): Promise<Issue[]> {
        return new IssueDAL().findAll();
    }

    issue(_id: Types.ObjectId): Promise<Issue> {
        return new IssueDAL({ _id }).findOne();
    }

    async createIssue({ projectID, title, description }: CreateIssueInput) {
        // const firstColumn = await new ProjectDAL().firstColumnID(projectID);
        return new IssueDAL().create({
            title,
            description,
            projectID,
            userID: this.ID,
        });
    }
}
