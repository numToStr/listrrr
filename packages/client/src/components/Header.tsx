import React, { FC, memo } from "react";
import {
    Box,
    Typography,
    Button,
    Grid,
    TextField,
    InputAdornment,
    IconButton,
    Hidden
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import SearchIcon from "@material-ui/icons/SearchTwoTone";

type Props = {
    title: string;
};

const Header: FC<Props> = ({ title }) => {
    return (
        <Box clone mb={3}>
            <Grid container justify="space-between">
                <Grid item>
                    <Typography variant="h5">#{title}</Typography>
                </Grid>
                <Grid item xs={6} md={5}>
                    <Grid container spacing={2} alignItems="center">
                        <Grid item xs>
                            <TextField
                                placeholder="Search"
                                fullWidth
                                InputProps={{
                                    disableUnderline: true,
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <IconButton
                                                color="primary"
                                                type="submit"
                                            >
                                                <SearchIcon fontSize="small" />
                                            </IconButton>
                                        </InputAdornment>
                                    )
                                }}
                            />
                        </Grid>
                        <Hidden xsDown>
                            <Grid item>
                                <Button
                                    startIcon={<AddIcon />}
                                    size="small"
                                    variant="contained"
                                    color="primary"
                                >
                                    Add
                                </Button>
                            </Grid>
                        </Hidden>
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    );
};

export default memo(Header);
