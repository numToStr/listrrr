import { createStore, combineReducers, applyMiddleware, compose } from "redux";

import http from "./middlewares/http.middleware";
import reducers from "./reducers/index.reducer";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const REDUCERS = combineReducers(reducers);

export default function configureStore(initialState = {}) {
    return createStore(
        REDUCERS,
        initialState,
        composeEnhancers(applyMiddleware(http))
    );
}
