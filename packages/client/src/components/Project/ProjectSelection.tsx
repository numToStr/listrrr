import React, { Fragment, useMemo, FC } from "react";
import { useIProjectsFilterQuery } from "../../gql/project.query";
import { Sort, Status, Maybe, Project } from "../../generated/graphql";
import ListSelectWrapper from "../Selections/ListSelectWrapper";
import ListPopupContext from "../Selections/ListPopupContext";
import ListSelectPopup from "../Selections/ListSelectPopup";
import ListSelected from "../Selections/ListSelected";

interface Props {
    projects: Maybe<Pick<Project, "_id" | "title">>[];
}

const ProjectSelection: FC<Props> = ({ projects }) => {
    const { data } = useIProjectsFilterQuery({
        filters: {
            sort: Sort.CREATED_DESC,
            status: Status.OPEN,
        },
    });

    const initialValues = useMemo(() => projects.map(p => p!._id), [projects]);

    const handleClose = (values: any) => {
        console.log(values);
    };

    return (
        <Fragment>
            <ListSelectWrapper title="Projects">
                <ListPopupContext
                    onClose={handleClose}
                    initialValues={initialValues}
                >
                    <ListSelectPopup
                        title="Projects"
                        list={data?.projects ?? []}
                    />
                </ListPopupContext>
            </ListSelectWrapper>
            <ListSelected list={projects} />
        </Fragment>
    );
};

export default ProjectSelection;
