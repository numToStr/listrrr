import { Issue, IssueModel } from "./issue.schema";
import { RootDAL } from "../../utils/fns/root.dal";
import { AnyObject } from "../../@types/types";

export class IssueDAL extends RootDAL<Issue> {
    constructor(ctx: Partial<Issue & AnyObject> = {}) {
        super(IssueModel, ctx);
    }
}
