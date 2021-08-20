import {Action, applyMiddleware, combineReducers, compose, createStore, Dispatch} from "redux";
import {dialogsReducer} from "./dialogsReducer";
import {profileReducer} from "./profileReducerе";
import {sidebarReducer} from "./sidebarReducer";
import {usersReducer} from "./usersReducer";
import thunkMiddleware, {ThunkAction} from "redux-thunk";
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

type PropertiesType<T> = T extends {[key: string]: infer U } ? U : never
export type InferActionsTypes<T extends {[key: string]: (...args: any[]) => any }> = ReturnType<PropertiesType<T>>
export type AppStateType = ReturnType<RootReducersType>

export type BaseThunkType<A extends Action, R = Promise<void>> = ThunkAction<R, AppStateType, unknown, A>



// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(rootReducers, /* preloadedState, */ composeEnhancers(compose(applyMiddleware(thunkMiddleware))));
