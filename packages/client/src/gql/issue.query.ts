import {
    useIssuesQuery,
    useIssuesLazyQuery,
    useIssueQuery,
    useCreateIssueMutation,
    Status,
    IssuesQuery,
    IssuesQueryVariables,
    IssuesDocument,
    IssueQueryVariables,
    IssueQuery,
    IssueDocument,
} from "../generated/graphql";
import produce from "immer";

export const useIIssuesQuery = (variables: IssuesQueryVariables) => {
    return useIssuesQuery({
        variables,
    });
};

export const useIIssuesLazyQuery = () => {
    return useIssuesLazyQuery();
};

export const useIIssueQuery = (variables: IssueQueryVariables) => {
    return useIssueQuery({
        variables,
    });
};

export const useICreateIssueMutation = () => {
    return useCreateIssueMutation({
        update(cache, { data }) {
            if (!data) {
                return;
            }

            const { createIssue: i } = data;

            const variables = {
                filters: {
                    status: Status.OPEN,
                },
            };

            const cached = cache.readQuery<IssuesQuery, IssuesQueryVariables>({
                query: IssuesDocument,
                variables,
            });

            if (!cached) {
                return;
            }

            const issues = produce(cached.issues, draft => {
                draft.unshift(i);
            });

            // Pushing to project list
            cache.writeQuery<IssuesQuery, IssuesQueryVariables>({
                query: IssuesDocument,
                data: {
                    issues,
                },
                variables,
            });

            // Creating new cached query for the created project
            cache.writeQuery<IssueQuery, IssueQueryVariables>({
                query: IssueDocument,
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
    });
};
