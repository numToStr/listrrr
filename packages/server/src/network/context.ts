import { IncomingMessage } from "http";
import { TokenPayload } from "../@types/types";
import { userLoader } from "../utils/dataloader/user.loader";
import { projectLoader } from "../utils/dataloader/project.loader";
import { columnLoader } from "../utils/dataloader/column.loader";
import { issueLoader } from "../utils/dataloader/issue.loader";

interface ApolloContext {
    req: IncomingMessage;
}

export class Context {
    private me: TokenPayload;

    userLoader = userLoader();

    projectLoader = projectLoader();

    columnLoader = columnLoader();

    issueLoader = issueLoader();

    constructor(private ctx: ApolloContext) {}

    get token(): string | undefined {
        return this.ctx.req.headers.authorization;
    }

    get USER(): TokenPayload {
        return this.me;
    }

    setUser(payload: TokenPayload) {
        this.me = payload;
    }
}
