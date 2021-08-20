import {stopSubmit} from "redux-form";
import {ResultCodeEnum} from "../api/api";
import {authAPI} from "../api/auth-api";
import {BaseThunkType, InferActionsTypes} from "./redux-store";

type InitStateType = typeof initState
type ActionsType = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsType |  ReturnType<typeof stopSubmit>>

const initState = {
    email: null as null | string,
    login: null as null | string,
    isFetching: null as null | boolean,
    isAuth: false,
    userId: null as null | number
};

export const authReducer = (state = initState, action: ActionsType): InitStateType => {

    switch (action.type) {
        case 'SET_USER_DATA':
            return {
                ...state,
                ...action.payload
            }
        default:
            return state;
    }
}

export const actions = {
    setAuthUserData: (email: string | null, userId: number | null, login: string | null, isAuth: boolean) => (
        {type: 'SET_USER_DATA', payload: {email, userId, login, isAuth}} as const )
}

export const getAuthUserData = (): ThunkType => async (dispatch) => {
    const meData = await authAPI.me();
    if (meData.resultCode === ResultCodeEnum.Success) {
        let {email, id, login,} = meData.data;
        dispatch(actions.setAuthUserData(email, id, login, true));
    }

};

export const login = (email: string, password: string, rememberMe: boolean): ThunkType => async (dispatch) => {
    const loginData = await authAPI.login(email, password, rememberMe)
    if (loginData.resultCode === ResultCodeEnum.Success) {
        dispatch(getAuthUserData());
    } else {
        const messages = loginData.messages.length > 0 ? loginData.messages[0] : "Some error"
        dispatch(stopSubmit("login", {_error: messages}))
    }

};

export const logout = (): ThunkType => async (dispatch) => {
    const response = await authAPI.logout()
    if (response.data.resultCode === 0) {
        dispatch(actions.setAuthUserData(null, null, null, false));
    }
};


