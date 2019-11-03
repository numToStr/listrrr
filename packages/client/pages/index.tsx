import React from "react";
import Head from "next/head";
import { Button } from "@material-ui/core";

const Home = () => (
    <div>
        <Head>
            <title>Home</title>
            <link rel="icon" href="/favicon.ico" />
        </Head>
        <h1>hello 123</h1>
        <Button variant="contained" color="primary">
            Heloo
        </Button>
    </div>
);

export default Home;
