import { gql, useQuery, useMutation } from "@apollo/client";
import { produce } from "immer";
import {
    Issue,
    QueryIssueArgs,
    FindInput,
    MutationCreateIssueArgs,
    QueryProjectsArgs,
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
    query Issues($filters: Filters!) {
        issues(filters: $filters) {
            ...IssueFragment
        }
    }
    ${ISSUE_FRAGMENT}
`;

export type IssueFragment = Omit<Issue, "projects" | "createdBy">;

export type IssuesQuery = {
    issues: IssueFragment[];
};

export const useIssuesQuery = (variables: QueryProjectsArgs) => {
    return useQuery<IssuesQuery, QueryProjectsArgs>(ISSUES, {
        variables,
    });
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
        variables: { where },
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
        update(cache, { data }) {
            if (!data) {
                return;
            }

            const { createIssue: i } = data;

            const cached = cache.readQuery<IssuesQuery>({
                query: ISSUES,
            });

            if (!cached) {
                return;
            }

            const issues = produce(cached.issues, draft => {
                draft.unshift(i);
            });

            // Pushing to project list
            cache.writeQuery<IssuesQuery>({
                query: ISSUES,
                data: {
                    issues,
                },
            });

            // Creating new cached query for the created project
            cache.writeQuery<IssueQuery, QueryIssueArgs>({
                query: ISSUE,
                variables: {
                    where: {
                        _id: i._id,
                    },
                },
                data: {
                    issue: i,
                },
            });
        },
        ...options,
    });

    const handleMutation: HandleMutation<MutationCreateIssueArgs> = variables => {
        mutation({ variables });
    };

    return [handleMutation, meta];
};
