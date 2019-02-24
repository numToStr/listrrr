import { PROJECT_ADD_SUCCESS } from "../action.types";

const initialState = {
    list: null,
    current: null,
    lastCreated: null
};

const onProjectAdd = (state, { project }) => ({
    ...state,
    lastCreated: project
});

export default (state = initialState, { type, data }) => {
    switch (type) {
        case PROJECT_ADD_SUCCESS:
            return onProjectAdd(state, data);
        default:
            return state;
    }
};
