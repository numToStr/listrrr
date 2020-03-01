import { gql } from "@apollo/client";
import produce from "immer";
import {
    useIssuesQuery,
    useIssuesLazyQuery,
    useIssueQuery,
    useCreateIssueMutation,
    Status,
    IssuesQuery,
    IssuesQueryVariables,
    IssuesDocument,
    IssueQueryVariables,
    IssueQuery,
    IssueDocument,
    useUpdateIssueProjectsMutation,
    UpdateIssueProjectsMutationHookResult,
    UpdateIssueProjectsMutationFn,
    ProjectFragmentFragment,
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

            const variables = {
                filters: {
                    status: Status.OPEN,
                },
            };

            const cached = cache.readQuery<IssuesQuery, IssuesQueryVariables>({
                query: IssuesDocument,
                variables,
            });

            if (!cached) {
                return;
            }

            const issues = produce(cached.issues, draft => {
                draft.unshift(i);
            });

            // Pushing to project list
            cache.writeQuery<IssuesQuery, IssuesQueryVariables>({
                query: IssuesDocument,
                data: {
                    issues,
                },
                variables,
            });

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

                const t = cache.readQuery<IssueQuery, IssueQueryVariables>({
                    query: IssueDocument,
                    variables: {
                        where: {
                            _id,
                        },
                    },
                });

                const projects = projectIDs.map(_id => {
                    return cache.readFragment<ProjectFragmentFragment>({
                        fragment: gql`
                            fragment FP on Project {
                                _id
                                title
                            }
                        `,
                        id: `Project:${_id}`,
                    });
                });

                if (!t) {
                    return false;
                }

                const tt = produce(t.issue, d => {
                    if (d) {
                        d.projects = projects;
                    }
                });

                cache.writeQuery<IssueQuery, IssueQueryVariables>({
                    query: IssueDocument,
                    variables: {
                        where: {
                            _id,
                        },
                    },
                    data: {
                        issue: tt,
                    },
                });
            },
        });
    };

    return [handleMutation, data];
};
