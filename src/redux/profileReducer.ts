import {PhotosType, PostType, ProfileType} from '../Types/types'
import {BaseThunkType, InferActionsTypes} from './reduxStore'
import {profileAPI} from "../api/profileAPI";
import {ResultCodesEnum} from "../api/apiTypes";


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

type ActionTypes = InferActionsTypes<typeof actions>

const profileReducer = (state = initialState, action: ActionTypes): InitialStateType => {
    switch (action.type) {
        case 'RSN/PROFILE/ADD_POST': {
            return {
                ...state,
                posts: [...state.posts, {id: 3, message: action.newPostText, likesCount: 0}]
            }
        }
        case 'RSN/PROFILE/SET_USER_PROFILE': {
            return {...state, profile: action.profile}
        }
        case 'RSN/PROFILE/SET_STATUS': {
            return {...state, status: action.status}
        }
        case 'RSN/PROFILE/SET_PHOTO': {
            return {...state, profile: {...state.profile, photos: action.photos} as ProfileType}
        }
        case 'RSN/PROFILE/DELETE_POST': {
            return {...state, posts: state.posts.filter(p => p.id !== action.postId)}
        }
        default:
            return state
    }

}


export const actions = {
    addPostActionCreator:  (newPostText: string) => ({type: 'RSN/PROFILE/ADD_POST', newPostText} as const),

    setUserProfile: (profile: ProfileType)  => ({type: 'RSN/PROFILE/SET_USER_PROFILE', profile} as const),

    setUserStatus: (status: string)  => ({type: 'RSN/PROFILE/SET_STATUS', status} as const),

    setUserPhoto: (photos: PhotosType)  => ({type: 'RSN/PROFILE/SET_PHOTO', photos} as const),

    deletePost: (postId: number)  => ({type: 'RSN/PROFILE/DELETE_POST', postId} as const),
}

type ThunkType = BaseThunkType<ActionTypes>

export const getProfile = (userId: number): ThunkType => async (dispatch) => {
    const getProfileData = await profileAPI.getProfile(userId)
    dispatch(actions.setUserProfile(getProfileData))
}

export const getStatus = (userId: number): ThunkType => async (dispatch) => {
    const getStatusData = await profileAPI.getStatus(userId)
    dispatch(actions.setUserStatus(getStatusData))
}

export const updateStatus = (status: string): ThunkType => async (dispatch) => {
    const updateStatusData = await profileAPI.updateStatus(status)
    if (updateStatusData.resultCode === ResultCodesEnum.Success) {
        dispatch(actions.setUserStatus(status))
    }

}

export const updatePhoto = (photo: PhotosType): ThunkType => async (dispatch) => {
    const updatePhotoData = await profileAPI.updatePhoto(photo)
    if (updatePhotoData.resultCode === ResultCodesEnum.Success) {
        dispatch(actions.setUserPhoto(updatePhotoData.data.photos))
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
        if (userId) {
            await dispatch(getProfile(userId))
        }
    } else {
        let textError = updateProfileData.messages.length > 0 ? updateProfileData.messages[0] : 'Some error'
        setStatus(textError)
        setSubmitting(false)
    }
}


export default profileReducer