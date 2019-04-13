import React from "react";
import { Droppable } from "react-beautiful-dnd";

const DroppableWrapper = ({
    id,
    direction = "vertical",
    children,
    innerProps,
    type,
    ...props
}) => (
    <Droppable droppableId={id} direction={direction} type={type} {...props}>
        {provided => (
            <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                {...innerProps}
            >
                {children}
                {provided.placeholder}
            </div>
        )}
    </Droppable>
);

export default DroppableWrapper;
