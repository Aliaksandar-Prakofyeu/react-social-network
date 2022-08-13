import {authAPI, ResultCodeCaptchaEnum, ResultCodesEnum, securityAPI} from "../api/api";

import {ThunkAction} from "redux-thunk";
import {AppStateType} from "./reduxStore";
import {stopSubmit} from "redux-form";

const SET_AUTH_USER_DATA = "react-social-network/auth/SET-AUTH-USER-DATA";
const GET_CAPTCHA_URL_SUCCESS = "react-social-network/auth/GET-CAPTCHA-URL-SUCCESS"

export type InitialStateType = typeof initialState

let initialState = {
    userId: null as number | null,
    email: null as string | null,
    login: null as string | null,
    isAuth: false as boolean,
    captchaUrl: null as string | null //if null then captcha is not required
};

type ActionsType = SetAuthUserDataActionType | GetCaptchaUrlActionType

const authReducer = (state = initialState, action: ActionsType): InitialStateType => {
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
}

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

export const setAuthUserData = (userId: number | null, email: string | null, login: string | null, isAuth: boolean): SetAuthUserDataActionType => ({
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

export const getCaptchaUrlSuccess = (captchaUrl: string | null): GetCaptchaUrlActionType => ({
    type: GET_CAPTCHA_URL_SUCCESS,
    payload: {captchaUrl}
})

type ThunkType = ThunkAction<Promise<void>, AppStateType, any, ActionsType>

export const getAuth = (): ThunkType => async (dispatch) => {
    const getAuthData = await authAPI.getAuth();
    if (getAuthData.resultCode === ResultCodesEnum.Success) {
        let {id, email, login} = getAuthData.data;
        dispatch(setAuthUserData(id, email, login, true))
    }
}

export const getCaptchaUrl = (): ThunkType => async (dispatch) => {
    const getCaptchaData = await securityAPI.getCaptcha();
    const captchaUrl = getCaptchaData.url;
    dispatch(getCaptchaUrlSuccess(captchaUrl))
}


export const logIn = (email: string, password: string, rememberMe: boolean, captcha: any, setStatus: any,  setSubmitting: any): ThunkType => async (dispatch) => {
    try {
        const loginData = await authAPI.logIn(email, password, rememberMe, captcha);
        if (loginData.resultCode === ResultCodesEnum.Success) {
            dispatch(getAuth())
        } else {
            if (loginData.resultCode === ResultCodeCaptchaEnum.CaptchaIsRequired) {
                dispatch(getCaptchaUrl());
            }
            let textError = loginData.messages.length > 0 ? loginData.messages[0] : 'Some error'
            setStatus(textError)
            setSubmitting(false)
        }
    } catch (error) {
        debugger
    }
}


export const logOut = () => async (dispatch: any) => {
    const logOutData = await authAPI.logOut();
    if (logOutData.resultCode === ResultCodesEnum.Success) {
        dispatch(setAuthUserData(null, null, null, false))
    }
}

export default authReducer;
