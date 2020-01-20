import { AuthChecker } from "type-graphql";
import { ForbiddenError, AuthenticationError } from "apollo-server";
import { AppContext } from "../schema/context";
import { AuthRolesEnum } from "../../app/user/user.schema";
import TokenUtil from "./token.util";

export const authChecker: AuthChecker<AppContext, AuthRolesEnum> = (
    { context },
    roles
): boolean => {
    const { token } = context;

    if (!token) {
        throw new ForbiddenError("Authentication required! Please login.");
    }

    const decoded = TokenUtil.verify(token);

    if (!roles.includes(decoded.ROLE)) {
        throw new AuthenticationError(
            "You are not authorized to perform this action."
        );
    }

    // eslint-disable-next-line no-param-reassign
    context.USER = decoded;

    return true;
};
