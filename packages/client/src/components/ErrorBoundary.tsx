import React, { Component, ErrorInfo } from "react";
import { Snackbar } from "@material-ui/core";
// import CloseIcon from "@material-ui/icons/Close";

interface State {
    error: Error | null;
    errorInfo: ErrorInfo | null;
}

export default class ErrorBoundary extends Component {
    state: State = {
        error: null,
        errorInfo: null,
    };

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        // Catch errors in any components below and re-render with error message
        this.setState({
            error,
            errorInfo,
        });
        // You can also log error messages to an error reporting service here
    }

    handleClose = () => {
        this.setState({ error: null, errorInfo: null });
    };

    render() {
        const { error, errorInfo } = this.state;
        if (errorInfo || error) {
            return (
                <Snackbar
                    anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "left",
                    }}
                    open={Boolean(error)}
                    autoHideDuration={3000}
                    onClose={this.handleClose}
                    ContentProps={{
                        "aria-describedby": "message-id",
                    }}
                    message={
                        <span id="message-id">{error && error.message}</span>
                    }
                />
            );
        }

        return this.props.children;
    }
}
