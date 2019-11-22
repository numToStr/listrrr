import { gql, useQuery } from "@apollo/client";
import { User } from "../generated/graphql";

export const USER_FRAGMENT = gql`
    fragment UserFragment on User {
        _id
        email
        username
        role
    }
`;

export const ME = gql`
    query Me {
        me {
            ...UserFragment
        }
    }
    ${USER_FRAGMENT}
`;

type MeQuery = {
    me: User;
};

export const useMeQuery = () => {
    return useQuery<MeQuery, {}>(ME);
};
