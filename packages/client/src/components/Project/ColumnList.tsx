import React, { FC, useCallback, memo } from "react";
import { Grid } from "@material-ui/core";
import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";
import { ColumnFragmentFragment } from "../../generated/graphql";
import ColumnItem from "./ColumnItem";
import {
    useIRearrangeColumnMutation,
    useIRearrangeIssueMutation,
} from "../../gql/project.query";
import { RearrangeType } from "../../@types/types";

type Props = {
    projectID: string;
    columns: ColumnFragmentFragment[];
};

const ColumnList: FC<Props> = ({ projectID, columns }) => {
    const [handleRearrangeColumn] = useIRearrangeColumnMutation();
    const [handleRearrangeIssue] = useIRearrangeIssueMutation();

    const columnRearrange = useCallback(
        ({ draggableId, source, destination }: DropResult) => {
            const i = source.index;
            const f = destination!.index;

            if (i !== f) {
                handleRearrangeColumn({
                    variables: {
                        where: {
                            projectID,
                            columnID: draggableId,
                        },
                        data: {
                            initialPosition: i,
                            finalPosition: f,
                        },
                    },
                });
            }
        },
        [handleRearrangeColumn, projectID]
    );

    const issueRearrange = useCallback(
        ({ draggableId: isID, source, destination }: DropResult) => {
            const { index: ip, droppableId: cID } = source;
            const { index: fp, droppableId: dID } = destination!;

            if (cID === dID && ip === fp) {
                return;
            }

            handleRearrangeIssue({
                variables: {
                    where: {
                        issueID: isID,
                        columnID: cID,
                    },
                    data: {
                        destinationColumnID: dID,
                        initialPosition: ip,
                        finalPosition: fp,
                    },
                },
            });
        },
        [handleRearrangeIssue]
    );

    const handleDragEnd = useCallback(
        (dropResult: DropResult) => {
            if (!dropResult.destination) {
                return;
            }

            if (dropResult.type === RearrangeType.PROJECT_COLUMN) {
                return columnRearrange(dropResult);
            }

            return issueRearrange(dropResult);
        },
        [columnRearrange, issueRearrange]
    );

    const list = columns.map((column, index) => (
        <ColumnItem key={column._id} column={column} index={index} />
    ));

    return (
        <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable
                droppableId="project-column"
                direction="horizontal"
                type={RearrangeType.PROJECT_COLUMN}
            >
                {provided => {
                    return (
                        <Grid
                            container
                            spacing={2}
                            innerRef={provided.innerRef}
                        >
                            {list}
                            {provided.placeholder}
                        </Grid>
                    );
                }}
            </Droppable>
        </DragDropContext>
    );
};

export default memo(ColumnList);
