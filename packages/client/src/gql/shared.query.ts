import {
    gql,
    useMutation,
    MutationResult,
    MutationHookOptions
} from "@apollo/client";
import {
    Mutation,
    MutationUpdateTitleAndDescriptionArgs,
    MutationCloseOrOpenArgs
} from "../generated/graphql";
import { ISSUE_FRAGMENT } from "./issue.query";
import { PROJECT_FRAGMENT } from "./project.query";

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

type Handler<V> = (variables: V) => void;
type MutationHook<T, V> = (
    options?: MutationHookOptions<T, V>
) => [Handler<V>, MutationResult<T>];

type EditDetailsMutation = {
    updateTitleAndDescription: Mutation["updateTitleAndDescription"];
};
export const useEditDetailsMutation: MutationHook<
    EditDetailsMutation,
    MutationUpdateTitleAndDescriptionArgs
> = options => {
    const [mutation, meta] = useMutation<
        EditDetailsMutation,
        MutationUpdateTitleAndDescriptionArgs
    >(EDIT_DETAILS, options);

    const handleMutation: Handler<
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

export const useCloseOrOpenMutation: MutationHook<
    CloseOrOpen,
    MutationCloseOrOpenArgs
> = options => {
    const [mutation, meta] = useMutation<CloseOrOpen, MutationCloseOrOpenArgs>(
        CLOSE_OR_OPEN,
        options
    );

    const handleMutation: Handler<MutationCloseOrOpenArgs> = variables => {
        mutation({ variables });
    };

    return [handleMutation, meta];
};
