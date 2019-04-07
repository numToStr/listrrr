import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import withStyles from "@material-ui/core/styles/withStyles";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Grid from "@material-ui/core/Grid";

import BackIcon from "@material-ui/icons/ArrowBackTwoTone";

import FormLayout from "../../../components/forms/form.layout";

const initialValues = { title: "", description: "" };

const config = {
    fields: [
        {
            type: "text",
            name: "title",
            label: "Title"
        },
        {
            type: "text",
            name: "description",
            label: "Description",
            muiProps: {
                multiline: true,
                rows: 6,
                rowsMax: 10
            }
        }
    ],
    actions: [
        {
            type: "submit",
            title: "Submit",
            muiProps: {
                fullWidth: false
            }
        }
    ]
};

const styles = ({ spacing }) => ({
    headerMargin: {
        marginBottom: spacing.unit * 2
    }
});

const _Link = props => <Link to="/d/issues/list" {...props} />;

const IssueEdit = ({ classes, match: { params } }) => {
    const onSubmit = values => console.log(values);

    return (
        <Fragment>
            <Grid container justify="space-between" alignItems="center">
                <Grid item xs={12}>
                    <IconButton
                        color="primary"
                        component={_Link}
                        className={classes.headerMargin}
                    >
                        <BackIcon fontSize="small" />
                    </IconButton>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="h5" gutterBottom>
                        Edit Issue
                    </Typography>
                </Grid>
            </Grid>
            <FormLayout
                key="issue-edit-form"
                config={config}
                onSubmit={onSubmit}
                initialValues={initialValues}
            />
        </Fragment>
    );
};

export default withStyles(styles)(IssueEdit);
