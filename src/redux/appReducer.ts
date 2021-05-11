import {getAuthUserData} from "./authReducer";


const INITIALIZED_SUCCESS = "INITIALIZED_SUCCESS";

export type initialStateType = {
    initialized: boolean
}

const initState: initialStateType = {
    initialized: false,
};

export const appReducer = (state = initState, action: any): initialStateType => {

    switch (action.type) {
        case INITIALIZED_SUCCESS:
            return {
                ...state,
                initialized: true,
            }
        default:
            return state;
    }
}

type InitializedSuccessType= {
    type: typeof INITIALIZED_SUCCESS
}

const initializedSuccess = () => (
    {type: INITIALIZED_SUCCESS}
);

export const initializeApp = () => (dispatch: any) => {
    let promise = dispatch(getAuthUserData());
    Promise.all([promise])
        .then(() => {
            dispatch(initializedSuccess())
        })
}

