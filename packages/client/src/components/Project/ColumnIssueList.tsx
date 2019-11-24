import React, { FC, useCallback, memo } from "react";
import { Droppable } from "react-beautiful-dnd";
import { Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { GridProps } from "@material-ui/core/Grid";
import { Issue, Maybe } from "../../generated/graphql";
import ColumnIssueItem from "./ColumnIssueItem";
import { RearrangeType } from "../../@types/types";

type Props = {
    droppableId: string;
    issues: Maybe<Issue>[];
};

type P = {
    dragging: boolean;
};

const useStyles = makeStyles(
    ({ palette: { secondary, background }, shape: { borderRadius } }) => {
        return {
            grid: ({ dragging }: P) => ({
                background: dragging ? secondary.light : background.paper,
                borderRadius,
                transition: "all 0.3s ease-in-out",
            }),
        };
    }
);

const StyledGrid: FC<GridProps & P> = ({ dragging, ...props }) => {
    const styles = useStyles({ dragging });

    return <Grid className={styles.grid} {...props} />;
};

const ColumnIssueList: FC<Props> = ({ issues = [], droppableId }) => {
    const renderIssueList = useCallback(
        (dragging: boolean) => {
            if (!issues.length) {
                return (
                    !dragging && (
                        <Grid item xs={12}>
                            <Typography variant="caption">
                                No Issue...
                            </Typography>
                        </Grid>
                    )
                );
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
        },
        [issues]
    );

    return (
        <Droppable
            droppableId={droppableId}
            direction="vertical"
            type={RearrangeType.PROJECT_COLUMN_ISSUE}
        >
            {(provided, { isDraggingOver }) => (
                <StyledGrid
                    container
                    spacing={1}
                    innerRef={provided.innerRef}
                    dragging={isDraggingOver}
                >
                    {renderIssueList(isDraggingOver)}
                    {provided.placeholder}
                </StyledGrid>
            )}
        </Droppable>
    );
};

export default memo(ColumnIssueList);
