import produce from "immer";
import { normalizeLevel1 } from "../json.normalizr";
import {
    PROJECT_ADD_SUCCESS,
    PROJECT_LIST_SUCCESS,
    PROJECT_GET_SUCCESS,
    PROJECT_CLEAR,
    PROJECT_COLUMN_REARRANGE
} from "../action.types";

const initialState = {
    list: null,
    current: null,
    lastCreated: null
};

const onProjectAdd = (state, { project }) => {
    state.lastCreated = project;
};

const onProjectList = (state, { projects }) => {
    state.list = normalizeLevel1(projects, { entity: "projects" });
};

const onProject = (state, { project }) => {
    const _columns = project.columns.sort(
        (curr, next) => curr.order - next.order
    );

    const _issues = project.issues.sort(
        (curr, next) => curr.columnIndex - next.columnIndex
    );

    state.current = {
        ...project,
        columns: normalizeLevel1(_columns, { entity: "columns" }),
        issues: normalizeLevel1(_issues, { entity: "issues" })
    };
};

const onProjectClear = state => {
    state.current = null;
};

const onProjectRearrange = (state, { columnId, sourceIndex, destIndex }) => {
    if (sourceIndex === destIndex) {
        return state;
    }

    const columns = state.current.columns.result;

    columns.splice(sourceIndex, 1);
    columns.splice(destIndex, 0, columnId);
};

export default produce((state = initialState, { type, data }) => {
    switch (type) {
        case PROJECT_ADD_SUCCESS:
            return onProjectAdd(state, data);
        case PROJECT_LIST_SUCCESS:
            return onProjectList(state, data);
        case PROJECT_GET_SUCCESS:
            return onProject(state, data);
        case PROJECT_CLEAR:
            return onProjectClear(state);
        case PROJECT_COLUMN_REARRANGE:
            return onProjectRearrange(state, data);
        default:
            return state;
    }
});
