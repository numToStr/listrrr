import { Types } from "mongoose";
import { Context } from "../../network/context";
import {
    FindEntityInput,
    ClosedInput,
    EntityType,
    Entity,
} from "./shared.resolver";
import { IssueDAL } from "../issue/issue.dal";
import { ProjectDAL } from "../project/project.dal";
import { TitleAndDescSchema } from "../../utils/schema/schema";

export class SharedService {
    constructor(private ctx: Context) {}

    private get ID() {
        return Types.ObjectId(this.ctx.USER.ID);
    }

    closedOrOpen(
        { _id, type }: FindEntityInput,
        data: ClosedInput
    ): Promise<typeof Entity> {
        if (type === EntityType.ISSUE) {
            return new IssueDAL({ _id, userID: this.ID }).updateOne(data);
        }

        return new ProjectDAL({ _id, userID: this.ID }).updateOne(data);
    }

    updateTitleAndDescription(
        { _id, type }: FindEntityInput,
        data: TitleAndDescSchema
    ): Promise<typeof Entity> {
        if (type) {
            return new IssueDAL({ _id, userID: this.ID }).updateOne(data);
        }

        return new ProjectDAL({ _id, userID: this.ID }).updateOne(data);
    }
}
