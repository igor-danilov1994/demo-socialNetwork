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
    debugger
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

export const getAuthUserData = () => async (dispatch) => {
    debugger
    let response = await authAPI.me();
    if (response.data.resultCode === 0) {
        let {email, id, login,} = response.data.data;
        dispatch(setAuthUserData(email, id, login, true));
    }

};

export const login = (email, password, rememberMe) => async (dispatch) => {
    let response = await authAPI.login(email, password, rememberMe)
    if (response.data.resultCode === 0) {
        dispatch(getAuthUserData());
    } else {
        let messages = response.data.messages.length > 0 ? response.data.messages[0] : "Some error"
        dispatch(stopSubmit("login", {_error: messages}))
    }

};

export const logout = () => async (dispatch) => {
    debugger
    let response = await authAPI.logout()
    if (response.data.resultCode === 0) {
        dispatch(setAuthUserData(null, null, null, false));
    }
};

export default authReducer;

