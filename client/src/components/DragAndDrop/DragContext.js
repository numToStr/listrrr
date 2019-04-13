import React from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

const DragContext = ({
    id,
    direction = "vertical",
    children,
    innerProps,
    onDragEnd
}) => (
    <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId={id} direction={direction}>
            {(provided, snapshot) => (
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
    </DragDropContext>
);

export default DragContext;
