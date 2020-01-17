import { Resolver, Query, Ctx, Authorized, Info } from "type-graphql";
import { GraphQLResolveInfo } from "graphql";
import { User, AuthRolesEnum } from "./user.schema";
import { AppContext } from "../../utils/schema/context";
import { UserService } from "./user.service";

@Resolver()
export class UserResolver {
    @Authorized<AuthRolesEnum[]>([AuthRolesEnum.USER, AuthRolesEnum.ADMIN])
    @Query(() => User)
    me(
        @Ctx() ctx: AppContext,
        @Info() info: GraphQLResolveInfo
    ): Promise<User> {
        return new UserService(ctx, info).me();
    }
}
