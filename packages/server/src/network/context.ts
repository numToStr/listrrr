import { IncomingMessage } from "http";
import { TokenPayload } from "../@types/types";

interface ApolloContext {
    req: IncomingMessage;
}

export class Context {
    private me: TokenPayload;

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
