import React, { FC } from "react";
import { Grid } from "@material-ui/core";
import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";
import { Column } from "../../generated/graphql";
import ColumnItem from "./ColumnItem";

type Props = {
    columns: Column[];
};

const ColumnList: FC<Props> = ({ columns }) => {
    const handleDragEnd = (data: DropResult) => {
        console.log(data);
    };

    const list = columns.map((column, index) => (
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

export default ColumnList;
