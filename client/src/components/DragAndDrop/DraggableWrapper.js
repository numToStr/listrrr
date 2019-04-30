import React, { forwardRef } from "react";
import Grid from "@material-ui/core/Grid";
import { Draggable } from "react-beautiful-dnd";

const RefGrid = forwardRef((props, ref) => <Grid innerRef={ref} {...props} />);

const DraggableWrapper = ({ id, index, children, innerProps }) => (
    <Draggable draggableId={id} index={index}>
        {(provided, snapshot) => (
            <RefGrid
                item
                xs
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
            >
                {children}
                {provided.placeholder}
            </RefGrid>
        )}
    </Draggable>
);

export default DraggableWrapper;
