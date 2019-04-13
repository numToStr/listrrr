import React from "react";
import Typography from "@material-ui/core/Typography";
import makeStyles from "@material-ui/styles/makeStyles";

import DraggableWrapper from "../DragAndDrop/DraggableWrapper";
import ProjectCard from "./ProjectCard";

const useStyles = makeStyles({
    item: {
        padding: 8,
        flexGrow: 1,
        maxWidth: "100%",
        flexBasis: 0,
        margin: 0,
        boxSizing: "border-box",
        height: "100%"
    }
});

const ProjectCardList = ({ columns: { entities, result }, issues }) => {
    const styles = useStyles();

    if (!result || !result.length) {
        return <Typography>Oops! There is no column.</Typography>;
    }

    const list = result.map((item, $i) => (
        <DraggableWrapper
            key={item}
            id={item}
            index={$i}
            innerProps={{
                className: styles.item
            }}
        >
            <ProjectCard
                droppableId={item}
                issue={issues[item]}
                {...entities[item]}
            />
        </DraggableWrapper>
    ));

    return list;
};

export default ProjectCardList;
