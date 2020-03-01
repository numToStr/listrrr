import React, { FC, Fragment } from "react";
import { Typography } from "@material-ui/core";
import { Maybe } from "../../generated/graphql";

type II = {
    _id: string;
    title: string;
};

type Props = {
    list: Maybe<II>[];
};

const ListSelected: FC<Props> = ({ list }) => {
    if (!list.length) {
        return <Typography variant="caption">No Projects...</Typography>;
    }

    const ll = list.map(li => (
        <Typography key={li?._id} variant="caption" component="p" gutterBottom>
            - {li?.title}
        </Typography>
    ));

    return <Fragment>{ll}</Fragment>;
};

export default ListSelected;
