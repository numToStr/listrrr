import React, { Fragment, useMemo } from "react";
// import { useParams } from "react-router-dom";
import LabelIcon from "@material-ui/icons/Label";
import { Maybe, Project } from "../../generated/graphql";
import ListSelectWrapper from "../Selections/ListSelectWrapper";
import ListPopupContext from "../Selections/ListPopupContext";
import ListSelectPopup from "../Selections/ListSelectPopup";
import ListSelected from "../Selections/ListSelected";
import { SubmitHandler } from "../../@types/types";
import { useILabelsQuery } from "../../gql/label.query";

interface Props {
    labels: Maybe<Pick<Project, "_id" | "title">>[];
}

interface Params {
    issueID: string;
}

const LabelSelection = () => {
    // const { issueID } = useParams<Params>();
    const { data } = useILabelsQuery();

    const initialValues: string[] = [];

    const handleClose: SubmitHandler<{ list: string[] }> = async values => {
        console.log(values);
    };

    const list = useMemo(() => {
        return data?.labels.map(d => ({
            ...d!,
            icon: <LabelIcon style={{ fill: d?.color }} />,
        }));
    }, [data]);

    return (
        <Fragment>
            <ListSelectWrapper title="Labels">
                <ListPopupContext
                    onClose={handleClose}
                    initialValues={initialValues}
                >
                    <ListSelectPopup title="Labels" list={list ?? []} />
                </ListPopupContext>
            </ListSelectWrapper>
            <ListSelected list={[]} emptyText="No labels..." />
        </Fragment>
    );
};

export default LabelSelection;
