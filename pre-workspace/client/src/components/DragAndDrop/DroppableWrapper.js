import React, { forwardRef } from "react";
import Grid from "@material-ui/core/Grid";
import { Droppable } from "react-beautiful-dnd";

const RefGrid = forwardRef((props, ref) => <Grid innerRef={ref} {...props} />);

const DroppableWrapper = ({
    id,
    direction = "vertical",
    children,
    type,
    ...props
}) => (
    <Droppable droppableId={id} direction={direction} type={type} {...props}>
        {provided => (
            <RefGrid
                container
                spacing={1}
                ref={provided.innerRef}
                {...provided.droppableProps}
            >
                {children}
                {provided.placeholder}
            </RefGrid>
        )}
    </Droppable>
);

export default DroppableWrapper;
