import { gql, useQuery } from "@apollo/client";
import { Project, QueryProjectArgs, FindInput } from "../generated/graphql";

const PROJECT_FRAGMENT = gql`
    fragment ProjectFragment on Project {
        _id
        title
        description
        closed
        createdAt
        updatedAt
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
    const meta = useQuery<ProjectsQuery, {}>(PROJECTS);

    return meta;
};

const PROJECT = gql`
    query Project($where: FindInput!) {
        project(where: $where) {
            ...ProjectFragment
            columns {
                _id
                title
                issues {
                    _id
                    title
                    updatedAt
                }
            }
        }
    }
    ${PROJECT_FRAGMENT}
`;

type ProjectQuery = {
    project: Project;
};

export const useProjectQuery = (where: FindInput) => {
    return useQuery<ProjectQuery, QueryProjectArgs>(PROJECT, {
        variables: { where }
    });
};
