import { Service, Inject } from "typedi";
import { UserDAL } from "./user.dal";
import { User } from "./user.schema";
import { TokenPayload, MongoSelectionSet } from "../../@types/types";

@Service()
export class UserService {
    @Inject("USER")
    private user: TokenPayload;

    me(select: MongoSelectionSet): Promise<User> {
        return new UserDAL({ _id: this.user.ID }).findOne({
            select,
        });
    }
}
