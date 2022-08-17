import axios from 'axios'

export const instance = axios.create({
    withCredentials: true,
    baseURL: `https://social-network.samuraijs.com/api/1.0/`,
    headers: {'API-KEY': '134f5454-c2c5-408a-8c98-72cb0999cc31'}
})

