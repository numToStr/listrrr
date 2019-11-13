import { gql, useQuery, useMutation } from "@apollo/client";
import {
    Project,
    QueryProjectArgs,
    FindInput,
    MutationCreateProjectArgs,
    Column,
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
        position
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
            cache.writeData({
                // Cache is not updating | Do something
                data: data!.createProject,
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
    mutation RearrangeColumn($where: FindInput!, $data: RearrangeColumnInput!) {
        rearrangeColumn(where: $where, data: $data) {
            _id
            position
        }
    }
`;

type RearrangeColumn = {
    rearrangeColumn: Omit<Column, "issues" | "title">[];
};

type RearrangeColumnMutation = MutationRearrangeColumnArgs & {
    projectID: string;
};

export const useRearrangeColumnMutation: MyMutationHook<
    RearrangeColumn,
    RearrangeColumnMutation
> = options => {
    const [mutation, meta] = useMutation(REARRANGE_COLUMN, options);

    const handleMutation: HandleMutation<RearrangeColumnMutation> = variables => {
        mutation({
            variables,
            optimisticResponse: {
                rearrangeColumn: [
                    {
                        __typename: "Column",
                        _id: variables.where._id,
                        position: variables.data.finalPosition,
                    },
                ],
            },
            update(cache, { data }) {
                if (data) {
                    if (data.rearrangeColumn.length > 1) {
                        return;
                    }

                    const [updatedColumn] = data.rearrangeColumn;

                    const projectQuery: {
                        project: Project;
                    } | null = cache.readQuery({
                        query: PROJECT,
                        variables: {
                            where: {
                                _id: variables.projectID,
                            },
                        },
                    });

                    if (projectQuery) {
                        const { columns } = projectQuery.project;
                        const {
                            initialPosition,
                            finalPosition,
                        } = variables.data;

                        const updatedColumns = columns.map(column => {
                            const c = { ...column };

                            if (c._id === updatedColumn._id) {
                                c.position = updatedColumn.position;
                            } else {
                                if (initialPosition > finalPosition) {
                                    if (c.position >= finalPosition) {
                                        c.position++;
                                    }
                                } else {
                                    // initial < final
                                    if (c.position <= finalPosition) {
                                        c.position--;
                                    }
                                }
                            }

                            return c;
                        });

                        cache.writeQuery({
                            query: PROJECT,
                            variables: {
                                where: {
                                    _id: variables.projectID,
                                },
                            },
                            data: {
                                project: {
                                    ...projectQuery.project,
                                    columns: updatedColumns,
                                },
                            },
                        });
                    }
                }
            },
        });
    };

    return [handleMutation, meta];
};
