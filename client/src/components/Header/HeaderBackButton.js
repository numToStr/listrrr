import React, { memo } from "react";
import { Link } from "react-router-dom";
import makeStyles from "@material-ui/styles/makeStyles";
import IconButton from "@material-ui/core/IconButton";
import BackIcon from "@material-ui/icons/ArrowBackTwoTone";

const useStyles = makeStyles(({ spacing }) => ({
    headerMargin: {
        marginBottom: spacing.unit * 2
    }
}));

const HeaderBackButton = ({ to }) => {
    const classes = useStyles();

    const _Link = props => <Link to={to} {...props} />;

    return (
        <IconButton
            color="primary"
            component={_Link}
            className={classes.headerMargin}
        >
            <BackIcon fontSize="small" />
        </IconButton>
    );
};

export default memo(HeaderBackButton);
