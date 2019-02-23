import React from "react";
import Link from "react-router-dom/Link";

import formatDistance from "date-fns/formatDistance";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
// import Checkbox from "@material-ui/core/Checkbox";

// import Favorite from "@material-ui/icons/Favorite";
// import FavoriteBorder from "@material-ui/icons/FavoriteBorder";

const styles = ({ spacing, mixins }) => {
    const pUnit = spacing.unit * 1.5;

    return {
        cardPadding: {
            // padding: `${pUnit}rem ${pUnit}rem !important`
            ...mixins.gutters(),
            paddingTop: pUnit,
            paddingBottom: pUnit,
            marginBottom: pUnit
        }
    };
};

const IssueItem = ({ classes, _id, title, createdAt }) => {
    const creationDate = formatDistance(new Date(createdAt), new Date(), {
        addSuffix: true
    });

    return (
        <Paper className={classes.cardPadding} elevation={1}>
            <Grid container alignItems="center">
                {/* <Grid item>
                    <Checkbox
                        icon={<FavoriteBorder fontSize="small" />}
                        checkedIcon={<Favorite fontSize="small" />}
                        checked={true}
                        value={_id}
                        color="primary"
                    />
                </Grid> */}
                <Grid item>
                    <Typography variant="h6">
                        <Link to={`/d/issues/view/${_id}`}>{title}</Link>
                    </Typography>
                    <Typography variant="caption" color="textSecondary">
                        created {creationDate}
                    </Typography>
                </Grid>
            </Grid>
        </Paper>
    );
};

export default withStyles(styles)(IssueItem);
