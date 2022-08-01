import {profileAPI} from "../api/api";
import {PhotosType, PostType, ProfileType} from "../Types/types";

const ADD_POST = 'react-social-network/profile/ADD-POST';
const DELETE_POST = 'react-social-network/profile/DELETE-POST';
const SET_USER_PROFILE = 'react-social-network/profile/SET-USER-PROFILE';
const SET_STATUS = 'react-social-network/profile/SET-STATUS';
const SET_PHOTO = 'react-social-network/profile/SET-PHOTO';

let initialState = {
    posts: [
        {id: 1, message: 'Hi how are you?', likesCount: 10},
        {id: 2, message: 'It\'s my first post', likesCount: 20},
    ] as Array<PostType>,
    profile: null as ProfileType | null,
    status: '',
    newPostText: ''
}

type InitialStateType = typeof initialState

const profileReducer = (state = initialState, action: any): InitialStateType => {
    switch (action.type) {
        case ADD_POST: {
            return {
                ...state,
                posts: [...state.posts, {id: 3, message: action.newPostText, likesCount: 0}]
            };
        }
        case SET_USER_PROFILE: {
            return {...state, profile: action.profile};
        }
        case SET_STATUS: {
            return {...state, status: action.status}
        }
        case SET_PHOTO: {
            return {...state, profile: {...state.profile, photos: action.photos} as ProfileType}
        }
        case DELETE_POST: {
            return {...state, posts: state.posts.filter(p => p.id !== action.postId)}
        }
        default:
            return state;
    }

};

type AddPostActionType = {
    type: typeof ADD_POST
    newPostText: string
}

export const addPostActionCreator = (newPostText: string): AddPostActionType => ({type: ADD_POST, newPostText})

type SetUserProfileType = {
    type: typeof SET_USER_PROFILE
    profile: ProfileType
}

export const setUserProfile = (profile: ProfileType): SetUserProfileType => ({type: SET_USER_PROFILE, profile})

type SetUserStatusType = {
    type: typeof SET_STATUS
    status: string
}

export const setUserStatus = (status: string): SetUserStatusType=> ({type: SET_STATUS, status})

type SetUserPhotoType = {
    type: typeof SET_PHOTO
    photos: PhotosType
}

export const setUserPhoto = (photos: PhotosType): SetUserPhotoType => ({type: SET_PHOTO, photos})

type DeletePostType = {
    type: typeof DELETE_POST
    postId: number
}

export const deletePost = (postId: number): DeletePostType => ({type: DELETE_POST, postId})

export const getProfile = (userId:number) => async (dispatch: any) => {
    const response = await profileAPI.getProfile(userId);
    dispatch(setUserProfile(response.data));
}

export const getStatus = (userId: number) => async (dispatch: any) => {
    const response = await profileAPI.getStatus(userId);
    dispatch(setUserStatus(response.data));
}

export const updateStatus = (status: string) => async (dispatch: any) => {
    const response = await profileAPI.updateStatus(status);
    if (response.data.resultCode === 0) {
        dispatch(setUserStatus(status))
    }
}

export const updatePhoto = (photo: PhotosType) => async (dispatch: any) => {
    const response = await profileAPI.updatePhoto(photo);
    if (response.data.resultCode === 0) {
        dispatch(setUserPhoto(response.data.data.photos))
    }
}


export const updateProfile = (formData: any, setStatus: any, setSubmitting: any, goToViewMode: any) => async (dispatch: any, getState: any) => {

    const response = await profileAPI.updateProfile(formData);

    let resultCode = response.data.resultCode;

    if (resultCode === 0) {
        const userId = getState().auth.id;
        goToViewMode();
        dispatch(getProfile(userId));
    } else {
        let textError = `${response.data.messages.join(', ')}`;
        setStatus(textError);
        setSubmitting(false);
    }
}


export default profileReducer;