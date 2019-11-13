import React, { FC, useCallback, memo } from "react";
import { Grid } from "@material-ui/core";
import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";
import { Column } from "../../generated/graphql";
import ColumnItem from "./ColumnItem";
import { useRearrangeColumnMutation } from "../../gql/project.query";

type Props = {
    projectID: string;
    columns: Column[];
};

const ColumnList: FC<Props> = ({ projectID, columns }) => {
    const [handleRearrangeColumn] = useRearrangeColumnMutation();

    const handleDragEnd = useCallback(
        ({ draggableId, source, destination }: DropResult) => {
            if (destination) {
                const i = source.index;
                const f = destination.index;

                if (i !== f) {
                    handleRearrangeColumn({
                        projectID,
                        where: {
                            _id: draggableId,
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

    // console.log("asdfasdf", columns);

    // Destructuring because of @apollo/client deep freeze, don't know why its happening
    // Raise an issue
    const list = [...columns]
        .sort((colA, colB) => colA.position - colB.position)
        .map((column, index) => (
            <ColumnItem key={column._id} column={column} index={index} />
        ));

    return (
        <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable
                droppableId="project-column"
                direction="horizontal"
                type="PROJECT_COLUMN"
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
