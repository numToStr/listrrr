import React, { FC } from "react";
import { Droppable } from "react-beautiful-dnd";
import { Issue, Maybe } from "../../generated/graphql";
import ColumnIssueItem from "./ColumnIssueItem";
import { Grid, Typography } from "@material-ui/core";

type Props = {
    droppableId: string;
    issues: Maybe<Issue>[];
};

const ColumnIssueList: FC<Props> = ({ issues = [], droppableId }) => {
    const renderIssueList = () => {
        if (!issues.length) {
            return <Typography variant="caption">No Issue...</Typography>;
        }

        return issues.map(
            (issue, index) =>
                issue && (
                    <ColumnIssueItem
                        key={issue._id}
                        issue={issue}
                        index={index}
                    />
                )
        );
    };

    return (
        <Droppable
            droppableId={droppableId}
            direction="vertical"
            type="PROJECT_COLUMN_ISSUE"
        >
            {provided => (
                <Grid container spacing={1} innerRef={provided.innerRef}>
                    {renderIssueList()}
                    {provided.placeholder}
                </Grid>
            )}
        </Droppable>
    );
};

export default ColumnIssueList;
