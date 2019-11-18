import { Issue, IssueModel } from "./issue.schema";
import { RootDAL } from "../../utils/fns/root.dal";

export class IssueDAL extends RootDAL<Issue> {
    constructor(ctx: Partial<Issue | Record<string, unknown>> = {}) {
        super(IssueModel, ctx);
    }
}
