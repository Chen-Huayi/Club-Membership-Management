import axios from "axios"
import {token} from "./token"
import {history} from "./history"
import {PORT} from "../config"

const http = axios.create({
    baseURL: `http://localhost:${PORT}`,
    timeout: 3000
})

// Add request interceptors
http.interceptors.request.use((config)=> {
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
}, (error)=> {
    return Promise.reject(error)
})

// Add response interceptors
http.interceptors.response.use((response)=> {
    // This function is triggered for any status code between 200 and 300 (code>=200 && code<300)
    return response.data
}, (error)=> {
    // Triggered for any status code outside the 299 range
    if (error.response.status===401){
        history.push('/login')
    }
    return Promise.reject(error)
})

export { http }
