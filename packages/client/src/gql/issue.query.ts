import { gql, useQuery } from "@apollo/client";
import { Issue } from "../generated/graphql";

const ISSUE_FRAGMENT = gql`
    fragment IssueParts on Issue {
        _id
        title
        description
        closed
        createdAt
        updatedAt
    }
`;

const ISSUES = gql`
    query Issues {
        issues {
            ...IssueParts
        }
    }
    ${ISSUE_FRAGMENT}
`;

export type IssueParts = Omit<Issue, "projects" | "createdBy">;

export type IssuesQuery = {
    issues: IssueParts[];
};

export const useIssuesQuery = () => {
    return useQuery<IssuesQuery, {}>(ISSUES);
};
