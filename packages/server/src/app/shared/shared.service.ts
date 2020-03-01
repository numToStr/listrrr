import { Types } from "mongoose";
import { AppContext } from "../../utils/schema/context";
import {
    FindEntityInput,
    ClosedInput,
    EntityType,
    Entity,
} from "./shared.resolver";
import { IssueDAL } from "../issue/issue.dal";
import { ProjectDAL } from "../project/project.dal";
import { TitleAndDescSchema } from "./shared.schema";

export class SharedService {
    constructor(private ctx: AppContext) {}

    private get ID() {
        return Types.ObjectId(this.ctx.USER.ID);
    }

    async closedOrOpen(
        { _id, type }: FindEntityInput,
        data: ClosedInput
    ): Promise<boolean> {
        if (type === EntityType.ISSUE) {
            const ii = await new IssueDAL({
                _id,
                userID: this.ID,
            }).updateOne(data, { select: "_id" });

            return !!ii;
        }

        const pp = await new ProjectDAL({
            _id,
            userID: this.ID,
        }).updateOne(data, { select: "_id" });

        return !!pp;
    }

    updateTitleAndDescription(
        { _id, type }: FindEntityInput,
        data: TitleAndDescSchema
    ): Promise<typeof Entity> {
        if (type === EntityType.ISSUE) {
            return new IssueDAL({ _id, userID: this.ID }).updateOne(data);
        }

        return new ProjectDAL({ _id, userID: this.ID }).updateOne(data);
    }
}
