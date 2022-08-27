import {PhotosType, ProfileType} from '../Types/types'
import {instance} from './api'
import {ApiResponseType} from './apiTypes'

export const profileAPI = {
    getProfile(userId: number) {
        return instance.get<ProfileType>(`profile/` + userId).then(res => res.data)
    },
    getStatus(userId: number) {
        return instance.get<string>(`profile/status/` + userId).then(res => res.data)
    },
    updateStatus(status: string) {
        return instance.put<ApiResponseType>(`/profile/status`, {status}).then(res => res.data)
    },
    updatePhoto(photo: any) {
        const formData = new FormData()
        formData.append('image', photo)
        return instance.put<ApiResponseType<{ photos: PhotosType }>>('profile/photo', formData, {
            headers: {
                'Content-type': 'multipart/form-data'
            }
        }).then(res => res.data)
    },
    updateProfile(formData: ProfileType) {
        return instance.put<ApiResponseType>(`profile`, formData).then(res => res.data)
    }
}