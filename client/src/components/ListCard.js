import React, { memo } from "react";

import Paper from "@material-ui/core/Paper";
import makeStyles from "@material-ui/styles/makeStyles";

const useStyles = makeStyles(({ spacing, mixins }) => {
    const pUnit = spacing(1.5);

    return {
        cardPadding: {
            ...mixins.gutters(),
            paddingTop: pUnit,
            paddingBottom: pUnit,
            marginBottom: pUnit
        }
    };
});

const ListCard = ({ children }) => {
    const classes = useStyles();

    return (
        <Paper className={classes.cardPadding} elevation={1}>
            {children}
        </Paper>
    );
};

export default memo(ListCard);
