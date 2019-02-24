import { PROJECT_ADD, PROJECT_ADD_SUCCESS } from "../action.types";

const projectAddSuccess = data => ({
    type: PROJECT_ADD_SUCCESS,
    data
});

export const projectAdd = data => ({
    type: PROJECT_ADD,
    http: true,
    payload: {
        method: "POST",
        url: "/project",
        data
    },
    success: projectAddSuccess,
    meta: {
        label: "projectAdd"
    }
});
