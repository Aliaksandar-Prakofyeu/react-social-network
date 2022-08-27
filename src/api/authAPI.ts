import {instance} from './api'
import {ApiResponseType, GetAuthResponseType, LogInResponseType} from './apiTypes'


export const authAPI = {
    getAuth() {
        return instance.get<GetAuthResponseType>(`auth/me`).then(res => res.data)
    },
    logIn(email: string, password: string, rememberMe = false, captcha: null | string = null) {
        return instance.post<LogInResponseType>(`auth/login`, {
            email,
            password,
            rememberMe,
            captcha
        }).then(res => res.data)
    },
    logOut() {
        return instance.delete<ApiResponseType>(`auth/login`).then(res => res.data)
    }
}