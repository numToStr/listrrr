import produce from "immer";
import { ApolloCache } from "@apollo/client";
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
    Mutation,
    ProjectsDocument,
    ProjectsQuery,
    ProjectsQueryVariables,
    Status,
    IssuesQuery,
    IssuesQueryVariables,
    IssuesDocument,
} from "../generated/graphql";

type CloseOrOpen = (
    cache: ApolloCache<Pick<Mutation, "closeOrOpen">>,
    _id: string,
    closed: boolean
) => void;

const isClosedIssue: CloseOrOpen = (cache, _id, closed) => {
    try {
        const ii = cache.readQuery<IssueQuery, IssueQueryVariables>({
            query: IssueDocument,
            variables: {
                where: {
                    _id,
                },
            },
        });

        if (!ii) {
            return false;
        }

        const updatedIssue = produce(ii.issue, d => {
            if (d) {
                d.closed = !d.closed;
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
                issue: updatedIssue,
            },
        });

        // If closing,
        // - then remove the item from the open list
        // - add the item in the closed list

        const status = closed ? Status.CLOSED : Status.OPEN;
        const invStatus = closed ? Status.OPEN : Status.CLOSED;

        const l = cache.readQuery<IssuesQuery, IssuesQueryVariables>({
            query: IssuesDocument,
            variables: {
                filters: { status: invStatus },
            },
        });

        if (!l?.issues.length) {
            return false;
        }

        const openUpdate = produce(l.issues, d => {
            // when using filter, you should return the filtered array
            return d.filter(p => p?._id !== _id);
        });

        cache.writeQuery<IssuesQuery, IssuesQueryVariables>({
            query: IssuesDocument,
            variables: {
                filters: { status: invStatus },
            },
            data: {
                issues: openUpdate,
            },
        });

        const t = cache.readQuery<IssuesQuery, IssuesQueryVariables>({
            query: IssuesDocument,
            variables: {
                filters: { status },
            },
        });

        if (!t?.issues) {
            return false;
        }

        const closedUpdate = produce(t.issues, d => {
            // when using filter, you should return the filtered array
            const toBeAdd = l.issues.find(p => p?._id === _id);

            if (toBeAdd) {
                d.push(toBeAdd);
            }
        });

        return cache.writeQuery<IssuesQuery, IssuesQueryVariables>({
            query: IssuesDocument,
            variables: {
                filters: { status },
            },
            data: {
                issues: closedUpdate,
            },
        });
    } catch (error) {
        console.log(error);
    }
};

const isClosedProject: CloseOrOpen = (cache, _id, closed) => {
    try {
        // If the mutation is for the Project
        const pp = cache.readQuery<ProjectQuery, ProjectQueryVariables>({
            query: ProjectDocument,
            variables: {
                where: {
                    _id,
                },
            },
        });

        if (!pp) {
            return false;
        }

        const updatedProject = produce(pp.project, d => {
            if (d) {
                d.closed = !d.closed;
            }
        });

        cache.writeQuery<ProjectQuery, ProjectQueryVariables>({
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

        // If closing,
        // - then remove the item from the open list
        // - add the item in the closed list

        const status = closed ? Status.CLOSED : Status.OPEN;
        const invStatus = closed ? Status.OPEN : Status.CLOSED;

        const l = cache.readQuery<ProjectsQuery, ProjectsQueryVariables>({
            query: ProjectsDocument,
            variables: {
                filters: { status: invStatus },
            },
        });

        if (!l?.projects.length) {
            return false;
        }

        const openUpdate = produce(l.projects, d => {
            // when using filter, you should return the filtered array
            return d.filter(p => p?._id !== _id);
        });

        cache.writeQuery<ProjectsQuery, ProjectsQueryVariables>({
            query: ProjectsDocument,
            variables: {
                filters: { status: invStatus },
            },
            data: {
                projects: openUpdate,
            },
        });

        const t = cache.readQuery<ProjectsQuery, ProjectsQueryVariables>({
            query: ProjectsDocument,
            variables: {
                filters: { status },
            },
        });

        if (!t?.projects) {
            return false;
        }

        const closedUpdate = produce(t.projects, d => {
            // when using filter, you should return the filtered array
            const toBeAdd = l.projects.find(p => p?._id === _id);

            if (toBeAdd) {
                d.push(toBeAdd);
            }
        });

        return cache.writeQuery<ProjectsQuery, ProjectsQueryVariables>({
            query: ProjectsDocument,
            variables: {
                filters: { status },
            },
            data: {
                projects: closedUpdate,
            },
        });
    } catch (error) {
        console.log(error);
    }
};

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
                    data: { closed },
                    where: { _id, type },
                } = options.variables!;

                // If the mutation is for the Issue
                if (type === EntityType.ISSUE) {
                    return isClosedIssue(cache, _id, closed);
                }

                return isClosedProject(cache, _id, closed);
            },
        });
    };

    return [handleMutation, data];
};
