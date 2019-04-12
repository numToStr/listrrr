import { normalizeLevel1 } from "../json.normalizr";
import {
    PROJECT_ADD_SUCCESS,
    PROJECT_LIST_SUCCESS,
    PROJECT_GET_SUCCESS,
    PROJECT_CLEAR
} from "../action.types";

const initialState = {
    list: null,
    current: null,
    lastCreated: null
};

const onProjectAdd = (state, { project }) => ({
    ...state,
    lastCreated: project
});

const onProjectList = (state, { projects }) => ({
    ...state,
    list: normalizeLevel1(projects, { entity: "projects" })
});

const onProject = (state, { project: { columns, issues, ...restProject } }) => {
    return {
        ...state,
        current: {
            ...restProject,
            columns: normalizeLevel1(columns, { entity: "columns" }),
            issues: normalizeLevel1(issues, { entity: "issues" })
        }
    };
};

const onProjectClear = state => ({
    ...state,
    current: null
});

export default (state = initialState, { type, data }) => {
    switch (type) {
        case PROJECT_ADD_SUCCESS:
            return onProjectAdd(state, data);
        case PROJECT_LIST_SUCCESS:
            return onProjectList(state, data);
        case PROJECT_GET_SUCCESS:
            return onProject(state, data);
        case PROJECT_CLEAR:
            return onProjectClear(state);
        default:
            return state;
    }
};
