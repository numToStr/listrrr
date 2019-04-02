import { TEMPLATE_GET_SUCCESS } from "../action.types";

import { normalizeLevel1 } from "../json.normalizr.js";

const onTemplateGetSuccess = (state, { templates }) => {
    return normalizeLevel1(templates, { entity: "templates" });
};

export default (state = null, { type, data }) => {
    switch (type) {
        case TEMPLATE_GET_SUCCESS:
            return onTemplateGetSuccess(state, data);
        default:
            return state;
    }
};
