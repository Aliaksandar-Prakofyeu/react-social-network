import {profileAPI} from "../api/api";

const ADD_POST = 'react-social-network/profile/ADD-POST';
const DELETE_POST = 'react-social-network/profile/DELETE-POST';
const SET_USER_PROFILE = 'react-social-network/profile/SET-USER-PROFILE';
const SET_STATUS = 'react-social-network/profile/SET-STATUS';
const SET_PHOTO = 'react-social-network/profile/SET-PHOTO'

let initialState = {
    posts: [
        {id: 1, message: 'Hi how are you?', likeCount: 10},
        {id: 2, message: 'It\'s my first post', likeCount: 20},
    ],
    profile: null,
    status: '',
};

const profileReducer = (state = initialState, action) => {
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
            return{...state, profile: {...state.profile, photos: action.photos}}
        }
        case DELETE_POST: {
            return {...state, posts: state.posts.filter(p => p.id != action.postId)}
        }
        default:
            return state;
    }

};
export const addPostActionCreator = (newPostText) => ({type: ADD_POST, newPostText})
export const setUserProfile = (profile) => ({type: SET_USER_PROFILE, profile})
export const setUserStatus = (status) => ({type: SET_STATUS, status})
export const setUserPhoto = (photos) => ({type: SET_PHOTO, photos})
export const deletePost = (postId) => ({type: DELETE_POST, postId})

export const getProfile = (userId) => async (dispatch) => {
    const response = await profileAPI.getProfile(userId);
    dispatch(setUserProfile(response.data));
}

export const getStatus = (userId) => async (dispatch) => {
    const response = await profileAPI.getStatus(userId);
    dispatch(setUserStatus(response.data));
}

export const updateStatus = (status) => async (dispatch) => {
    const response = await profileAPI.updateStatus(status);
        if (response.data.resultCode === 0) {
            dispatch(setUserStatus(status))
        }
}

export const updatePhoto = (photo) => async (dispatch) =>{
    const response = await profileAPI.updatePhoto(photo);
    if (response.data.resultCode === 0) {
        dispatch(setUserPhoto(response.data.data.photos))
    }
}


export default profileReducer;