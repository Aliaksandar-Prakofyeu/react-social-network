import {UserType} from "../Types/types";

export type ApiResponseType<Data = {}, ResultCode = ResultCodesEnum> = {
    resultCode: ResultCode
    messages: Array<string>
    data: Data
}

export enum ResultCodesEnum {
    Success = 0,
    Error = 1
}
export enum ResultCodeCaptchaEnum {
    CaptchaIsRequired = 10
}

export type GetCaptchaResponseType = {
    url: string
}

export type GetAuthResponseType = {
    data: {
        id: number
        email: string
        login: string
    }
    resultCode: ResultCodesEnum
    messages: Array<string>
}
export type LogInResponseType = {
    resultCode: ResultCodesEnum | ResultCodeCaptchaEnum
    messages: Array<string>
    data: { userid: number }
}


export type GetUsersResponseType = {
    items: Array<UserType>
    totalCount: number
    error: string | null
}