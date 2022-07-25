import * as axios from "axios";

const instance = axios.create({
    withCredentials: true,
    baseURL: `https://social-network.samuraijs.com/api/1.0/`,
    headers: {"API-KEY": "134f5454-c2c5-408a-8c98-72cb0999cc31"}
})
export const usersAPI = {
    getUsers(currentPage = 1, pageSize = 10) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`,
            {
                withCredentials: true
            })
            .then(response => {
                return response.data
            });
    },
    follow(id){
        return instance.post(`follow/${id}`)
            .then(response => {
                return response.data
            })
    },
    unfollow(id){
        return instance.delete(`follow/${id}`)
            .then(response => {
                return response.data
            })
    }
}

export const authAPI = {
    getAuth(){
        return instance.get(`auth/me`)
    },
    logIn(email, password, rememberMe= false, captcha= null){
        return instance.post(`auth/login`, {email, password, rememberMe, captcha})
    },
    logOut(){
        return instance.delete(`auth/login`)
    }
}

export const securityAPI = {
    getCaptcha(){
        return instance.get(`security/get-captcha-url`)
    }
}

export const profileAPI = {
    getProfile(userId){
        return instance.get(`profile/`+userId)
    },
    getStatus(userId){
        return instance.get(`profile/status/`+userId)
    },
    updateStatus(status){
        return instance.put(`/profile/status`, {status} )
    },
    updatePhoto(photo){
        const formData = new FormData();
        formData.append("image", photo)
        return instance.put('profile/photo',formData, {
            headers: {
                'Content-type': 'multipart/form-data'
            }
        })
    },
    updateProfile(formData){
        return instance.put(`profile`, formData)
    }
}

