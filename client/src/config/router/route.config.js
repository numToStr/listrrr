import Index from "../../app/index/index.app";
import Login from "../../app/login/index.login";
import Signup from "../../app/signup/index.signup";
import Dashboard from "../../app/dashboard/index.dashboard";
import Home from "../../app/home/index.home";

import ProjectIndex from "../../app/Project/ProjectIndex";
import ProjectAddIndex from "../../app/Project/ProjectAdd/ProjectAddIndex";
import ProjectList from "../../app/Project/ProjectList/ProjectListIndex";
import ProjectViewIndex from "../../app/Project/ProjectView/ProjectViewIndex";

import Issue from "../../app/issue/index.issue";
import IssueAddIndex from "../../app/issue/IssueAdd/IssueAddIndex";
import IssueListIndex from "../../app/issue/IssueList/IssueListIndex";
import IssueEdit from "../../app/issue/issue-edit/index.issue.edit";
import IssueView from "../../app/issue/issue-view/index.issue.view";

export const redirects = {
    default: "/",
    authFailure: "/login",
    authSuccess: "/d/home"
};

export const routes = [
    {
        path: "/",
        component: Index,
        exact: true,
        private: false
    },
    {
        path: "/signup",
        component: Signup,
        private: false
    },
    {
        path: "/login",
        component: Login,
        private: false
    },
    {
        path: "/d",
        component: Dashboard,
        private: true,
        routes: [
            {
                path: "/d/home",
                component: Home,
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
                component: Issue,
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
                        component: IssueView,
                        private: true
                    },
                    {
                        path: "/d/issues/edit/:issueId",
                        component: IssueEdit,
                        private: true
                    }
                ]
            }
        ]
    }
];
