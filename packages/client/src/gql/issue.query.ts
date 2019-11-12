import { gql, useQuery, useMutation } from "@apollo/client";
import {
    Issue,
    QueryIssueArgs,
    FindInput,
    MutationCreateIssueArgs
} from "../generated/graphql";
import { MyMutationHook, HandleMutation } from "../@types/types";

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

const CREATE_ISSUE = gql`
    mutation CreateIssue($data: CreateIssueInput!) {
        createIssue(data: $data) {
            ...IssueFragment
            projects {
                _id
                title
            }
        }
    }
    ${ISSUE_FRAGMENT}
`;

type CreateIssueMutation = {
    createIssue: Issue;
};

export const useCreateIssueMutation: MyMutationHook<
    CreateIssueMutation,
    MutationCreateIssueArgs
> = options => {
    const [mutation, meta] = useMutation<
        CreateIssueMutation,
        MutationCreateIssueArgs
    >(CREATE_ISSUE, {
        update() {
            // update the cache
        },
        ...options
    });

    const handleMutation: HandleMutation<
        MutationCreateIssueArgs
    > = variables => {
        mutation({ variables });
    };

    return [handleMutation, meta];
};
