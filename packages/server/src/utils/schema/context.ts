import { FastifyRequest } from "fastify";
import { TokenPayload } from "../../@types/types";
import { userLoader } from "../dataloader/user.loader";
import { projectLoader } from "../dataloader/project.loader";
import { columnLoader } from "../dataloader/column.loader";
import { issueLoader } from "../dataloader/issue.loader";

export class AppContext {
    token: string;

    USER: TokenPayload;

    userLoader = userLoader();

    projectLoader = projectLoader();

    columnLoader = columnLoader();

    issueLoader = issueLoader();

    constructor(private request: FastifyRequest) {
        this.token = this.request.headers.authorization;
    }
}
