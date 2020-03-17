import produce from "immer";
import { Reference } from "@apollo/client";
import {
    useEditDetailsMutation,
    useCloseOrOpenMutation,
    EditDetailsMutationOptions,
    CloseOrOpenMutationHookResult,
    CloseOrOpenMutationFn,
} from "../generated/graphql";
import { upperToSentence } from "../utils/fns/string";

export const useIEditDetailsMutation = (
    options?: EditDetailsMutationOptions
) => {
    return useEditDetailsMutation(options);
};

export const useICloseOrOpenMutation = (): CloseOrOpenMutationHookResult => {
    const [mutation, data] = useCloseOrOpenMutation();

    const handleMutation: CloseOrOpenMutationFn = options => {
        return mutation({
            ...options,
            optimisticResponse: {
                closeOrOpen: true,
            },
            update(cache) {
                if (!options) {
                    return false;
                }

                const {
                    where: { _id, type },
                } = options.variables!;

                // This will change `ISSUE` => `issues`
                const query = `${type.toLowerCase()}s`;

                // This will convert `ISSUE` => `Issue`
                const _ref = upperToSentence(type);

                // If closing,
                // - then remove the item from the open list
                // - add the item in the closed list
                cache.modify("ROOT_QUERY", {
                    [query]: (refs: Reference[], { readField }) => {
                        const found = refs.findIndex(
                            ref => readField("_id", ref) === _id
                        );

                        // If the closed item is in the list
                        // then remove it from that list
                        if (found >= 0) {
                            return produce(refs, d => {
                                d.splice(found, 1);
                            });
                        }

                        // If the item is not in the list
                        // then add it in the list
                        return produce(refs, d => {
                            d.push({
                                __ref: `${_ref}:${_id}`,
                            });
                        });
                    },
                });

                // This flipping should be in the last
                // flip the closed value
                cache.modify(`${_ref}:${_id}`, {
                    closed: (val: boolean) => !val,
                });
            },
        });
    };

    return [handleMutation, data];
};
