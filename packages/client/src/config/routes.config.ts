import { ComponentType } from "react";
import Index from "../pages/Index";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Home from "../pages/Home";
import Project from "../pages/Project";
import Issue from "../pages/Issue";

export type Routes = RoutesConfig[];

export interface RoutesConfig {
    path: string;
    component: ComponentType<{ routes?: Routes }>;
    private: boolean;
    exact?: boolean;
    routes?: Routes;
}

export const routesConfig: Routes = [
    {
        path: "/",
        component: Index,
        private: false,
        exact: true
    },
    {
        path: "/login",
        component: Login,
        private: false,
        exact: true
    },
    {
        path: "/signup",
        component: Signup,
        private: false
    },
    {
        path: "/d",
        component: Home,
        private: true,
        routes: [
            {
                path: "/d/project",
                component: Project,
                private: false
            },
            {
                path: "/d/issue",
                component: Issue,
                private: false
            }
        ]
    }
];
