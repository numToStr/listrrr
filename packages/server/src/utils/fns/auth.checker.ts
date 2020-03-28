import { AuthChecker } from "type-graphql";
import { AppContext } from "../schema/context";

export const authChecker: AuthChecker<AppContext> = ({ context }): boolean => {
    const { USER } = context;

    if (!USER) {
        return false;
    }

    return true;
};
