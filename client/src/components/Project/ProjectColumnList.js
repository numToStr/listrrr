import React from "react";
import Typography from "@material-ui/core/Typography";

import DraggableWrapper from "../DragAndDrop/DraggableWrapper";
import ProjectColumn from "./ProjectColumn";

const ProjectCardList = ({ columns: { entities, result }, issues }) => {
    if (!result || !result.length) {
        return <Typography>Oops! There is no column.</Typography>;
    }

    const list = result.map((item, $i) => (
        <DraggableWrapper
            gridProps={{ xs: 12, md: true }}
            key={item}
            id={item}
            index={$i}
        >
            <ProjectColumn
                droppableId={item}
                issue={issues[item]}
                {...entities[item]}
            />
        </DraggableWrapper>
    ));

    return list;
};

export default ProjectCardList;
