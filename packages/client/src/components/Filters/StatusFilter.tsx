import React from "react";
import { Button, Box } from "@material-ui/core";
import OpenIcon from "@material-ui/icons/ErrorTwoTone";
import ClosedIcon from "@material-ui/icons/CheckCircleTwoTone";
import { usePushSearch } from "../../utils/hooks/useSearch";

const StatusFilter = () => {
    const pushSearch = usePushSearch();

    const handleStatus = (type: string) => () => {
        pushSearch({ status: type });
    };

    return (
        <Box display="flex">
            <Box mr={2} clone>
                <Button
                    size="small"
                    startIcon={<OpenIcon fontSize="small" />}
                    onClick={handleStatus("open")}
                >
                    Open
                </Button>
            </Box>
            <Box mr={2} clone>
                <Button
                    size="small"
                    startIcon={<ClosedIcon fontSize="small" />}
                    onClick={handleStatus("closed")}
                >
                    Closed
                </Button>
            </Box>
        </Box>
    );
};

export default StatusFilter;
