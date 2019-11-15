import { AuthChecker } from "type-graphql";
import { ForbiddenError, AuthenticationError } from "apollo-server";
import { Context } from "../../network/context";
import TokenUtil from "./token.util";
import { AuthRolesEnum } from "../../app/user/user.schema";

export const authChecker: AuthChecker<Context, AuthRolesEnum> = (
    { context },
    roles
): boolean => {
    const { token } = context;

    if (!token) {
        throw new ForbiddenError("Authentication required! Please login.");
    }

    const decodedToken = TokenUtil.verify(token);

    const rolesSet = new Set(roles);

    if (!rolesSet.has(decodedToken.ROLE)) {
        throw new AuthenticationError(
            "You are not authorized to perform this action."
        );
    }

    context.setUser(decodedToken);

    return true;
};
