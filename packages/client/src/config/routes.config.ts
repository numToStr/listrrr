import { ComponentType } from "react";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Index from "../pages/Index";

export interface RoutesConfig {
    path: string;
    component: ComponentType<{ routes?: RoutesConfig[] }>;
    private: boolean;
    exact?: boolean;
    routes?: RoutesConfig[];
}

export const routesConfig: RoutesConfig[] = [
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
    }
];
