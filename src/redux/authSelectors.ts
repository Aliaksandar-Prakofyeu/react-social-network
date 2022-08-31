import {AppStateType} from './reduxStore'

export const getCaptchaUrl = (state: AppStateType) => {
    return state.auth.captchaUrl
}

export const getAuth = (state: AppStateType) => {
    return state.auth.isAuth
}