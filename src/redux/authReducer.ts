import {authAPI, ResultCodeCaptchaEnum, ResultCodesEnum, securityAPI} from '../api/api'
import {ThunkAction} from 'redux-thunk'
import {AppStateType, InferActionsTypes} from './reduxStore'



export type InitialStateType = typeof initialState

let initialState = {
    userId: null as number | null,
    email: null as string | null,
    login: null as string | null,
    isAuth: false as boolean,
    captchaUrl: null as string | null //if null then captcha is not required
}

type ActionTypes = InferActionsTypes<typeof actions>

const authReducer = (state = initialState, action: ActionTypes): InitialStateType => {
    switch (action.type) {
        case 'SET_AUTH_USER_DATA':
        case 'GET_CAPTCHA_URL_SUCCESS': {
            return {
                ...state,
                ...action.payload,
            }
        }
        default:
            return state
    }
}



export const actions = {
    setAuthUserData: (userId: number | null, email: string | null, login: string | null, isAuth: boolean)=> ({
        type: 'SET_AUTH_USER_DATA',
        payload: {userId, email, login, isAuth}
    } as const),

    getCaptchaUrlSuccess: (captchaUrl: string | null)=> ({
        type: 'GET_CAPTCHA_URL_SUCCESS',
        payload: {captchaUrl}
    } as const)
}

type ThunkType = ThunkAction<Promise<void>, AppStateType, any, ActionTypes>

export const getAuth = (): ThunkType => async (dispatch) => {
    const getAuthData = await authAPI.getAuth()
    if (getAuthData.resultCode === ResultCodesEnum.Success) {
        let {id, email, login} = getAuthData.data
        dispatch(actions.setAuthUserData(id, email, login, true))
    }
}

export const getCaptchaUrl = (): ThunkType => async (dispatch) => {
    const getCaptchaData = await securityAPI.getCaptcha()
    const captchaUrl = getCaptchaData.url
    dispatch(actions.getCaptchaUrlSuccess(captchaUrl))
}


export const logIn = (email: string, password: string, rememberMe: boolean, captcha: any, setStatus: any, setSubmitting: any): ThunkType => async (dispatch) => {
    try {
        const loginData = await authAPI.logIn(email, password, rememberMe, captcha)
        if (loginData.resultCode === ResultCodesEnum.Success) {
            await dispatch(getAuth())
        } else {
            if (loginData.resultCode === ResultCodeCaptchaEnum.CaptchaIsRequired) {
                await dispatch(getCaptchaUrl())
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
    const logOutData = await authAPI.logOut()
    if (logOutData.resultCode === ResultCodesEnum.Success) {
        dispatch(actions.setAuthUserData(null, null, null, false))
    }
}

export default authReducer
