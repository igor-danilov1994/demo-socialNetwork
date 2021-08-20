import {getAuthUserData} from "./authReducer";
import {InferActionsTypes} from "./redux-store";

export type initialStateType = typeof initState

const initState = {
    initialized: false,
};

type ActionsType = InferActionsTypes<typeof actions>


export const appReducer = (state = initState, action: ActionsType): initialStateType => {

    switch (action.type) {
        case "INITIALIZED_SUCCESS":
            return {
                ...state,
                initialized: true,
            }
        default:
            return state;
    }
}

const actions = {
    initializedSuccess: () => ({type: 'INITIALIZED_SUCCESS'} as const)
}


export const initializeApp = () => (dispatch: any) => {
    let promise = dispatch(getAuthUserData());
    Promise.all([promise])
        .then(() => {
            dispatch(actions.initializedSuccess())
        })
}

