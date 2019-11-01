import { Types } from "mongoose";
import { IssueDAL } from "./issue.dal";
import { Issue } from "./issue.schema";

export class IssueService {
    issues(): Promise<Issue[]> {
        return new IssueDAL().findAll();
    }

    issue(_id: Types.ObjectId): Promise<Issue> {
        return new IssueDAL({ _id }).findOne();
    }
}
