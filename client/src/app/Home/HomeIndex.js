import React, { Fragment } from "react";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import IconTaskOpen from "../../components/Icons/IconTaskOpen";
import IconTaskClose from "../../components/Icons/IconTaskClose";

const HomeIndex = () => {
    return (
        <Fragment>
            <Box mb={3}>
                <Typography variant="h5">Home</Typography>
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
                            30
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
                            <Typography>Open: 25</Typography>
                        </Box>
                        <Box display="flex" alignItems="center">
                            <Box clone mr={0.5}>
                                <IconTaskClose fontSize="default" />
                            </Box>
                            <Typography>Closed: 5</Typography>
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
                            30
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
                            <Typography>Open: 25</Typography>
                        </Box>
                        <Box display="flex" alignItems="center">
                            <Box clone mr={0.5}>
                                <IconTaskClose fontSize="default" />
                            </Box>
                            <Typography>Closed: 5</Typography>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </Fragment>
    );
};

export default HomeIndex;
