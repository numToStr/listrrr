import React, { Fragment } from "react";
import Link from "react-router-dom/Link";
import withStyles from "@material-ui/core/styles/withStyles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

import AddIcon from "@material-ui/icons/Add";

const styles = ({ spacing }) => ({
    addIcon: {
        marginRight: spacing.unit / 2.5
    }
});

const _Link = props => <Link to="/d/issues/add" {...props} />;

const IssueList = ({ classes }) => {
    return (
        <Fragment>
            <Grid container justify="space-between" alignItems="center">
                <Grid item>
                    <Typography variant="h5">Issues</Typography>
                </Grid>
                <Grid item>
                    <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        component={_Link}
                    >
                        <AddIcon className={classes.addIcon} />
                        Add
                    </Button>
                </Grid>
            </Grid>
        </Fragment>
    );
};

export default withStyles(styles)(IssueList);
