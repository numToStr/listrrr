import React, { memo, forwardRef } from "react";
import { Link } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import Box from "@material-ui/core/Box";
import SearchIcon from "@material-ui/icons/SearchTwoTone";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";

const Header = ({ addLink, title }) => {
    const _Link = forwardRef((props, ref) => (
        <Link to={addLink} {...props} ref={ref} />
    ));

    return (
        <Box mb={3}>
            <Grid container justify="space-between" alignItems="center">
                <Grid item>
                    <Typography variant="h5">{title}</Typography>
                </Grid>
                <Grid item xs={6}>
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
                                                <SearchIcon />
                                            </IconButton>
                                        </InputAdornment>
                                    )
                                }}
                            />
                        </Grid>
                        <Grid item>
                            <Button
                                variant="contained"
                                color="primary"
                                size="small"
                                component={_Link}
                            >
                                <AddIcon />
                                <Box ml={0.5}>Add</Box>
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    );
};

export default memo(Header);
