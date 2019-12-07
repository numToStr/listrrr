import React, { FC, Fragment } from "react";
import { Box, Typography } from "@material-ui/core";
import { Maybe } from "../generated/graphql";
import ListSelectionPopup, { Item } from "./Selections/ListSelectionPopup";

type Props = {
    list: Maybe<Item>[];
};

const ListSelection: FC<Props> = ({ list, children }) => {
    return (
        <Fragment>
            <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                mb={0.5}
            >
                <Typography variant="subtitle2">Projects</Typography>
                <ListSelectionPopup list={list} />
            </Box>
            {children}
        </Fragment>
    );
};

export default ListSelection;
