import {ResultCodeEnum} from "../api/api";
import {PostType, ProfileType} from '../typs/typs'
import {profileAPI} from "../api/profile-api";
import {BaseThunkType, InferActionsTypes} from "./redux-store";

type InitStateType = typeof initState
type ActionsType = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsType>

const initState = {
    posts: [
        {id: 1, massage: "How are you", likesCount: 2},
        {id: 2, massage: "It my first post", likesCount: 23},
    ] as PostType[],
    profile: null as ProfileType | null,
    newPostText: '',
    status: "",
};


export const profileReducer = (state = initState, action: ActionsType): InitStateType => {
    switch (action.type) {
        case 'ADD_POST': {
            const newPost: PostType = {
                id: 3,
                massage: action.newPostText,
                likesCount: 0,
            };
            return {
                ...state,
                posts: [...state.posts, newPost],
                newPostText: "",
            }
        }
        case 'SET_USER_PROFILE': {
            return {
                ...state,
                profile: action.profile,
            }
        }
        case 'SET_STATUS': {
            return {
                ...state,
                status: action.status,
            }
        }
        default:
            return state;
    }
}

export const actions = {
    addNewPostTextActionCreator: (newPostText: string) => ({type: 'ADD_POST', newPostText} as const),
    setUserProfile: (profile: ProfileType) => ({type: 'SET_USER_PROFILE', profile} as const),
    setStatus: (status: string) => ({type: 'SET_STATUS', status} as const),
}

export const getUserProfile = (userId: number): ThunkType => async (dispatch) => {
    const data = await profileAPI.getProfile(userId)
    dispatch(actions.setUserProfile(data));
}

export const getStatus = (userId: number): ThunkType => async (dispatch) => {
    const data = await profileAPI.getStatus(userId)
    dispatch(actions.setStatus(data))
}

export const updateStatus = (status: string): ThunkType => async (dispatch) => {
    const {resultCode} = await profileAPI.updateStatus(status)
    if (resultCode === ResultCodeEnum.Success) {
        dispatch(actions.setStatus(status));
    }
}


