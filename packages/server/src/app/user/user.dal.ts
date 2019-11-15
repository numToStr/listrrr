import { User, UserModel } from "./user.schema";
import { RootDAL } from "../../utils/fns/root.dal";
import { AnyObject } from "../../@types/types";

export class UserDAL extends RootDAL<User> {
    constructor(ctx: Partial<User & AnyObject> = {}) {
        super(UserModel, ctx);
    }
}
