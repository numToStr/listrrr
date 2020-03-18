import { Resolver, Query, Authorized } from "type-graphql";
import { User, AuthRolesEnum } from "./user.schema";
import { UserService } from "./user.service";
import { Selections } from "../../utils/decorator/selections.decorator";
import { MongoSelectionSet } from "../../@types/types";

@Resolver()
export class UserResolver {
    constructor(private userService: UserService) {}

    @Authorized<AuthRolesEnum[]>([AuthRolesEnum.USER, AuthRolesEnum.ADMIN])
    @Query(() => User)
    me(@Selections() select: MongoSelectionSet): Promise<User> {
        return this.userService.me(select);
    }
}
