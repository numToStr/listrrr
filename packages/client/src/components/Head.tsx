import React, { useMemo } from "react";
import { Helmet } from "react-helmet";
import { useDark } from "../utils/hooks/useDark";
import FaviconDark from "../assets/images/favicon-dark.png";
import FaviconLight from "../assets/images/favicon-light.png";

const Favicon = () => {
    const isDark = useDark();

    const favicon = useMemo(() => {
        return isDark ? FaviconDark : FaviconLight;
    }, [isDark]);

    return (
        <Helmet>
            <link rel="icon" href={favicon} />
        </Helmet>
    );
};

export default Favicon;
