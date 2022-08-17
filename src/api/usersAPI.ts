import {instance} from "./api";
import {ApiResponseType, GetUsersResponseType} from "./apiTypes";


export const usersAPI = {
    getUsers(currentPage = 1, pageSize = 10) {
        return instance.get<GetUsersResponseType>(`users?page=${currentPage}&count=${pageSize}`,
            {
                withCredentials: true
            })
            .then(res => res.data)
    },
    follow(userId: number) {
        return instance.post<ApiResponseType>(`follow/${userId}`).then(res => res.data)
    },
    unfollow(userId: number) {
        return instance.delete<ApiResponseType>(`follow/${userId}`).then(res => res.data)
    }
}