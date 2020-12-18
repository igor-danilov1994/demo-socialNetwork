import {getAuthUserData} from "./authReducer";


const INITIALIZED_SUCCESS = "INITIALIZED_SUCCESS";


let initState = {
    initialized: false,
};

const appReducer = (state = initState, action) => {
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


const initializedSuccess = () => (
    {type: INITIALIZED_SUCCESS}
);

export const initializeApp = () => (dispatch) => {
    debugger
    let promise = dispatch(getAuthUserData());
    Promise.all([promise])
        .then(() => {
            dispatch(initializedSuccess())
        })
}

export default appReducer;

