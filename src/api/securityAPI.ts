import {instance} from './api'
import {GetCaptchaResponseType} from './apiTypes'


export const securityAPI = {
    getCaptcha() {
        return instance.get<GetCaptchaResponseType>(`security/get-captcha-url`).then(res => res.data)
    }
}