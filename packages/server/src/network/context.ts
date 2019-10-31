import { IncomingMessage } from "http";

interface ApolloContext {
    req: IncomingMessage;
}

export class Context {
    constructor(private ctx: ApolloContext) {}
}
