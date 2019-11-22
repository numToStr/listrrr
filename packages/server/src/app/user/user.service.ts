import { Types } from "mongoose";
import { Context } from "../../network/context";
import { UserDAL } from "./user.dal";
import { User } from "./user.schema";

export class UserService {
    constructor(private ctx: Context) {}

    private get ID() {
        return Types.ObjectId(this.ctx.USER.ID);
    }

    me(): Promise<User> {
        return new UserDAL({ _id: this.ID }).findOne();
    }

    createdBy(_id: Types.ObjectId): Promise<User> {
        return new UserDAL({
            _id,
        }).findOne();
    }
}
