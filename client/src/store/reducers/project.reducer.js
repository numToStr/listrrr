import normalize from "../json.normalizr";
import { PROJECT_ADD_SUCCESS, PROJECT_LIST_SUCCESS } from "../action.types";

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
    list: normalize({ projects }, { entity: "projects" }).projects
});

export default (state = initialState, { type, data }) => {
    switch (type) {
        case PROJECT_ADD_SUCCESS:
            return onProjectAdd(state, data);
        case PROJECT_LIST_SUCCESS:
            return onProjectList(state, data);
        default:
            return state;
    }
};
