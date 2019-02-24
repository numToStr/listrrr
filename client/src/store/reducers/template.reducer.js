import { TEMPLATE_GET_SUCCESS } from "../action.types";

const onTemplateGetSuccess = (state, { templates }) => templates;

export default (state = null, { type, data }) => {
    switch (type) {
        case TEMPLATE_GET_SUCCESS:
            return onTemplateGetSuccess(state, data);
        default:
            return state;
    }
};
