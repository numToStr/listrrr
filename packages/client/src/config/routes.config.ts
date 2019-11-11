import { ComponentType } from "react";
import Index from "../pages/Index";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Home from "../pages/Home";
import Project from "../pages/Project";
import Issue from "../pages/Issue";
import ProjectView from "../pages/ProjectView";
import IssueView from "../pages/IssueView";

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
                private: true,
                exact: true
            },
            {
                path: "/d/project/:projectID",
                component: ProjectView,
                private: true
            },
            {
                path: "/d/issue",
                component: Issue,
                private: true,
                exact: true
            },
            {
                path: "/d/issue/:issueID",
                component: IssueView,
                private: true
            }
        ]
    }
];
