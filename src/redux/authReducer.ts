import {stopSubmit} from "redux-form";
import {authAPI, ResultCodeEnum} from "../api/api";

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
    const meData = await authAPI.me();
    if (meData.resultCode === ResultCodeEnum.Success ) {
        let {email, id, login,} = meData.data;
        dispatch(setAuthUserData(email, id, login, true));
    }

};

export const login = (email: string, password: string, rememberMe: boolean) => async (dispatch: any) => {
    const loginData = await authAPI.login(email, password, rememberMe)
    if (loginData.resultCode === ResultCodeEnum.Success) {
        dispatch(getAuthUserData());
    } else {
        const messages = loginData.messages.length > 0 ? loginData.messages[0] : "Some error"
        dispatch(stopSubmit("login", {_error: messages}))
    }

};

export const logout = () => async (dispatch: any) => {
    const response = await authAPI.logout()
    if (response.data.resultCode === 0) {
        dispatch(setAuthUserData(null, null, null, false));
    }
};


