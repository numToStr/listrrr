import { DASHBOARD_GET, DASHBOARD_SUCCESS } from "../action.types";

const dashboardSuccess = data => ({
    type: DASHBOARD_SUCCESS,
    data
});

export const dashboard = () => ({
    type: DASHBOARD_GET,
    http: true,
    payload: {
        method: "GET",
        url: "/user/dashboard"
    },
    success: dashboardSuccess,
    meta: {
        label: "dashboard"
    }
});
