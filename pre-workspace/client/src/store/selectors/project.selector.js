import { createSelector } from "reselect";

export const projectIssuesSelector = createSelector(
    currentProject => (currentProject ? currentProject.issues : null),
    issues => {
        if (!issues) {
            return {};
        }

        const columns = {};

        issues.result.forEach(issue => {
            const _issue = issues.entities[issue];

            if (_issue.column in columns) {
                columns[_issue.column].push(_issue);
            } else {
                columns[_issue.column] = [_issue];
            }
        });

        return columns;
    }
);
