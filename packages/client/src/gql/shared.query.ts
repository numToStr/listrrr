import {
    useEditDetailsMutation,
    useCloseOrOpenMutation,
    EditDetailsMutationOptions,
} from "../generated/graphql";

export const useIEditDetailsMutation = (
    options?: EditDetailsMutationOptions
) => {
    return useEditDetailsMutation(options);
};

export const useICloseOrOpenMutation = () => {
    return useCloseOrOpenMutation();
};
