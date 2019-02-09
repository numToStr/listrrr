import React from "react";
import ReactDOM from "react-dom";
import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";

import { MuiPickersUtilsProvider } from "material-ui-pickers";
import DateFnsUtils from "material-ui-pickers/utils/date-fns-utils";

import App from "./Root/App";
import registerServiceWorker from "./registerServiceWorker";
import reducers from "./Store/reducers/index";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const REDUCER = combineReducers(reducers);

const STORE = createStore(REDUCER, composeEnhancers(applyMiddleware(thunk)));

const APP = (
	<MuiPickersUtilsProvider utils={DateFnsUtils}>
		<Provider store={STORE}>
			<App />
		</Provider>
	</MuiPickersUtilsProvider>
);

ReactDOM.render(APP, document.getElementById("root"));
registerServiceWorker();
