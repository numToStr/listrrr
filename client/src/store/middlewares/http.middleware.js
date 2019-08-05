import { batch } from "react-redux";

import axios from "../axios.interface";
import { httpStart, httpSuccess, httpFailure } from "../actions/index.action";

const http = ({ dispatch }) => next => async action => {
    if (!action.http) {
        return next(action);
    }

    const {
        payload: { method, url, data, params = {} },
        meta: { label }
    } = action;

    /** In case of protected backend API
     *
     * 1. Get token from store,
     * 2. If found, => 4.
     * 3. If not found, get token from AsyncStorage
     * 4. Check for its expiration
     * 5. If not expired, Send Request
     * 6. If expired, get refresh token from store
     * 7. If not found, get token from AsyncStorage
     * 8. If not found, return
     * 9. If found get new token from refresh token
     * 10. Send Request with new token
     */

    try {
        dispatch(httpStart({ label }));

        const {
            data: { success, message, ...response }
        } = await axios({
            method,
            url,
            data,
            params
        });

        // batch() ensures a single DOM update
        batch(() => {
            dispatch(action.success(response));
            dispatch(httpSuccess({ label }));
        });
    } catch (error) {
        const res = error.response;
        if (res) {
            const {
                data: { message }
            } = res;

            return dispatch(httpFailure({ label, error: message }));
        }

        throw error;
    }
};

export default http;
