import React, { FC, useCallback, memo } from "react";
import { Grid } from "@material-ui/core";
import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";
import { Column } from "../../generated/graphql";
import ColumnItem from "./ColumnItem";
import { useRearrangeColumnMutation } from "../../gql/project.query";
import { RearrangeType } from "../../@types/types";

type Props = {
    projectID: string;
    columns: Column[];
};

const ColumnList: FC<Props> = ({ projectID, columns }) => {
    const [handleRearrangeColumn] = useRearrangeColumnMutation();

    const columnRearrange = useCallback(
        ({ draggableId, source, destination }: DropResult) => {
            if (destination) {
                const i = source.index;
                const f = destination.index;

                if (i !== f) {
                    handleRearrangeColumn({
                        where: {
                            projectID,
                            columnID: draggableId,
                        },
                        data: {
                            initialPosition: i,
                            finalPosition: f,
                        },
                    });
                }
            }
        },
        [handleRearrangeColumn, projectID]
    );

    const handleDragEnd = useCallback(
        (dropResult: DropResult) => {
            if (dropResult.type === RearrangeType.PROJECT_COLUMN) {
                return columnRearrange(dropResult);
            }
        },
        [columnRearrange]
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
