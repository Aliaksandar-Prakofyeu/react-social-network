import {instance} from './api'
import {ApiResponseType, GetUsersResponseType} from './apiTypes'


export const usersAPI = {
    getUsers(currentPage = 1, pageSize = 10, term: string = '', friend: null | boolean = null) {

        const urlQuery = `users?page=${currentPage}&count=${pageSize}`
            + (term === '' ? '' : `&term=${term}`)
            + (friend === null ? '' : `&friend=${friend}`)

        return instance.get<GetUsersResponseType>(urlQuery)
            .then(res => res.data)
    },
    follow(userId: number) {
        return instance.post<ApiResponseType>(`follow/${userId}`).then(res => res.data)
    },
    unfollow(userId: number) {
        return instance.delete<ApiResponseType>(`follow/${userId}`).then(res => res.data)
    }
}