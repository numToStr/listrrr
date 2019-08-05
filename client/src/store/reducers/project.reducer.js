import produce from "immer";
import { normalizeLevel1 } from "../json.normalizr";
import {
    PROJECT_ADD_SUCCESS,
    PROJECT_LIST_SUCCESS,
    PROJECT_GET_SUCCESS,
    PROJECT_CLEAR,
    PROJECT_COLUMN_REARRANGE,
    PROJECT_ISSUE_REARRANGE,
    PROJECT_UPDATE_SUCCESS
} from "../action.types";

const initialState = {
    list: null,
    counts: {},
    current: null,
    lastCreated: null
};

const onProjectAdd = (state, { project }) => {
    state.lastCreated = project;
};

const onProjectList = (state, { projects, counts }) => {
    state.list = normalizeLevel1(projects, { entity: "projects" });
    state.counts = counts;
};

const onProject = (state, { project }) => {
    const _columns = project.columns.sort(
        (curr, next) => curr.order - next.order
    );

    state.current = {
        ...project,
        columns: normalizeLevel1(_columns, { entity: "columns" }),
        issues: normalizeLevel1(project.issues, { entity: "issues" })
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

const onProjectIssueRearrange = (
    state,
    { issueId, sourceColumn, sourceIndex, destColumn, destIndex }
) => {
    const _issues = state.current.issues.entities;

    state.current.issues.result.forEach(issue => {
        const ii = _issues[issue];
        const _column = ii.column;
        const _index = ii.columnIndex;

        if (destColumn === sourceColumn) {
            if (_column === destColumn) {
                if (
                    sourceIndex < destIndex &&
                    _index > sourceIndex &&
                    _index <= destIndex
                ) {
                    ii.columnIndex -= 1;
                } else if (_index >= destIndex && _index < sourceIndex) {
                    ii.columnIndex += 1;
                }
            }
        } else {
            if (_column === sourceColumn && _index > sourceIndex) {
                ii.columnIndex -= 1;
            } else if (_column === destColumn && _index >= destIndex) {
                ii.columnIndex += 1;
            }
        }

        _issues[issueId].columnIndex = destIndex;
        _issues[issueId].column = destColumn;
    });
};

const onProjectUpdate = (state, { project }) => {
    if (state.list) {
        state.list.result = state.list.result.filter(
            proj => proj !== project._id
        );
        Reflect.deleteProperty(state.list.entities, project._id);
    }

    state.current = {
        ...state.current,
        ...project
    };
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
        case PROJECT_ISSUE_REARRANGE:
            return onProjectIssueRearrange(state, data);
        case PROJECT_UPDATE_SUCCESS:
            return onProjectUpdate(state, data);
        default:
            return state;
    }
});
