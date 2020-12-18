import {authAPI} from "../api/api";
import {stopSubmit} from "redux-form";

const SET_USER_DATA = "SET_USER_DATA";


let initState = {
    email: 'null',
    login: 'null',
    isFetching: null,
    isAuth: false
};

const authReducer = (state = initState, action) => {
    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                ...action.payload,
            }
        default:
            return state;
    }
}


const setAuthUserData = (email, userId, login, isAuth) => (
    {type: SET_USER_DATA, payload: {email, userId, login, isAuth}}
);

export const getAuthUserData = () => {
    return (dispatch) => {
        return authAPI.me()
            .then(response => {
                if (response.data.resultCode === 0) {
                    let {email, id, login,} = response.data.data;
                    dispatch(setAuthUserData(email, id, login, true));
                }
            });
    }
};

export const login = (email, password, rememberMe) => {
    return (dispatch) => {
            authAPI.login(email, password, rememberMe)
                .then(response => {
                    if (response.data.resultCode === 0) {
                        dispatch(getAuthUserData());
                    } else {
                        let messages = response.data.messages.length > 0 ? response.data.messages[0] : "Some error"
                        dispatch(stopSubmit("login", {_error: messages } ) )
                    }
                });
    }
};

export const logout = () => {
    return (dispatch) => {
        authAPI.logout()
            .then(response => {
                if (response.data.resultCode === 0) {
                    dispatch(setAuthUserData(null, null, null, false));
                }
            });
    }
};

export default authReducer;

