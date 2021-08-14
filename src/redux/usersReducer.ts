import {ResultCodeEnum, usersAPI as usersApi, usersAPI} from "../api/api";
import {updateObjectInArray} from "../utils/object-helper";
import {UserType} from "../typs/typs";
import {Dispatch} from "redux";
import {AppStateType, InferActionsTypes} from "./redux-store";
import {ThunkAction} from "redux-thunk";

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

export const usersReducer = (state = initState, action: ActionsType): initStateType => {
    switch (action.type) {
        case 'FOLLOW':
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, "id", {followed: true})
            }
        case 'UNFOLLOW':
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, "id", {followed: false})
            }
        case 'SET_USERS': {
            return {
                ...state,
                users: action.users,
            }
        }
        case 'SET_CURRENT_PAGE': {

            return {
                ...state,
                currentPage: action.currentPage,
            }
        }
        case 'SET_TOTAL_USERS_COUNT': {
            return {
                ...state,
                totalUsersCount: action.count,
            }
        }
        case 'TOGGLE_IS_FETCHING': {
            return {
                ...state,
                isFetching: action.isFetching,
            }
        }
        case 'TOGGLE_IS_FOLLOWING_PROGRESS': {
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

type ActionsType = InferActionsTypes<typeof actionsTypes>

export const actionsTypes = {
    followSuccess: (userId: number) => ({type: 'FOLLOW', userId} as const),
    unfollowSuccess: (userId: number) => ({type: 'UNFOLLOW', userId} as const),
    setUsers: (users: Array<UserType>) => ({type: 'SET_USERS', users} as const),

    setCurrentPage: (currentPage: number) => ({
        type: 'SET_CURRENT_PAGE',
        currentPage
    } as const),
    setTotalUsersCount: (totalUsersCount: number) => ({
        type: 'SET_TOTAL_USERS_COUNT',
        count: totalUsersCount
    } as const),
    toggleIsFetching: (isFetching: boolean) => ({
        type: 'TOGGLE_IS_FETCHING',
        isFetching
    } as const),
    toggleFollowingProgress: (isFetching: boolean, userId: number) => ({
        type: 'TOGGLE_IS_FOLLOWING_PROGRESS',
        isFetching,
        userId
    } as const),
}

type DispatchType = Dispatch<ActionsType>
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsType>

export const requestUsers = (currentPage: number, pageSize: number): ThunkType => {
    return async (dispatch) => {
        dispatch(actionsTypes.toggleIsFetching(true))
        dispatch(actionsTypes.setCurrentPage(currentPage));

        const data = await usersAPI.getUsers(currentPage, pageSize);

        dispatch(actionsTypes.toggleIsFetching(false));
        dispatch(actionsTypes.setUsers(data.items));
        dispatch(actionsTypes.setTotalUsersCount(data.totalCount));
    }
};

const _followUnfollowFlow = async (dispatch: DispatchType, userId: number, apiMethod: any, actionCreator: (userId: number) => ActionsType) => {
    dispatch(actionsTypes.toggleFollowingProgress(true, userId))
    const response = await apiMethod(userId);
    if (response.data.resultCode === ResultCodeEnum.Success) {
        dispatch(actionCreator(userId));
    }
    dispatch(actionsTypes.toggleFollowingProgress(false, userId));

}

export const follow = (userId: number): ThunkType => {
    const apiMethod = usersApi.follow.bind(usersApi);
    return async (dispatch) => {
        (_followUnfollowFlow(dispatch, userId, apiMethod, actionsTypes.followSuccess));
    }
}

export const unfollow = (userId: number): ThunkType => {
    const apiMethod = usersApi.unfollow.bind(usersApi);
    return async (dispatch) => {
        _followUnfollowFlow(dispatch, userId, apiMethod, actionsTypes.unfollowSuccess);
    }
}


