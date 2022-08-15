import axios from 'axios'
import {PhotosType, ProfileType, UserType} from '../Types/types'

const instance = axios.create({
    withCredentials: true,
    baseURL: `https://social-network.samuraijs.com/api/1.0/`,
    headers: {'API-KEY': '134f5454-c2c5-408a-8c98-72cb0999cc31'}
})

export enum ResultCodesEnum {
    Success = 0,
    Error = 1
}
export enum ResultCodeCaptchaEnum {
    CaptchaIsRequired = 10
}

type ApiStatusResponse<Data={}, ResultCode = ResultCodesEnum > = {
    resultCode: ResultCode
    messages: Array<string>
    data: Data
}

type getAuthResponseType = {
    data: {
        id: number
        email: string
        login: string
    }
    resultCode: ResultCodesEnum
    messages: Array<string>
}

type LogInResponseType = {
    resultCode: ResultCodesEnum | ResultCodeCaptchaEnum
    messages: Array<string>
    data: {userid: number}
}

type GetCaptchaResponseType = {
    url: string
}

type GetUsersResponseType = {
    items: Array<UserType>
    totalCount: number
    error: string
}

export const usersAPI = {
    getUsers(currentPage = 1, pageSize = 10) {
        return instance.get<GetUsersResponseType>(`users?page=${currentPage}&count=${pageSize}`,
            {
                withCredentials: true
            })
            .then(res => res.data)
    },
    follow(userId: number) {
        return instance.post<ApiStatusResponse>(`follow/${userId}`).then(res => res.data)
    },
    unfollow(userId: number) {
        return instance.delete<ApiStatusResponse>(`follow/${userId}`).then(res => res.data)
    }
}

export const authAPI = {
    getAuth() {
        return instance.get<getAuthResponseType>(`auth/me`).then(res => res.data)
    },
    logIn(email: string, password: string, rememberMe = false, captcha: null | string = null) {
        return instance.post<LogInResponseType>(`auth/login`, {email, password, rememberMe, captcha}).then(res => res.data)
    },
    logOut() {
        return instance.delete<ApiStatusResponse>(`auth/login`).then(res => res.data)
    }
}

export const securityAPI = {
    getCaptcha() {
        return instance.get<GetCaptchaResponseType>(`security/get-captcha-url`).then(res => res.data)
    }
}

export const profileAPI = {
    getProfile(userId: number) {
        return instance.get<ProfileType>(`profile/` + userId).then(res => res.data)
    },
    getStatus(userId: number) {
        return instance.get<string>(`profile/status/` + userId).then(res => res.data)
    },
    updateStatus(status: string) {
        return instance.put<ApiStatusResponse>(`/profile/status`, {status}).then(res => res.data)
    },
    updatePhoto(photo: any) {
        const formData = new FormData()
        formData.append('image', photo)
        return instance.put<ApiStatusResponse<{photos: PhotosType}>>('profile/photo', formData, {
            headers: {
                'Content-type': 'multipart/form-data'
            }
        }).then(res => res.data)
    },
    updateProfile(formData: ProfileType) {
        return instance.put<ApiStatusResponse>(`profile`, formData).then(res => res.data)
    }
}

