import { createStore, applyMiddleware, compose } from "redux";

import http from "./middlewares/http.middleware";
import reducers from "./reducers/index.reducer";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default function configureStore(initialState = {}) {
    return createStore(
        reducers,
        initialState,
        composeEnhancers(applyMiddleware(http))
    );
}
