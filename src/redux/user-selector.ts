import {createSelector} from "reselect";
import {AppStateType} from "./redux-store";

export const getUsersSelector = (state: AppStateType) => {
    return state.usersPage.users
}

export const getUsers = (state: AppStateType) => {
    return  getUsersSelector(state).filter(U => true);
}

export const getUserSuperSelector = createSelector(getUsersSelector, (users) => {
    return users.filter(U => true);
});

export const getPageSize = (state: AppStateType) => {
    return state.usersPage.pageSize
}

export const getTotalUsersCount = (state: AppStateType) => {
    return state.usersPage.totalUsersCount
}

export const getCurrentPage = (state: AppStateType) => {
    return state.usersPage.currentPage
}

export const getIsFetching = (state: AppStateType) => {
    return state.usersPage.isFetching
}

export const getFollowingInProgress = (state: AppStateType) => {
    return state.usersPage.followingInProgress
}

export const getAuthStatus = (state: AppStateType) => {
    return state.auth.isAuth
}


