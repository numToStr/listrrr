import { Resolver, Query, Authorized } from "type-graphql";
import { User } from "./user.schema";
import { UserService } from "./user.service";
import { Selections } from "../../utils/decorator/selections.decorator";
import { MongoSelectionSet } from "../../@types/types";

@Resolver()
export class UserResolver {
    constructor(private userService: UserService) {}

    @Authorized()
    @Query(() => User)
    me(@Selections() select: MongoSelectionSet): Promise<User> {
        return this.userService.me(select);
    }
}
