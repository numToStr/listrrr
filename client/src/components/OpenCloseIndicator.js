import React, { memo } from "react";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import WarningIcon from "@material-ui/icons/WarningTwoTone";
import DoneIcon from "@material-ui/icons/DoneAllTwoTone";

const OpenCloseIndicator = ({ open, closed, onClickOpen, onClickClosed }) => (
    <Grid container spacing={1}>
        <Grid item>
            <Button size="small" onClick={onClickOpen}>
                <WarningIcon fontSize="small" />
                <Box ml={0.5}>{open} Open</Box>
            </Button>
        </Grid>
        <Grid item>
            <Button size="small" onClick={onClickClosed}>
                <DoneIcon fontSize="small" />
                <Box ml={0.5}>{closed} Closed</Box>
            </Button>
        </Grid>
    </Grid>
);

export default memo(OpenCloseIndicator);
