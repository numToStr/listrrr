import {
    useEditDetailsMutation,
    useCloseOrOpenMutation,
    EditDetailsMutationOptions,
    CloseOrOpenMutationHookResult,
    CloseOrOpenMutationFn,
    EntityType,
    IssueDocument,
    IssueQuery,
    IssueQueryVariables,
    ProjectQueryVariables,
    ProjectQuery,
    ProjectDocument,
} from "../generated/graphql";
import produce from "immer";

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

                // If the mutation is for the Issue
                if (type === EntityType.ISSUE) {
                    const ii = cache.readQuery<IssueQuery, IssueQueryVariables>(
                        {
                            query: IssueDocument,
                            variables: {
                                where: {
                                    _id,
                                },
                            },
                        }
                    );

                    if (!ii) {
                        return false;
                    }

                    const updatedIssue = produce(ii.issue, d => {
                        if (d) {
                            d.closed = !d.closed;
                        }
                    });

                    return cache.writeQuery<IssueQuery, IssueQueryVariables>({
                        query: IssueDocument,
                        variables: {
                            where: {
                                _id,
                            },
                        },
                        data: {
                            issue: updatedIssue,
                        },
                    });
                }

                // If the mutation is for the Project
                const pp = cache.readQuery<ProjectQuery, ProjectQueryVariables>(
                    {
                        query: ProjectDocument,
                        variables: {
                            where: {
                                _id,
                            },
                        },
                    }
                );

                if (!pp) {
                    return false;
                }

                const updatedProject = produce(pp.project, d => {
                    if (d) {
                        d.closed = !d.closed;
                    }
                });

                return cache.writeQuery<ProjectQuery, ProjectQueryVariables>({
                    query: ProjectDocument,
                    variables: {
                        where: {
                            _id,
                        },
                    },
                    data: {
                        project: updatedProject,
                    },
                });
            },
        });
    };

    return [handleMutation, data];
};
