import { gql, useQuery } from "@apollo/client";
import { Issue, QueryIssueArgs, FindInput } from "../generated/graphql";

export const ISSUE_FRAGMENT = gql`
    fragment IssueFragment on Issue {
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
            ...IssueFragment
        }
    }
    ${ISSUE_FRAGMENT}
`;

export type IssueFragment = Omit<Issue, "projects" | "createdBy">;

export type IssuesQuery = {
    issues: IssueFragment[];
};

export const useIssuesQuery = () => {
    return useQuery<IssuesQuery, {}>(ISSUES);
};

const ISSUE = gql`
    query Issue($where: FindInput!) {
        issue(where: $where) {
            ...IssueFragment
            projects {
                _id
                title
            }
        }
    }
    ${ISSUE_FRAGMENT}
`;

type IssueQuery = {
    issue: Issue;
};

export const useIssueQuery = (where: FindInput) => {
    return useQuery<IssueQuery, QueryIssueArgs>(ISSUE, {
        variables: { where }
    });
};
