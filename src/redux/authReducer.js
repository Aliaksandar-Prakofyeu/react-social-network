import {authAPI} from "../api/api";
import {stopSubmit} from "redux-form";

const SET_AUTH_USER_DATA = 'SET-AUTH-USER-DATA';

let initialState = {
    userId: null,
    email: null,
    login: null,
    isAuth: false,
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_AUTH_USER_DATA: {
            return {
                ...state,
                ...action.payload,

            }
        }

        default:
            return state;
    }
};

export const setAuthUserData = (userId, email, login, isAuth) => ({type: SET_AUTH_USER_DATA, payload: {userId, email, login, isAuth}});

export const getAuth = () => (dispatch) => {
    return authAPI.getAuth().then(response => {
        if (response.data.resultCode === 0) {
            let {id, email, login} = response.data.data;
            dispatch(setAuthUserData(id, email, login,true))
        }
    });
}

export const logIn = (email, password, rememberMe) => (dispatch) => {


    authAPI.logIn(email, password, rememberMe).then(response => {
        if (response.data.resultCode === 0) {
            dispatch(getAuth())
        } else {
            let message = response.data.messages.length > 0 ? response.data.messages[0] : 'Some error'
            dispatch(stopSubmit('login', {_error: message}))
        }
    });
}


export const logOut = () => (dispatch) => {
    authAPI.logOut().then(response => {
        if (response.data.resultCode === 0) {
            dispatch(setAuthUserData(null,null,null,false))
        }
    });
}

export default authReducer;
