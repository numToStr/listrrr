import {
    gql,
    useMutation,
    MutationResult,
    MutationHookOptions
} from "@apollo/client";
import {
    FindEntityInput,
    TitleAndDescriptionInput,
    Mutation,
    MutationUpdateTitleAndDescriptionArgs
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

type EditDetailsMutation = {
    updateTitleAndDescription: Mutation["updateTitleAndDescription"];
};
type Handler = (where: FindEntityInput, data: TitleAndDescriptionInput) => void;
type MutationHook = (
    options?: MutationHookOptions<
        EditDetailsMutation,
        MutationUpdateTitleAndDescriptionArgs
    >
) => [Handler, MutationResult<EditDetailsMutation>];

export const useEditDetailsMutation: MutationHook = options => {
    const [mutation, meta] = useMutation<
        EditDetailsMutation,
        MutationUpdateTitleAndDescriptionArgs
    >(EDIT_DETAILS, options);

    const handleMutation: Handler = (where, data) => {
        mutation({
            variables: {
                where,
                data
            }
        });
    };

    return [handleMutation, meta];
};
