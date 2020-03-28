import { Inject, Service } from "typedi";
import { IssueDAL } from "../issue/issue.dal";
import { ProjectDAL } from "../project/project.dal";
import { TitleAndDescSchema } from "./shared.schema";
import { TokenPayload } from "../../@types/types";
import { FindEntityInput, ClosedInput, EntityType, Entity } from "./shared.dto";

@Service()
export class SharedService {
    @Inject("USER")
    private user: TokenPayload;

    async closedOrOpen(
        where: FindEntityInput,
        data: ClosedInput
    ): Promise<boolean> {
        const { _id, type } = where;

        if (type === EntityType.ISSUE) {
            const ii = await new IssueDAL({
                _id,
                userID: this.user.ID,
            }).updateOne(data, { select: "_id" });

            return !!ii;
        }

        const pp = await new ProjectDAL({
            _id,
            userID: this.user.ID,
        }).updateOne(data, { select: "_id" });

        return !!pp;
    }

    updateTitleAndDescription(
        where: FindEntityInput,
        data: TitleAndDescSchema
    ): Promise<typeof Entity> {
        const { _id, type } = where;

        if (type === EntityType.ISSUE) {
            return new IssueDAL({ _id, userID: this.user.ID }).updateOne(data);
        }

        return new ProjectDAL({ _id, userID: this.user.ID }).updateOne(data);
    }
}
