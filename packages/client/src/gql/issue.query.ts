import produce from "immer";
import { Reference } from "@apollo/client";
import {
    useIssuesQuery,
    useIssuesLazyQuery,
    useIssueQuery,
    useCreateIssueMutation,
    IssuesQueryVariables,
    IssueQueryVariables,
    IssueQuery,
    IssueDocument,
    useUpdateIssueProjectsMutation,
    UpdateIssueProjectsMutationHookResult,
    UpdateIssueProjectsMutationFn,
} from "../generated/graphql";

export const useIIssuesQuery = (variables: IssuesQueryVariables) => {
    return useIssuesQuery({
        variables,
    });
};

export const useIIssuesLazyQuery = () => {
    return useIssuesLazyQuery();
};

export const useIIssueQuery = (variables: IssueQueryVariables) => {
    return useIssueQuery({
        variables,
    });
};

export const useICreateIssueMutation = () => {
    return useCreateIssueMutation({
        update(cache, { data }) {
            if (!data) {
                return;
            }

            const { createIssue: i } = data;

            // Creating new cached query for the created project
            cache.writeQuery<IssueQuery, IssueQueryVariables>({
                query: IssueDocument,
                variables: {
                    where: {
                        _id: i._id,
                    },
                },
                data: {
                    issue: i,
                },
            });

            cache.modify("ROOT_QUERY", {
                issues: (refs: Reference[], { readField }) => {
                    const [ref] = refs;

                    const isClosed = readField("closed", ref);

                    // Checking if the list is for closed or open items
                    // If closed then return
                    // If opened then update

                    if (isClosed) {
                        return refs;
                    }

                    return produce(refs, d => {
                        d.unshift({
                            __ref: `Issue:${i._id}`,
                        });
                    });
                },
            });
        },
    });
};

export const useIUpdateIssueProjects = (): UpdateIssueProjectsMutationHookResult => {
    const [mutation, data] = useUpdateIssueProjectsMutation();

    const handleMutation: UpdateIssueProjectsMutationFn = options => {
        return mutation({
            ...options,
            optimisticResponse: {
                updateIssueProjects: true,
            },
            update(cache) {
                if (!options) {
                    return false;
                }

                const {
                    data: { projectIDs },
                    where: { _id },
                } = options.variables!;

                cache.modify(`Issue:${_id}`, {
                    projects: () => {
                        return projectIDs.map(p => ({ __ref: `Project:${p}` }));
                    },
                });
            },
        });
    };

    return [handleMutation, data];
};
