import React from "react";
import { Button, Box } from "@material-ui/core";
import OpenIcon from "@material-ui/icons/ErrorTwoTone";
import ClosedIcon from "@material-ui/icons/CheckCircleTwoTone";
import { usePushSearch } from "../../utils/hooks/useSearch";
import { Status } from "../../generated/graphql";

const StatusFilter = () => {
    const pushSearch = usePushSearch();

    const handleStatus = (status: Status) => () => {
        pushSearch({ status });
    };

    return (
        <Box display="flex">
            <Box mr={2} clone>
                <Button
                    size="small"
                    startIcon={<OpenIcon fontSize="small" />}
                    onClick={handleStatus(Status.Open)}
                >
                    Open
                </Button>
            </Box>
            <Box mr={2} clone>
                <Button
                    size="small"
                    startIcon={<ClosedIcon fontSize="small" />}
                    onClick={handleStatus(Status.Closed)}
                >
                    Closed
                </Button>
            </Box>
        </Box>
    );
};

export default StatusFilter;
