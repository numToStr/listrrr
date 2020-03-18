import { AuthChecker } from "type-graphql";
import { AppContext } from "../schema/context";
import { AuthRolesEnum } from "../../app/user/user.schema";

export const authChecker: AuthChecker<AppContext, AuthRolesEnum> = (
    { context },
    roles
): boolean => {
    const { USER } = context;

    if (!USER || !roles.includes(USER.ROLE)) {
        return false;
    }

    return true;
};
