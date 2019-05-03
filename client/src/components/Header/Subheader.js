import React, { useState } from "react";

import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Popover from "@material-ui/core/Popover";
import SortIcon from "@material-ui/icons/SortTwoTone";

import Surface from "../Surface";
import OpenCloseIndicator from "../OpenCloseIndicator";

const Subheader = () => {
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = ({ currentTarget }) => setAnchorEl(currentTarget);
    const handleClose = () => setAnchorEl(null);

    return (
        <Box mb={2}>
            <Grid container justify="space-between">
                <Grid item>
                    <OpenCloseIndicator open={10} close={1} />
                </Grid>
                <Grid item>
                    <Button size="small" onClick={handleClick}>
                        <Box mr={0.5}>Sort</Box>
                        <SortIcon />
                    </Button>
                    <Popover
                        open={Boolean(anchorEl)}
                        anchorEl={anchorEl}
                        onClose={handleClose}
                        anchorOrigin={{
                            vertical: "bottom",
                            horizontal: "right"
                        }}
                        transformOrigin={{
                            vertical: "top",
                            horizontal: "right"
                        }}
                    >
                        <Surface>Popover content</Surface>
                    </Popover>
                </Grid>
            </Grid>
        </Box>
    );
};

export default Subheader;
