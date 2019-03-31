import React, { memo } from "react";

import Paper from "@material-ui/core/Paper";
import withStyles from "@material-ui/core/styles/withStyles";

const styles = ({ spacing, mixins }) => {
    const pUnit = spacing.unit * 1.5;

    return {
        cardPadding: {
            ...mixins.gutters(),
            paddingTop: pUnit,
            paddingBottom: pUnit,
            marginBottom: pUnit
        }
    };
};

const ListCard = ({ classes, children }) => {
    return (
        <Paper className={classes.cardPadding} elevation={1}>
            {children}
        </Paper>
    );
};

export default memo(withStyles(styles)(ListCard));
