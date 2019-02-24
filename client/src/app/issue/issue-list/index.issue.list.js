import React, { Fragment, useEffect } from "react";
import Link from "react-router-dom/Link";
import { connect } from "react-redux";
import withStyles from "@material-ui/core/styles/withStyles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

import AddIcon from "@material-ui/icons/Add";

import IssueList from "../../../components/issue/issue.list";
import Loader from "../../../components/loader/loader.page";
import { issueList } from "../../../store/actions/index.action";

const styles = ({ spacing }) => ({
    addIcon: {
        marginRight: spacing.unit / 2.5
    },
    headerMargin: {
        marginBottom: spacing.unit * 2
    }
});

const _Link = props => <Link to="/d/issues/add" {...props} />;

const IssueListIndex = ({ classes, $issueList, _issueList }) => {
    useEffect(() => {
        $issueList();
    }, []);

    if (!_issueList) {
        return <Loader />;
    }

    return (
        <Fragment>
            <Grid
                container
                justify="space-between"
                alignItems="center"
                className={classes.headerMargin}
            >
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
            <Grid container>
                <Grid item xs={12}>
                    <IssueList items={_issueList} />
                </Grid>
            </Grid>
        </Fragment>
    );
};

const mapStateToProps = ({ issue }) => ({
    _issueList: issue.list
});

const mapDispatchToProps = dispatchEvent => ({
    $issueList: () => dispatchEvent(issueList())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(IssueListIndex));
