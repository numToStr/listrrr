import React from "react";
import ProjectItem from "./ProjectItem";

const ProjectList = ({ items }) => {
    const list = Object.values(items).map(item => (
        <ProjectItem key={item._id} {...item} />
    ));

    return list;
};

export default ProjectList;
