import { Container } from "typedi";
import { FastifyRequest } from "fastify";
import { TokenPayload } from "../../@types/types";
import { userLoader } from "../dataloader/user.loader";
import { projectLoader } from "../dataloader/project.loader";
import { columnLoader } from "../dataloader/column.loader";
import { issueLoader } from "../dataloader/issue.loader";
import { TokenUtil } from "../fns/token.util";

export class AppContext {
    USER: TokenPayload | null = null;

    container = Container.of(this.request.id);

    userLoader = userLoader();

    projectLoader = projectLoader();

    columnLoader = columnLoader();

    issueLoader = issueLoader();

    constructor(private request: FastifyRequest) {
        const token = this.request.headers.authorization;

        if (token) {
            const decoded = TokenUtil.verify(token);

            this.USER = decoded;
        }

        this.container.set("USER", this.USER);
    }
}
