import Index from "../../app/index/index.app";
import Login from "../../app/login/index.login";
import Signup from "../../app/signup/index.signup";
import Dashboard from "../../app/dashboard/index.dashboard";
import Home from "../../app/home/index.home";
import Project from "../../app/project/index.project";
import ProjectAdd from "../../app/project/project-add/index.project.add";
import ProjectList from "../../app/project/project-list/index.project.list";
import Issue from "../../app/issue/index.issue";
import IssueAdd from "../../app/issue/issue-add/index.issue.add";
import IssueList from "../../app/issue/issue-list/index.issue.list";
import IssueEdit from "../../app/issue/issue-edit/index.issue.edit";

import Show from "../../app/show/index.show";
import Hello from "../../app/hello/index.hello";

export const redirects = {
    default: "/",
    authFailure: "/signup",
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
                component: Project,
                private: true,
                routes: [
                    {
                        path: "/d/projects/list",
                        component: ProjectList,
                        private: true
                    },
                    {
                        path: "/d/projects/add",
                        component: ProjectAdd,
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
                        component: IssueList,
                        private: true
                    },
                    {
                        path: "/d/issues/add",
                        component: IssueAdd,
                        private: true
                    },
                    {
                        path: "/d/issues/edit/:issueId",
                        component: IssueEdit,
                        private: true
                    }
                ]
            },
            {
                path: "/d/show",
                component: Show,
                private: true
            },
            {
                path: "/d/hello",
                component: Hello,
                private: true
            }
        ]
    }
];
