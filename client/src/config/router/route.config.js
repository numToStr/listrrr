import Home from "../../app/login/index.login";
import Signup from "../../app/signup/index.signup";
import Dashboard from "../../app/dashboard/index.dashboard";
import LiveQuiz from "../../app/livequiz/index.livequiz";
import Show from "../../app/show/index.show";
import Hello from "../../app/hello/index.hello";

export const redirects = {
    default: "/",
    authFailure: "/",
    authSuccess: "/d"
};

export const routes = [
    {
        path: "/",
        component: Home,
        exact: true,
        private: false
    },
    {
        path: "/signup",
        component: Signup,
        private: false
    },
    {
        path: "/d",
        component: Dashboard,
        private: true,
        routes: [
            {
                path: "/d/livequiz",
                component: LiveQuiz,
                private: true
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
