import React, { Fragment, useMemo, FC } from "react";
import { useParams } from "react-router-dom";
import { useIProjectsFilterQuery } from "../../gql/project.query";
import { Sort, Status, Maybe, Project } from "../../generated/graphql";
import ListSelectWrapper from "../Selections/ListSelectWrapper";
import ListPopupContext from "../Selections/ListPopupContext";
import ListSelectPopup from "../Selections/ListSelectPopup";
import ListSelected from "../Selections/ListSelected";
import { useIUpdateIssueProjects } from "../../gql/issue.query";
import { SubmitHandler } from "../../@types/types";

interface Props {
    projects: Maybe<Pick<Project, "_id" | "title">>[];
}

interface Params {
    issueID: string;
}

const ProjectSelection: FC<Props> = ({ projects }) => {
    const { issueID } = useParams<Params>();
    const { data } = useIProjectsFilterQuery({
        filters: {
            sort: Sort.CREATED_DESC,
            status: Status.OPEN,
        },
    });

    const [handleIssueUpdate] = useIUpdateIssueProjects();

    const initialValues = useMemo(() => projects.map(p => p!._id), [projects]);

    const handleClose: SubmitHandler<{ list: string[] }> = async values => {
        await handleIssueUpdate({
            variables: {
                where: {
                    _id: issueID,
                },
                data: {
                    projectIDs: values.list,
                },
            },
        });
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
            <ListSelected list={projects} emptyText="No projects..." />
        </Fragment>
    );
};

export default ProjectSelection;
