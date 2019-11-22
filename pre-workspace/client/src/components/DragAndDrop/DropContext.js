import React from "react";
import { DragDropContext } from "react-beautiful-dnd";

const DropContext = ({ onDragEnd, children }) => {
    return <DragDropContext onDragEnd={onDragEnd}>{children}</DragDropContext>;
};

export default DropContext;
