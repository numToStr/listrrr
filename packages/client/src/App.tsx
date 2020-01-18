import React, { Suspense } from "react";
import { BrowserRouter } from "react-router-dom";
import { CssBaseline } from "@material-ui/core";
import RouteRenderer from "./components/Routes/RouteRenderer";
import { routesConfig } from "./config/routes.config";
import BaseLoader from "./components/Base/BaseLoader";
import { MyApolloContext } from "./components/ApolloContext";
import { ThemeContext } from "./components/Theme/ThemeContext";
import { useIMeQuery } from "./gql/user.query";

const Root = () => {
    const { loading } = useIMeQuery();

    if (loading) {
        return <BaseLoader />;
    }

    return <RouteRenderer routes={routesConfig} defaultRedirect="/" />;
};

const App: React.FC = () => {
    return (
        <MyApolloContext>
            <BrowserRouter>
                <ThemeContext>
                    <CssBaseline />
                    <Suspense fallback={<BaseLoader />}>
                        <Root />
                    </Suspense>
                </ThemeContext>
            </BrowserRouter>
        </MyApolloContext>
    );
};

export default App;
