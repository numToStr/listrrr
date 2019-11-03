import React, { Fragment } from "react";
import RouterLink from "../components/RouterLink";
import SEO from "../components/SEO";

const Home = () => {
    return (
        <Fragment>
            <SEO title="Home" />
            <RouterLink href="/login">Login</RouterLink>
            <RouterLink href="/signup">Signup</RouterLink>
        </Fragment>
    );
};

export default Home;
