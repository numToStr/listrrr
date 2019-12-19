import { Resolver, Query, Ctx, Authorized, Info } from "type-graphql";
import { GraphQLResolveInfo } from "graphql";
import { User, AuthRolesEnum } from "./user.schema";
import { Context } from "../../network/context";
import { UserService } from "./user.service";

@Resolver()
export class UserResolver {
    @Authorized<AuthRolesEnum[]>([AuthRolesEnum.USER, AuthRolesEnum.ADMIN])
    @Query(() => User)
    me(@Ctx() ctx: Context, @Info() info: GraphQLResolveInfo): Promise<User> {
        return new UserService(ctx, info).me();
    }
}
