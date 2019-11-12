import { gql, useMutation } from "@apollo/client";
import {
    Mutation,
    MutationUpdateTitleAndDescriptionArgs,
    MutationCloseOrOpenArgs
} from "../generated/graphql";
import { ISSUE_FRAGMENT } from "./issue.query";
import { PROJECT_FRAGMENT } from "./project.query";
import { MyMutationHook, HandleMutation } from "../@types/types";

const EDIT_DETAILS = gql`
    mutation EditDetails(
        $where: FindEntityInput!
        $data: TitleAndDescriptionInput!
    ) {
        updateTitleAndDescription(where: $where, data: $data) {
            ...ProjectFragment
            ...IssueFragment
        }
    }
    ${ISSUE_FRAGMENT}
    ${PROJECT_FRAGMENT}
`;

type EditDetailsMutation = {
    updateTitleAndDescription: Mutation["updateTitleAndDescription"];
};
export const useEditDetailsMutation: MyMutationHook<
    EditDetailsMutation,
    MutationUpdateTitleAndDescriptionArgs
> = options => {
    const [mutation, meta] = useMutation<
        EditDetailsMutation,
        MutationUpdateTitleAndDescriptionArgs
    >(EDIT_DETAILS, options);

    const handleMutation: HandleMutation<
        MutationUpdateTitleAndDescriptionArgs
    > = variables => {
        mutation({
            variables
        });
    };

    return [handleMutation, meta];
};

const CLOSE_OR_OPEN = gql`
    mutation EditDetails($where: FindEntityInput!, $data: ClosedInput!) {
        closeOrOpen(where: $where, data: $data) {
            ...ProjectFragment
            ...IssueFragment
        }
    }
    ${ISSUE_FRAGMENT}
    ${PROJECT_FRAGMENT}
`;

type CloseOrOpen = {
    closeOrOpen: Mutation["closeOrOpen"];
};

export const useCloseOrOpenMutation: MyMutationHook<
    CloseOrOpen,
    MutationCloseOrOpenArgs
> = options => {
    const [mutation, meta] = useMutation<CloseOrOpen, MutationCloseOrOpenArgs>(
        CLOSE_OR_OPEN,
        options
    );

    const handleMutation: HandleMutation<
        MutationCloseOrOpenArgs
    > = variables => {
        mutation({ variables });
    };

    return [handleMutation, meta];
};
