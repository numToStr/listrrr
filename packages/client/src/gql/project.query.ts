import { gql, useQuery } from "@apollo/client";
import { Project } from "../generated/graphql";

const PROJECT_FRAGMENT = gql`
    fragment ProjectParts on Project {
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
            ...ProjectParts
        }
    }
    ${PROJECT_FRAGMENT}
`;

export type ProjectParts = Omit<Project, "columns" | "createdBy">;

export type ProjectsQuery = {
    projects: ProjectParts[];
};

export const useProjectsQuery = () => {
    const meta = useQuery<ProjectsQuery, {}>(PROJECTS);

    return meta;
};
