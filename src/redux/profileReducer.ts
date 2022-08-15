import {profileAPI, ResultCodesEnum} from '../api/api'
import {PhotosType, PostType, ProfileType} from '../Types/types'
import {ThunkAction} from 'redux-thunk'
import {AppStateType} from './reduxStore'

const ADD_POST = 'react-social-network/profile/ADD-POST'
const DELETE_POST = 'react-social-network/profile/DELETE-POST'
const SET_USER_PROFILE = 'react-social-network/profile/SET-USER-PROFILE'
const SET_STATUS = 'react-social-network/profile/SET-STATUS'
const SET_PHOTO = 'react-social-network/profile/SET-PHOTO'

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

type ActionsType = AddPostActionType | SetUserProfileType | SetUserStatusType | SetUserPhotoType | DeletePostType

const profileReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case ADD_POST: {
            return {
                ...state,
                posts: [...state.posts, {id: 3, message: action.newPostText, likesCount: 0}]
            }
        }
        case SET_USER_PROFILE: {
            return {...state, profile: action.profile}
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
            return state
    }

}


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

export const setUserStatus = (status: string): SetUserStatusType => ({type: SET_STATUS, status})

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

type ThunkType = ThunkAction<Promise<void>, AppStateType, any, ActionsType>

export const getProfile = (userId: number): ThunkType => async (dispatch) => {
    const getProfileData = await profileAPI.getProfile(userId)
    dispatch(setUserProfile(getProfileData))
}

export const getStatus = (userId: number): ThunkType => async (dispatch) => {
    const getStatusData = await profileAPI.getStatus(userId)
    dispatch(setUserStatus(getStatusData))
}

export const updateStatus = (status: string): ThunkType => async (dispatch) => {
    const updateStatusData = await profileAPI.updateStatus(status)
    if (updateStatusData.resultCode === ResultCodesEnum.Success) {
        dispatch(setUserStatus(status))
    }
}

export const updatePhoto = (photo: PhotosType): ThunkType => async (dispatch) => {
    const updatePhotoData = await profileAPI.updatePhoto(photo)
    if (updatePhotoData.resultCode === ResultCodesEnum.Success) {
        dispatch(setUserPhoto(updatePhotoData.data.photos))
    }
}


export const updateProfile = (formData: ProfileType,
                              setStatus: (error: string) => void,
                              setSubmitting: (boolean: boolean) => void,
                              goToViewMode: () => void): ThunkType => async (dispatch, getState) => {
    const updateProfileData = await profileAPI.updateProfile(formData)
    let resultCode = updateProfileData.resultCode
    if (resultCode === ResultCodesEnum.Success) {
        const userId = getState().auth.userId
        goToViewMode()
        if (userId){
            await dispatch(getProfile(userId))
        }
    } else {
        let textError = updateProfileData.messages.length > 0 ? updateProfileData.messages[0] : 'Some error'
        setStatus(textError)
        setSubmitting(false)
    }
}


export default profileReducer