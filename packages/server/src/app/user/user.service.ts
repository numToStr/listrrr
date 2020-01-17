import { GraphQLResolveInfo } from "graphql";
import { Types } from "mongoose";
import { AppContext } from "../../utils/schema/context";
import { UserDAL } from "./user.dal";
import { User } from "./user.schema";
import { RootService } from "../../utils/fns/root.service";

export class UserService extends RootService {
    constructor(ctx: AppContext, info: GraphQLResolveInfo) {
        super(ctx, info);
    }

    me(): Promise<User> {
        return new UserDAL({ _id: this.ID }).findOne({
            select: this.selections(),
        });
    }

    createdBy(_id: Types.ObjectId): Promise<User> {
        return new UserDAL({
            _id,
        }).findOne({
            select: this.selections(),
        });
    }
}
