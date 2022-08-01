import {authAPI, securityAPI} from "../api/api";
import {stopSubmit} from "redux-form";

const SET_AUTH_USER_DATA = "react-social-network/auth/SET-AUTH-USER-DATA";
const GET_CAPTCHA_URL_SUCCESS = "react-social-network/auth/GET-CAPTCHA-URL-SUCCESS"

export type InitialStateType = {
    userId: number | null
    email: string | null
    login: string | null
    isAuth: boolean
    captchaUrl: string | null
}

let initialState: InitialStateType = {
    userId: null,
    email: null,
    login: null,
    isAuth: false,
    captchaUrl: null //if null then captcha is not required
};

const authReducer = (state = initialState, action: any): InitialStateType => {
    switch (action.type) {
        case SET_AUTH_USER_DATA:
        case GET_CAPTCHA_URL_SUCCESS: {
            return {
                ...state,
                ...action.payload,

            }
        }

        default:
            return state;
    }
};

type SetAuthUserDataActionPayloadType = {
    userId: number | null
    email: string | null
    login: string | null
    isAuth: boolean
}

type SetAuthUserDataActionType = {
    type: typeof SET_AUTH_USER_DATA
    payload: SetAuthUserDataActionPayloadType
}

export const setAuthUserData = (userId: number| null, email: string| null, login: string| null, isAuth: boolean): SetAuthUserDataActionType => ({
    type: SET_AUTH_USER_DATA,
    payload: {userId, email, login, isAuth}
});

type GetCaptchaUrlActionPayloadType = {
    captchaUrl: string | null
}

type GetCaptchaUrlActionType = {
    type: typeof GET_CAPTCHA_URL_SUCCESS
    payload: GetCaptchaUrlActionPayloadType
}

export const getCaptchaUrlSuccess = (captchaUrl: string| null): GetCaptchaUrlActionType => ({
    type: GET_CAPTCHA_URL_SUCCESS,
    payload: {captchaUrl}
})

export const getAuth = () => async (dispatch: any) => {
    const response = await authAPI.getAuth();
    if (response.data.resultCode === 0) {
        let {id, email, login} = response.data.data;
        dispatch(setAuthUserData(id, email, login, true))
    }
}

export const getCaptchaUrl = () => async (dispatch: any) => {
    const response = await securityAPI.getCaptcha();
    const captchaUrl = response.data.url;
    dispatch(getCaptchaUrlSuccess(captchaUrl))
}


export const logIn = (email: string, password: string, rememberMe: boolean, captcha: any) => async (dispatch: any) => {
    try {
        const response = await authAPI.logIn(email, password, rememberMe, captcha);
        if (response.data.resultCode === 0) {
            dispatch(getAuth())
        } else {
            if (response.data.resultCode === 10) {
                dispatch(getCaptchaUrl());
            }
            let message = response.data.messages.length > 0 ? response.data.messages[0] : 'Some error'
            dispatch(stopSubmit('login', {_error: message}))
        }
    } catch (error) {
        debugger;
    }
}


export const logOut = () => async (dispatch: any) => {
    const response = await authAPI.logOut();
    if (response.data.resultCode === 0) {
        dispatch(setAuthUserData(null, null, null, false))
    }
}

export default authReducer;
