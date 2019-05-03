import React, { memo } from "react";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import WarningIcon from "@material-ui/icons/WarningTwoTone";
import DoneIcon from "@material-ui/icons/DoneAllTwoTone";

const OpenCloseIndicator = ({ open, close }) => (
    <Grid container spacing={3}>
        <Grid item>
            <Box display="flex" alignItems="center">
                <WarningIcon fontSize="small" />
                <Box ml={0.5}>
                    <Typography variant="body2">{open} Open</Typography>
                </Box>
            </Box>
        </Grid>
        <Grid item>
            <Box display="flex" alignItems="center">
                <DoneIcon fontSize="small" />
                <Box ml={0.5}>
                    <Typography variant="body2">{close} Closed</Typography>
                </Box>
            </Box>
        </Grid>
    </Grid>
);

export default memo(OpenCloseIndicator);
