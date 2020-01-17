import { FastifyRequest } from "fastify";
import { TokenPayload } from "../../@types/types";
import { userLoader } from "../dataloader/user.loader";
import { projectLoader } from "../dataloader/project.loader";
import { columnLoader } from "../dataloader/column.loader";
import { issueLoader } from "../dataloader/issue.loader";

export interface GQLContext {
    request: FastifyRequest;
}

export class AppContext {
    private me: TokenPayload;

    userLoader = userLoader();

    projectLoader = projectLoader();

    columnLoader = columnLoader();

    issueLoader = issueLoader();

    constructor(private ctx: GQLContext) {}

    get token(): string | undefined {
        return this.ctx.request.headers.authorization;
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
