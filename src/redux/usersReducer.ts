import {ResultCodeEnum, usersAPI as usersApi, usersAPI} from "../api/api";
import {updateObjectInArray} from "../utils/object-helper";
import {UserType} from "../typs/typs";
import {Dispatch} from "redux";
import {AppStateType} from "./redux-store";
import {ThunkAction} from "redux-thunk";

const FOLLOW = "FOLLOW";
const UNFOLLOW = "UNFOLLOW";
const SET_USERS = "SET_USERS";
const SET_CURRENT_PAGE = "SET_CURRENT_PAGE";
const SET_TOTAL_USERS_COUNT = "SET_TOTAL_USERS_COUNT";
const TOGGLE_IS_FETCHING = "TOGGLE_IS_FETCHING";
const TOGGLE_IS_FOLLOWING_PROGRESS = "TOGGLE_IS_FOLLOWING_PROGRESS";


const initState = {
    users: [] as Array<UserType>,
    pageSize: 10,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
    followingInProgress: [] as Array<number>,
    //portionSize: 10
};
type initStateType = typeof initState

export const usersReducer = (state = initState, action: any): initStateType => {
    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, "id", {followed: true})
            }
        case UNFOLLOW:
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, "id", {followed: false})
            }
        case SET_USERS: {
            return {
                ...state,
                users: action.users,
            }
        }
        case SET_CURRENT_PAGE: {

            return {
                ...state,
                currentPage: action.currentPage,
            }
        }
        case SET_TOTAL_USERS_COUNT: {
            return {
                ...state,
                totalUsersCount: action.count,
            }
        }
        case TOGGLE_IS_FETCHING: {
            return {
                ...state,
                isFetching: action.isFetching,
            }
        }
        case TOGGLE_IS_FOLLOWING_PROGRESS: {
            return {
                ...state,
                followingInProgress: action.isFetching
                    ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter(id => id != action.userId),
            }
        }
        default:
            return state;
    }
}

type FollowSuccessActionType = {
    type: typeof FOLLOW,
    userId: number
}
export const followSuccess = (userId: number): FollowSuccessActionType => ({type: FOLLOW, userId});

type UnfollowSuccessActionsType = {
    type: typeof UNFOLLOW,
    userId: number
}
export const unfollowSuccess = (userId: number): UnfollowSuccessActionsType => ({type: UNFOLLOW, userId});

type SetUsersActionsType = {
    type: typeof SET_USERS,
    users: Array<UserType>
}
export const setUsers = (users: Array<UserType>): SetUsersActionsType => ({type: SET_USERS, users});

type SetCurrentPageActionsType = {
    type: typeof SET_CURRENT_PAGE,
    currentPage: number
}
export const setCurrentPage = (currentPage: number): SetCurrentPageActionsType => ({
    type: SET_CURRENT_PAGE,
    currentPage
})

type SetTotalUsersCountActionsType = {
    type: typeof SET_TOTAL_USERS_COUNT,
    count: number
}
export const setTotalUsersCount = (totalUsersCount: number): SetTotalUsersCountActionsType => ({
    type: SET_TOTAL_USERS_COUNT,
    count: totalUsersCount
})

type ToggleIsFetchingActionsType = {
    type: typeof TOGGLE_IS_FETCHING,
    isFetching: boolean
}
export const toggleIsFetching = (isFetching: boolean): ToggleIsFetchingActionsType => ({
    type: TOGGLE_IS_FETCHING,
    isFetching
})

type ToggleFollowingProgressActionsType = {
    type: typeof TOGGLE_IS_FOLLOWING_PROGRESS,
    isFetching: boolean,
    userId: number
}

export const toggleFollowingProgress = (isFetching: boolean, userId: number): ToggleFollowingProgressActionsType => ({
    type: TOGGLE_IS_FOLLOWING_PROGRESS,
    isFetching,
    userId
});

type ActionsType = ToggleFollowingProgressActionsType | FollowSuccessActionType |
    UnfollowSuccessActionsType | SetUsersActionsType | SetCurrentPageActionsType | SetTotalUsersCountActionsType |
    ToggleIsFetchingActionsType

type GetStateType = () => AppStateType
type DispatchType = Dispatch<ActionsType>
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsType>

export const requestUsers = (currentPage: number, pageSize: number): ThunkType => {
    return async (dispatch, getState) => {
        dispatch(toggleIsFetching(true))
        dispatch(setCurrentPage(currentPage));
        const data = await usersAPI.getUsers(currentPage, pageSize);
        dispatch(toggleIsFetching(false));
        dispatch(setUsers(data.items));
        dispatch(setTotalUsersCount(data.totalCount));
    }
};

const _followUnfollowFlow = async (dispatch: DispatchType, userId: number, apiMethod: any, actionCreator: (userId: number) => FollowSuccessActionType | UnfollowSuccessActionsType ) => {
    dispatch(toggleFollowingProgress(true, userId))
    const response = await apiMethod(userId);
    if (response.data.resultCode === ResultCodeEnum.Success) {
        dispatch(actionCreator(userId));
    }
    dispatch(toggleFollowingProgress(false, userId));

}

export const follow = (userId: number): ThunkType => {
    const apiMethod = usersApi.follow.bind(usersApi);
    return async (dispatch) => {
        (_followUnfollowFlow(dispatch, userId, apiMethod, followSuccess));
    }
}

export const unfollow = (userId: number): ThunkType => {
    const apiMethod = usersApi.unfollow.bind(usersApi);
    return async (dispatch) => {
        _followUnfollowFlow(dispatch, userId, apiMethod, unfollowSuccess);
    }
}


