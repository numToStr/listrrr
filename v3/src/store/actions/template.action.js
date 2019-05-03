import { TEMPLATE_GET, TEMPLATE_GET_SUCCESS } from "../action.types";

const templateGetSuccess = data => ({
    type: TEMPLATE_GET_SUCCESS,
    data
});

export const templateGet = () => ({
    type: TEMPLATE_GET,
    http: true,
    payload: {
        method: "GET",
        url: "/template/list"
    },
    success: templateGetSuccess,
    meta: {
        label: "templateGet"
    }
});
