import {stopSubmit} from "redux-form";
import {authAPI} from "../api/api";

const SET_USER_DATA = "samurai/auth/SET_USER_DATA";

type InitStateType = typeof initState

const initState = {
    email: null as null | string,
    login: null as null | string,
    isFetching: null as null | boolean,
    isAuth: false,
    userId: null as null | number
};

export const authReducer = (state = initState, action: any): InitStateType => {

    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                ...action.payload,
                usrerId: "sdsd",
            }
        default:
            return state;
    }
}

type SetAuthUserDataActionTypePayloadType = {
    email: string | null,
    login: string | null,
    userId: number | null,
    isAuth: boolean | null
}

type SetAuthUserDataActionType = {
    type: typeof SET_USER_DATA,
    payload: SetAuthUserDataActionTypePayloadType
}

export const setAuthUserData = (email: string | null, userId: number | null,
                                login: string | null, isAuth: boolean): SetAuthUserDataActionType => (
    {type: SET_USER_DATA, payload: {email, userId, login, isAuth}}
);

export const getAuthUserData = () => async (dispatch: any) => {
    let response = await authAPI.me();
    if (response.data.resultCode === 0) {
        let {email, id, login,} = response.data.data;
        dispatch(setAuthUserData(email, id, login, true));
    }

};

export const login = (email: string, password: string, rememberMe: boolean) => async (dispatch: any) => {
    let response = await authAPI.login(email, password, rememberMe)
    if (response.data.resultCode === 0) {
        dispatch(getAuthUserData());
    } else {
        const messages = response.data.messages.length > 0 ? response.data.messages[0] : "Some error"
        console.log(messages)
        dispatch(stopSubmit("login", {_error: messages}))
    }

};

export const logout = () => async (dispatch: any) => {
    const response = await authAPI.logout()
    if (response.data.resultCode === 0) {
        dispatch(setAuthUserData(null, null, null, false));
    }
};


