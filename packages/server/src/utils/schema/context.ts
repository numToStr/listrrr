import { IncomingMessage } from "http";
import { TokenPayload } from "../../@types/types";
import { userLoader } from "../dataloader/user.loader";
import { projectLoader } from "../dataloader/project.loader";
import { columnLoader } from "../dataloader/column.loader";
import { issueLoader } from "../dataloader/issue.loader";

interface ApolloContext {
    req: IncomingMessage;
}

export class AppContext {
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

    set USER(user) {
        this.me = user;
    }

    setUser(payload: TokenPayload) {
        this.me = payload;
    }
}
