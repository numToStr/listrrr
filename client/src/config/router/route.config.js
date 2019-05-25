import { lazy } from "react";
import LandingIndex from "../../app/Landing/LandingIndex";
import DashboardIndex from "../../app/Dashboard/DashboardIndex";
import HomeIndex from "../../app/Home/HomeIndex";
import ProjectIndex from "../../app/Project/ProjectIndex";
import IssueIndex from "../../app/Issue/IssueIndex";

const SignupIndex = lazy(() => import("../../app/Signup/SignupIndex"));
const LoginIndex = lazy(() => import("../../app/Login/LoginIndex"));

const ProjectAddIndex = lazy(() =>
    import("../../app/Project/ProjectAdd/ProjectAddIndex")
);
const ProjectList = lazy(() =>
    import("../../app/Project/ProjectList/ProjectListIndex")
);
const ProjectViewIndex = lazy(() =>
    import("../../app/Project/ProjectView/ProjectViewIndex")
);

const IssueAddIndex = lazy(() =>
    import("../../app/Issue/IssueAdd/IssueAddIndex")
);
const IssueListIndex = lazy(() =>
    import("../../app/Issue/IssueList/IssueListIndex")
);
const IssueViewIndex = lazy(() =>
    import("../../app/Issue/IssueView/IssueViewIndex")
);

export const redirects = {
    default: "/",
    authFailure: "/login",
    authSuccess: "/d/home"
};

export const routes = [
    {
        path: "/",
        component: LandingIndex,
        exact: true,
        private: false
    },
    {
        path: "/signup",
        component: SignupIndex,
        private: false
    },
    {
        path: "/login",
        component: LoginIndex,
        private: false
    },
    {
        path: "/d",
        component: DashboardIndex,
        private: true,
        routes: [
            {
                path: "/d/home",
                component: HomeIndex,
                private: true
            },
            {
                path: "/d/projects",
                component: ProjectIndex,
                private: true,
                routes: [
                    {
                        path: "/d/projects/list",
                        component: ProjectList,
                        private: true
                    },
                    {
                        path: "/d/projects/add",
                        component: ProjectAddIndex,
                        private: true
                    },
                    {
                        path: "/d/projects/view/:projectId",
                        component: ProjectViewIndex,
                        private: true
                    }
                ]
            },
            {
                path: "/d/issues",
                component: IssueIndex,
                private: true,
                routes: [
                    {
                        path: "/d/issues/list",
                        component: IssueListIndex,
                        private: true
                    },
                    {
                        path: "/d/issues/add",
                        component: IssueAddIndex,
                        private: true
                    },
                    {
                        path: "/d/issues/view/:issueId",
                        component: IssueViewIndex,
                        private: true
                    }
                ]
            }
        ]
    }
];
