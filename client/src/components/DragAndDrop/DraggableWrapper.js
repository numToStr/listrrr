import React from "react";
import { Draggable } from "react-beautiful-dnd";

const DraggableWrapper = ({ id, index, children, innerProps }) => (
    <Draggable draggableId={id} index={index}>
        {(provided, snapshot) => (
            <div
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                {...innerProps}
            >
                {children}
                {provided.placeholder}
            </div>
        )}
    </Draggable>
);

export default DraggableWrapper;
