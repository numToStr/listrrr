import React, { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import BaseLoader from "../../components/Base/BaseLoader";
import IconTaskOpen from "../../components/Icons/IconTaskOpen";
import IconTaskClose from "../../components/Icons/IconTaskClose";
import { dashboard } from "../../store/actions/index.action";

const DashboardIndex = ({ $dashboard, _dashboard }) => {
    useEffect(() => {
        $dashboard();
    }, [$dashboard]);

    if (!_dashboard) {
        return <BaseLoader />;
    }

    const { projects, issues } = _dashboard;

    return (
        <Fragment>
            <Box mb={3}>
                <Typography variant="h5">Dashboard</Typography>
            </Box>
            <Grid container spacing={2} justify="space-around">
                <Grid item xs={12} md={5}>
                    <Box mb={5}>
                        <Typography variant="h3" align="center">
                            Projects
                        </Typography>
                    </Box>
                    <Box mb={5}>
                        <Typography variant="h3" align="center">
                            {projects.total}
                        </Typography>
                        <Typography
                            align="center"
                            variant="h6"
                            color="textSecondary"
                        >
                            Total
                        </Typography>
                    </Box>
                    <Box display="flex" justifyContent="space-around">
                        <Box display="flex" alignItems="center">
                            <Box clone mr={0.5}>
                                <IconTaskOpen fontSize="default" />
                            </Box>
                            <Typography>Open: {projects.open}</Typography>
                        </Box>
                        <Box display="flex" alignItems="center">
                            <Box clone mr={0.5}>
                                <IconTaskClose fontSize="default" />
                            </Box>
                            <Typography>Closed: {projects.closed}</Typography>
                        </Box>
                    </Box>
                </Grid>
                <Grid item xs={12} md={5}>
                    <Box mb={5}>
                        <Typography variant="h3" align="center">
                            Issues
                        </Typography>
                    </Box>
                    <Box mb={5}>
                        <Typography variant="h3" align="center">
                            {issues.total}
                        </Typography>
                        <Typography
                            align="center"
                            variant="h6"
                            color="textSecondary"
                        >
                            Total
                        </Typography>
                    </Box>
                    <Box display="flex" justifyContent="space-around">
                        <Box display="flex" alignItems="center">
                            <Box clone mr={0.5}>
                                <IconTaskOpen fontSize="default" />
                            </Box>
                            <Typography>Open: {issues.open}</Typography>
                        </Box>
                        <Box display="flex" alignItems="center">
                            <Box clone mr={0.5}>
                                <IconTaskClose fontSize="default" />
                            </Box>
                            <Typography>Closed: {issues.closed}</Typography>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </Fragment>
    );
};

const mapStateToProps = ({ dashboard }) => ({
    _dashboard: dashboard
});

const mapDispatchToProps = {
    $dashboard: dashboard
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DashboardIndex);
