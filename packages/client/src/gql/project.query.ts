import produce from "immer";
import { Reference } from "@apollo/client";
import {
    useProjectsQuery,
    useProjectsLazyQuery,
    ProjectsQueryVariables,
    useProjectsFilterQuery,
    useProjectQuery,
    ProjectQueryVariables,
    useCreateProjectMutation,
    ProjectQuery,
    ProjectDocument,
    useRearrangeColumnMutation,
    RearrangeColumnMutationFn,
    RearrangeColumnMutationHookResult,
    useRearrangeIssueMutation,
    RearrangeIssueMutationFn,
    RearrangeIssueMutationHookResult,
} from "../generated/graphql";

export const useIProjectsQuery = (variables: ProjectsQueryVariables) => {
    return useProjectsQuery({
        variables,
    });
};

export const useIProjectsLazyQuery = () => {
    return useProjectsLazyQuery();
};

export const useIProjectsFilterQuery = (variables: ProjectsQueryVariables) => {
    return useProjectsFilterQuery({
        variables,
    });
};
export const useIProjectQuery = (variables: ProjectQueryVariables) => {
    return useProjectQuery({
        variables,
    });
};

export const useICreateProjectMutation = () => {
    return useCreateProjectMutation({
        update(cache, { data }) {
            if (!data) {
                return;
            }

            const { createProject: p } = data;

            // Creating new cached query for the created project
            cache.writeQuery<ProjectQuery, ProjectQueryVariables>({
                query: ProjectDocument,
                variables: {
                    where: {
                        _id: p._id,
                    },
                },
                data: {
                    project: p,
                },
            });

            // Updating the projects list
            cache.modify("ROOT_QUERY", {
                projects: (refs: Reference[], { readField }) => {
                    const [ref] = refs;
                    const isClosed = readField("closed", ref);

                    if (isClosed) {
                        return refs;
                    }

                    return produce(refs, d => {
                        d.unshift({
                            __ref: `Project:${p._id}`,
                        });
                    });
                },
            });
        },
    });
};

export const useIRearrangeColumnMutation = (): RearrangeColumnMutationHookResult => {
    const [mutation, meta] = useRearrangeColumnMutation();

    const handleMutation: RearrangeColumnMutationFn = options => {
        return mutation({
            ...options,
            optimisticResponse: {
                rearrangeColumn: true,
            },
            update(cache, { data }) {
                // if rearrangeColumn is false => return, means update is not successful
                if (!data!.rearrangeColumn || !options) {
                    return;
                }

                const {
                    where: { projectID, columnID },
                    data: { initialPosition, finalPosition },
                } = options.variables!;

                cache.modify(`Project:${projectID}`, {
                    columns: (refs: Reference[]) => {
                        return produce(refs, d => {
                            d.splice(initialPosition, 1);

                            d.splice(finalPosition, 0, {
                                __ref: `Column:${columnID}`,
                            });
                        });
                    },
                });
            },
        });
    };

    return [handleMutation, meta];
};

export const useIRearrangeIssueMutation = (): RearrangeIssueMutationHookResult => {
    const [mutation, meta] = useRearrangeIssueMutation();

    const handleMutation: RearrangeIssueMutationFn = options => {
        return mutation({
            ...options,
            optimisticResponse: {
                rearrangeIssue: true,
            },
            update(cache, { data }) {
                /**
                 * Cases:
                 *
                 * 1. changes its columns
                 *      -> columnID !== destinationColumnID
                 * 2. changes its position in the same column
                 *      -> columnID === destinationColumnID && initialPosition !== finalPosition
                 * 3. doesn't changes its position
                 *      -> columnID === destinationColumnID && initialPosition === finalPosition
                 */

                if (!data!.rearrangeIssue || !options) {
                    return false;
                }

                const {
                    where: { columnID, issueID },
                    data: {
                        destinationColumnID,
                        initialPosition,
                        finalPosition,
                    },
                } = options.variables!;

                const __ref = `Issue:${issueID}`;

                cache.modify(`Column:${columnID}`, {
                    issues: (refs: Reference[]) => {
                        // If the issue changes its column
                        // Remove the issue from the initial column
                        if (columnID !== destinationColumnID) {
                            return produce(refs, d => {
                                d.splice(initialPosition, 1);
                            });
                        }

                        // If the issue changes its position in the same column
                        return produce(refs, d => {
                            d.splice(initialPosition, 1);

                            d.splice(finalPosition, 0, { __ref });
                        });
                    },
                });

                // If the column is changed then update the destination column
                // relative to the final index
                if (columnID !== destinationColumnID) {
                    cache.modify(`Column:${destinationColumnID}`, {
                        issues: (refs: Reference[]) => {
                            return produce(refs, d => {
                                d.splice(finalPosition, 0, { __ref });
                            });
                        },
                    });
                }
            },
        });
    };

    return [handleMutation, meta];
};
