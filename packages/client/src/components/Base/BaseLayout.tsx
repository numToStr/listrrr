import React, { Suspense, FC } from "react";
import { Grid, Box, makeStyles } from "@material-ui/core";
import DrawerIndex from "../Drawer/DrawerIndex";
import BaseLoader from "./BaseLoader";

const useStyles = makeStyles({
    container: {
        height: "100%"
    }
});

const BaseLayout: FC = ({ children }) => {
    const classes = useStyles();

    return (
        <Grid container className={classes.container}>
            <Grid item>
                <DrawerIndex />
            </Grid>
            {/* Don't remove the xs prop, otherwise will break the layout */}
            <Grid item xs>
                <Box
                    p={{
                        xs: 3,
                        md: 5
                    }}
                    flexGrow={1}
                    component="main"
                >
                    <Suspense fallback={<BaseLoader />}>{children}</Suspense>
                </Box>
            </Grid>
        </Grid>
    );
};

export default BaseLayout;
