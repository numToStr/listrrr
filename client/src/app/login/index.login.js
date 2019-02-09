import React from "react";
import { connect } from "react-redux";
import Grid from "@material-ui/core/Grid";

import LoginForm from "./login.form";
import { login } from "../../store/actions/index.action";

const initialValues = { username: "", password: "" };

const Login = ({ $login, _loading }) => {
    return (
        <Grid container justify="center">
            <Grid item xs={9} sm={5} md={3}>
                <LoginForm
                    loading={_loading}
                    initialValues={initialValues}
                    onSubmit={$login}
                />
            </Grid>
        </Grid>
    );
};

const mapStateToProps = ({ http: { request } }) => ({
    _loading: request.login
});

const mapDispatchToProps = dispatchEvent => ({
    $login: val => dispatchEvent(login(val))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Login);
