import { ComponentType, lazy } from "react";
import Index from "../pages/Index";
import Home from "../pages/Home";

const Login = lazy(() =>
    import(/* webpackChunkName: "Auth" */ "../pages/Login")
);
const Signup = lazy(() =>
    import(/* webpackChunkName: "Auth" */ "../pages/Signup")
);

const Project = lazy(() =>
    import(/* webpackChunkName: "Project" */ "../pages/Project")
);
const ProjectView = lazy(() =>
    import(/* webpackChunkName: "Project" */ "../pages/ProjectView")
);
const ProjectCreate = lazy(() =>
    import(/* webpackChunkName: "Project" */ "../pages/ProjectCreate")
);

const Issue = lazy(() =>
    import(/* webpackChunkName: "Issue" */ "../pages/Issue")
);
const IssueView = lazy(() =>
    import(/* webpackChunkName: "Issue" */ "../pages/IssueView")
);
const IssueCreate = lazy(() =>
    import(/* webpackChunkName: "Issue" */ "../pages/IssueCreate")
);

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
        exact: true,
    },
    {
        path: "/login",
        component: Login,
        private: false,
    },
    {
        path: "/signup",
        component: Signup,
        private: false,
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
                exact: true,
            },
            {
                path: "/d/project/create",
                component: ProjectCreate,
                private: true,
            },
            {
                path: "/d/project/:projectID",
                component: ProjectView,
                private: true,
            },
            {
                path: "/d/issue",
                component: Issue,
                private: true,
                exact: true,
            },
            {
                path: "/d/issue/create",
                component: IssueCreate,
                private: true,
            },
            {
                path: "/d/issue/:issueID",
                component: IssueView,
                private: true,
            },
        ],
    },
];
