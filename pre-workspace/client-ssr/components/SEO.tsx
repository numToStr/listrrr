import React, { FC } from "react";
import Head from "next/head";

type Props = {
    // Title of the page to be appeared in the browser's tab bar
    title: string;
};

const SEO: FC<Props> = ({ title }) => {
    return (
        <Head>
            <title>{title} | Listrr</title>
        </Head>
    );
};

export default SEO;
