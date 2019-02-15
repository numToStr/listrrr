import React, { Component, Fragment } from "react";
import Link from "react-router-dom/Link";
import { connect } from "react-redux";
import withStyles from "@material-ui/core/styles/withStyles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

import AddIcon from "@material-ui/icons/Add";

import { issueList } from "../../../store/actions/issue.action";

const styles = ({ spacing }) => ({
    addIcon: {
        marginRight: spacing.unit / 2.5
    }
});

const _Link = props => <Link to="/d/issues/add" {...props} />;

class IssueList extends Component {
    componentDidMount = () => {
        this.props.$issueList();
    };

    render() {
        const { classes, _issueList } = this.props;

        console.log(_issueList);

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
    }
}

const mapStateToProps = ({ issue }) => ({
    _issueList: issue.list
});

const mapDispatchToProps = dispatchEvent => ({
    $issueList: () => dispatchEvent(issueList())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(IssueList));
