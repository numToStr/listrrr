import React, { memo } from "react";
import { Link } from "react-router-dom";
import withStyles from "@material-ui/core/styles/withStyles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

import AddIcon from "@material-ui/icons/Add";

const styles = ({ spacing }) => ({
    addIcon: {
        marginRight: spacing.unit / 2.5
    },
    headerMargin: {
        marginBottom: spacing.unit * 2
    }
});

const Header = ({ classes, addLink, title }) => {
    const _Link = props => <Link to={addLink} {...props} />;

    return (
        <Grid
            container
            justify="space-between"
            alignItems="center"
            className={classes.headerMargin}
        >
            <Grid item>
                <Typography variant="h5">{title}</Typography>
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
    );
};

export default memo(withStyles(styles)(Header));
