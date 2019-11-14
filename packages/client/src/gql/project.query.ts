import { gql, useQuery, useMutation } from "@apollo/client";
import { produce } from "immer";
import {
    Project,
    QueryProjectArgs,
    FindInput,
    MutationCreateProjectArgs,
    MutationRearrangeColumnArgs,
} from "../generated/graphql";
import { MyMutationHook, HandleMutation } from "../@types/types";

export const PROJECT_FRAGMENT = gql`
    fragment ProjectFragment on Project {
        _id
        title
        description
        closed
        createdAt
        updatedAt
    }
`;

const COLUMN_FRAGMENT = gql`
    fragment ColumnFragment on Column {
        _id
        title
        issues {
            _id
            title
            updatedAt
        }
    }
`;

const PROJECTS = gql`
    query Projects {
        projects {
            ...ProjectFragment
        }
    }
    ${PROJECT_FRAGMENT}
`;

export type ProjectFragment = Omit<Project, "columns" | "createdBy">;

export type ProjectsQuery = {
    projects: ProjectFragment[];
};

export const useProjectsQuery = () => {
    return useQuery<ProjectsQuery, {}>(PROJECTS);
};

const PROJECT = gql`
    query Project($where: FindInput!) {
        project(where: $where) {
            ...ProjectFragment
            columns {
                ...ColumnFragment
            }
        }
    }
    ${PROJECT_FRAGMENT}
    ${COLUMN_FRAGMENT}
`;

type ProjectQuery = {
    project: Project;
};

export const useProjectQuery = (where: FindInput) => {
    return useQuery<ProjectQuery, QueryProjectArgs>(PROJECT, {
        variables: { where },
    });
};

const CREATE_PROJECT = gql`
    mutation CreateProject($data: CreateProjectInput!) {
        createProject(data: $data) {
            ...ProjectFragment
            columns {
                ...ColumnFragment
            }
        }
    }
    ${PROJECT_FRAGMENT}
    ${COLUMN_FRAGMENT}
`;

type CreateProjectMutation = {
    createProject: Project;
};

export const useCreateProjectMutation: MyMutationHook<
    CreateProjectMutation,
    MutationCreateProjectArgs
> = options => {
    const [mutation, meta] = useMutation<
        CreateProjectMutation,
        MutationCreateProjectArgs
    >(CREATE_PROJECT, {
        update(cache, { data }) {
            if (!data) {
                return;
            }

            const { createProject: p } = data;

            const cached = cache.readQuery<ProjectsQuery>({
                query: PROJECTS,
            });

            if (!cached) {
                return;
            }

            const projects = produce(cached.projects, draft => {
                draft.unshift(p);
            });

            // Pushing to project list
            cache.writeQuery({
                query: PROJECTS,
                data: {
                    projects,
                },
            });

            // Creating new cached query for the created project
            cache.writeQuery<ProjectQuery, QueryProjectArgs>({
                query: PROJECT,
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
        ...options,
    });

    const handleMutation: HandleMutation<MutationCreateProjectArgs> = variables => {
        mutation({ variables });
    };

    return [handleMutation, meta];
};

const REARRANGE_COLUMN = gql`
    mutation RearrangeColumn(
        $where: RearrangeColumnFindInput!
        $data: RearrangeColumnData!
    ) {
        rearrangeColumn(where: $where, data: $data)
    }
`;

type RearrangeColumn = {
    rearrangeColumn: boolean;
};

export const useRearrangeColumnMutation: MyMutationHook<
    RearrangeColumn,
    MutationRearrangeColumnArgs
> = options => {
    const [mutation, meta] = useMutation(REARRANGE_COLUMN, options);

    const handleMutation: HandleMutation<MutationRearrangeColumnArgs> = variables => {
        const { projectID } = variables.where;
        const { initialPosition, finalPosition } = variables.data;
        mutation({
            variables,
            optimisticResponse: {
                rearrangeColumn: true,
            },
            update(cache, { data }) {
                // if rearrangeColumn is false => return, means update is not successful
                if (!data!.rearrangeColumn) {
                    return;
                }

                const projectQuery = cache.readQuery<ProjectQuery>({
                    query: PROJECT,
                    variables: {
                        where: {
                            _id: projectID,
                        },
                    },
                });

                if (projectQuery) {
                    const project = produce(projectQuery.project, draft => {
                        const [deleted] = draft.columns.splice(
                            initialPosition,
                            1
                        );
                        draft.columns.splice(finalPosition, 0, deleted);
                    });

                    cache.writeQuery<ProjectQuery>({
                        query: PROJECT,
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
