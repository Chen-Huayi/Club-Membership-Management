import {secretKey} from '../config'

const setValue=(values)=>{
    return window.localStorage.setItem(secretKey, JSON.stringify(values))
}

const getValue=()=>{
    return window.localStorage.getItem(secretKey)
}

const removeToken=()=>{
    return window.localStorage.removeItem(secretKey)
}

const {token, user_id, firstname, lastname, user_role, membership_status} = getValue() ? JSON.parse(getValue()) : ''

export {
    token, user_id, firstname, lastname, user_role, membership_status,
    setValue, removeToken
}
