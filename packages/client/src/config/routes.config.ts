import { ComponentType, lazy } from "react";
import Index from "../pages/Index";
import Home from "../pages/Home";
const Login = lazy(() => import("../pages/Login"));
const Signup = lazy(() => import("../pages/Signup"));
const Project = lazy(() => import("../pages/Project"));
const Issue = lazy(() => import("../pages/Issue"));
const ProjectView = lazy(() => import("../pages/ProjectView"));
const IssueView = lazy(() => import("../pages/IssueView"));
const ProjectCreate = lazy(() => import("../pages/ProjectCreate"));
const IssueCreate = lazy(() => import("../pages/IssueCreate"));

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
                path: "/d/project/create",
                component: ProjectCreate,
                private: true
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
                path: "/d/issue/create",
                component: IssueCreate,
                private: true
            },
            {
                path: "/d/issue/:issueID",
                component: IssueView,
                private: true
            }
        ]
    }
];
