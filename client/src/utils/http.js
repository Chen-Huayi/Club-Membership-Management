import axios from "axios"
import {token, removeToken} from "./token"
import {history} from "./history"
import {port} from "../config"

const http = axios.create({
    baseURL: `http://localhost:${port}`,
    timeout: 5000
})

/* Add request interceptors */
http.interceptors.request.use((config)=> {
    if (token) {  // Set headers
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
}, (error)=> {
    return Promise.reject(error)
})

/* Add response interceptors */
http.interceptors.response.use((response)=> {
    // This function is triggered for any status code between 200 and 300 (code>=200 && code<300)
    // If token is expired, sent by code 401, then remove the token
    if (response.data.status===401){
        removeToken()
    }
    return response.data
}, (error)=> {
    // Triggered for any status code >=300 range
    if (error.response.status===401){
        history.push('/login')
    }
    return Promise.reject(error)
})

export { http }
