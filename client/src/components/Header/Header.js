import React, { memo, forwardRef } from "react";
import { Link } from "react-router-dom";
import makeStyles from "@material-ui/styles/makeStyles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import Box from "@material-ui/core/Box";

const useStyles = makeStyles(({ spacing }) => ({
    addIcon: {
        marginRight: spacing(0.4)
    }
}));

const Header = ({ addLink, title }) => {
    const classes = useStyles();

    const _Link = forwardRef((props, ref) => (
        <Link to={addLink} {...props} ref={ref} />
    ));

    return (
        <Box mb={3}>
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
        </Box>
    );
};

export default memo(Header);
