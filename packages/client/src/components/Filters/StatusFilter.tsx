import React from "react";
import { Button, Box, makeStyles } from "@material-ui/core";
import OpenIcon from "@material-ui/icons/ErrorTwoTone";
import ClosedIcon from "@material-ui/icons/CheckCircleTwoTone";
import { usePushSearch } from "../../utils/hooks/useSearch";
import { Status } from "../../generated/graphql";

const useStyles = makeStyles(({ spacing }) => ({
    icon: {
        marginRight: spacing(2),
    },
}));

const StatusFilter = () => {
    const styles = useStyles();
    const pushSearch = usePushSearch();

    const handleStatus = (status: Status) => () => {
        pushSearch({ status });
    };

    return (
        <Box display="flex">
            <Button
                className={styles.icon}
                size="small"
                startIcon={<OpenIcon fontSize="small" />}
                onClick={handleStatus(Status.Open)}
            >
                Open
            </Button>
            <Button
                className={styles.icon}
                size="small"
                startIcon={<ClosedIcon fontSize="small" />}
                onClick={handleStatus(Status.Closed)}
            >
                Closed
            </Button>
        </Box>
    );
};

export default StatusFilter;
