import React from "react";
import ReactDOM from "react-dom";
import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";

import App from "./Root/App";
import registerServiceWorker from "./registerServiceWorker";
import reducers from "./Store/reducers/index";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const REDUCER = combineReducers(reducers);

const STORE = createStore(REDUCER, composeEnhancers(applyMiddleware(thunk)));

const APP = (
	<Provider store={STORE}>
		<App />
	</Provider>
);

ReactDOM.render(APP, document.getElementById("root"));
registerServiceWorker();
