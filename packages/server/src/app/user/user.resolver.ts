import { Resolver, Query, Ctx, Authorized } from "type-graphql";
import { User, AuthRolesEnum } from "./user.schema";
import { Context } from "../../network/context";
import { UserService } from "./user.service";

@Resolver()
export class UserResolver {
    @Authorized<AuthRolesEnum[]>([AuthRolesEnum.USER, AuthRolesEnum.ADMIN])
    @Query(() => User)
    me(@Ctx() ctx: Context): Promise<User> {
        return new UserService(ctx).me();
    }
}
