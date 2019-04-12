import {
    PROJECT_ADD,
    PROJECT_ADD_SUCCESS,
    PROJECT_LIST,
    PROJECT_LIST_SUCCESS,
    PROJECT_GET_SUCCESS,
    PROJECT_GET,
    PROJECT_CLEAR
} from "../action.types";

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

const projectListSuccess = data => ({
    type: PROJECT_LIST_SUCCESS,
    data
});

export const projectList = () => ({
    type: PROJECT_LIST,
    http: true,
    payload: {
        method: "GET",
        url: "/project/list"
    },
    success: projectListSuccess,
    meta: {
        label: "projectList"
    }
});

const projectSuccess = data => ({
    type: PROJECT_GET_SUCCESS,
    data
});

export const projectGet = projectId => ({
    type: PROJECT_GET,
    http: true,
    payload: {
        method: "GET",
        url: `/project/${projectId}`
    },
    success: projectSuccess,
    meta: {
        label: "projectGet"
    }
});

export const projectClear = () => ({
    type: PROJECT_CLEAR
});
