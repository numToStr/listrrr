import React from "react";
import Typography from "@material-ui/core/Typography";
import makeStyles from "@material-ui/styles/makeStyles";

import DragContext from "../DragAndDrop/DragContext";
import DraggableWrapper from "../DragAndDrop/DraggableWrapper";
import ProjectCard from "./ProjectCard";

const useStyles = makeStyles({
    container: {
        width: "calc(100% + 16px)",
        margin: "-8px",
        display: "flex",
        justifyContent: "space-between",
        flexWrap: "wrap",
        boxSizing: "border-box"
    },
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
            <ProjectCard {...entities[item]} issue={issues[item]} />
        </DraggableWrapper>
    ));

    return (
        <DragContext
            direction="horizontal"
            id="project-list-droppable"
            innerProps={{
                className: styles.container
            }}
        >
            {list}
        </DragContext>
    );
};

export default ProjectCardList;
