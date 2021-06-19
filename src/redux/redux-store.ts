import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import {dialogsReducer} from "./dialogsReducer";
import {profileReducer} from "./profileReducerе";
import {sidebarReducer} from "./sidebarReducer";
import {usersReducer} from "./usersReducer";
import thunkMiddleware from "redux-thunk";
import {reducer as formReducer} from 'redux-form'
import {appReducer} from "./appReducer";
import {authReducer} from "./authReducer";



const rootReducers = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    sidebarPage: sidebarReducer,
    usersPage: usersReducer,
    auth: authReducer,
    form: formReducer,
    app: appReducer,
})

type RootReducersType = typeof rootReducers

export type AppStateType = ReturnType<RootReducersType>


// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(rootReducers, /* preloadedState, */ composeEnhancers(compose(applyMiddleware(thunkMiddleware))));
