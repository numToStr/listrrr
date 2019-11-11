import React from "react";
import { useParams } from "react-router-dom";
import { useProjectQuery } from "../gql/project.query";

type Params = {
    projectID: string;
};

const ProjectView = () => {
    const { projectID } = useParams<Params>();
    const { data } = useProjectQuery({ _id: projectID });

    return <div>{data && data.project.title}</div>;
};

export default ProjectView;
