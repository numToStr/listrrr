import produce from "immer";
import {
    useProjectsQuery,
    useProjectsLazyQuery,
    ProjectsQueryVariables,
    useProjectsFilterQuery,
    useProjectQuery,
    ProjectQueryVariables,
    useCreateProjectMutation,
    Status,
    ProjectsQuery,
    ProjectsDocument,
    ProjectQuery,
    ProjectDocument,
    useRearrangeColumnMutation,
    RearrangeColumnMutationFn,
    useRearrangeIssueMutation,
    RearrangeIssueMutationFn,
    ColumnFragmentFragment,
    ColumnFragmentFragmentDoc,
    RearrangeColumnMutationHookResult,
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

            const variables = {
                filters: {
                    status: Status.OPEN,
                },
            };

            const cached = cache.readQuery<
                ProjectsQuery,
                ProjectsQueryVariables
            >({
                query: ProjectsDocument,
                variables,
            });

            if (!cached) {
                return;
            }

            const projects = produce(cached.projects, draft => {
                draft.unshift(p);
            });

            // Pushing to project list
            cache.writeQuery<ProjectsQuery, ProjectsQueryVariables>({
                query: ProjectsDocument,
                data: {
                    projects,
                },
                variables,
            });

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
                    where: { projectID },
                    data: { initialPosition, finalPosition },
                } = options.variables!;

                const projectQuery = cache.readQuery<ProjectQuery>({
                    query: ProjectDocument,
                    variables: {
                        where: {
                            _id: projectID,
                        },
                    },
                });

                if (projectQuery) {
                    const project = produce(projectQuery.project, draft => {
                        const [f] = draft!.columns.splice(initialPosition, 1);
                        draft!.columns.splice(finalPosition, 0, f);
                    });

                    cache.writeQuery<ProjectQuery>({
                        query: ProjectDocument,
                        variables: {
                            where: {
                                _id: projectID,
                            },
                        },
                        data: { project },
                    });
                }
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
                    where: { columnID },
                    data: {
                        destinationColumnID,
                        initialPosition,
                        finalPosition,
                    },
                } = options.variables!;

                const initColumn = cache.readFragment<ColumnFragmentFragment>({
                    fragment: ColumnFragmentFragmentDoc,
                    id: `Column:${columnID}`,
                });

                if (!initColumn) {
                    return false;
                }

                if (columnID !== destinationColumnID) {
                    const destColumn = cache.readFragment<
                        ColumnFragmentFragment
                    >({
                        fragment: ColumnFragmentFragmentDoc,
                        id: `Column:${destinationColumnID}`,
                    });

                    const updatedInitColumn = produce(initColumn, draft => {
                        draft.issues.splice(initialPosition, 1);
                    });

                    const updatedDestColumn = produce(destColumn, draft => {
                        const f = initColumn.issues[initialPosition];
                        draft!.issues.splice(finalPosition, 0, f);
                    });

                    cache.writeFragment<ColumnFragmentFragment>({
                        fragment: ColumnFragmentFragmentDoc,
                        id: `Column:${columnID}`,
                        data: updatedInitColumn,
                    });

                    cache.writeFragment<ColumnFragmentFragment>({
                        fragment: ColumnFragmentFragmentDoc,
                        id: `Column:${destinationColumnID}`,
                        data: updatedDestColumn!,
                    });

                    return true;
                }

                if (initialPosition !== finalPosition) {
                    const updatedColumn = produce(initColumn, draft => {
                        const [f] = draft.issues.splice(initialPosition, 1);
                        draft.issues.splice(finalPosition, 0, f);
                    });

                    cache.writeFragment<ColumnFragmentFragment>({
                        fragment: ColumnFragmentFragmentDoc,
                        id: `Column:${columnID}`,
                        data: updatedColumn,
                    });

                    return true;
                }

                return false;
            },
        });
    };

    return [handleMutation, meta];
};
