import React, { memo } from "react";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";

const styles = ({ mixins, palette, shape, shadows }) => {
    return {
        outlineCard: {
            ...mixins.gutters(),
            ...shape,
            paddingTop: "1rem",
            paddingBottom: "1rem",
            border: `1px solid ${palette.primary.main}`,
            boxShadow: shadows[1]
        }
    };
};

const IssueViewDescription = ({ classes, description }) => {
    return (
        <div className={classes.outlineCard}>
            <Typography variant="body1">{description}</Typography>
        </div>
    );
};

export default memo(withStyles(styles)(IssueViewDescription));
