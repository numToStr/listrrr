import { combineReducers } from "redux";

import http from "./http.reducer";
import auth from "./auth.reducer";
import issue from "./issue.reducer";
import project from "./project.reducer";
import templates from "./template.reducer";
import dashboard from "./dashboard.reducer";

export default combineReducers({
    http,
    auth,
    issue,
    project,
    templates,
    dashboard
});
