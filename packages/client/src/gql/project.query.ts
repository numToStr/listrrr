import { gql, useQuery, useMutation } from "@apollo/client";
import {
    Project,
    QueryProjectArgs,
    FindInput,
    MutationCreateProjectArgs
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
        variables: { where }
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
                data: data!.createProject
            });
        },
        ...options
    });

    const handleMutation: HandleMutation<
        MutationCreateProjectArgs
    > = variables => {
        mutation({ variables });
    };

    return [handleMutation, meta];
};
