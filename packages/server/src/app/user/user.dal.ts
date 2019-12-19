import { User, UserModel } from "./user.schema";
import { RootDAL } from "../../utils/fns/root.dal";

export class UserDAL extends RootDAL<User> {
    constructor(ctx: Partial<User | Record<string, unknown>> = {}) {
        super(UserModel, ctx);

        this.options.select = "-__v -createdAt -updatedAt -password -role";
    }
}
