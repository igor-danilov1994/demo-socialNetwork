import {profileAPI, usersAPI} from "../api/api";
import {ContactsType} from '../typs/typs'
import {PhotosType} from '../typs/typs'
import {ProfileType} from '../typs/typs'
import {PostType} from '../typs/typs'


const ADD_POST = "ADD-POST";
const SET_USER_PROFILE = "SET_USER_PROFILE";
const SET_STATUS = "SET_STATUS";

type InitStateType = typeof initState

const initState = {
    posts: [
        {id: 1, massage: "How are you", likesCount: 2},
        {id: 2, massage: "It my first post", likesCount: 23},
    ] as Array<PostType>,
    profile: null as ProfileType | null,
    newPostText: '',
    status: "",
};

export const profileReducer = (state = initState, action: any): InitStateType => {
    switch (action.type) {
        case ADD_POST: {
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
        case SET_USER_PROFILE: {
            return {
                ...state,
                profile: action.profile,
            }
        }
        case SET_STATUS: {
            return {
                ...state,
                status: action.status,
            }
        }
        default:
            return state;
    }
}

type AddNewPostTextActionCreatorType = {
    type: typeof ADD_POST,
    newPostText: string
}

export const addNewPostTextActionCreator = (newPostText: string): AddNewPostTextActionCreatorType => ({type: ADD_POST, newPostText});

type SetUserProfileType = {
    type: typeof SET_USER_PROFILE,
    profile: ProfileType
}

const setUserProfile = (profile: ProfileType): SetUserProfileType => ({type: SET_USER_PROFILE, profile});

type SetStatusType = {
    type: typeof SET_STATUS,
    status: string
}

const setStatus = (status: string): SetStatusType => ({type: SET_STATUS, status});


export const getUserProfile = (userId: number) => async (dispatch: any) => {
    let response = await usersAPI.getProfile(userId)
    dispatch(setUserProfile(response.data));
}

export const getStatus = (userId: number) => async (dispatch: any) => {
    let response = await profileAPI.getStatus(userId)
    dispatch(setStatus(response.data));
}

export const updateStatus = (status: string) => async (dispatch: any) => {
    let response = await profileAPI.updateStatus(status)
    if (response.data.resultCode === 0) {
        dispatch(setStatus(status));
    }
}


