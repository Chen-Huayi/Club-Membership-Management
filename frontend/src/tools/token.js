const key='user-data'

const setValue=(values)=>{
    return window.localStorage.setItem(key, JSON.stringify(values))
}

const getValue=()=>{
    return window.localStorage.getItem(key)
}

const removeToken=()=>{
    return window.localStorage.removeItem(key)
}

const {token, user_id, firstname, lastname} = getValue() ? JSON.parse(getValue()) : ''

export {
    token, user_id, firstname, lastname,
    setValue, removeToken
}
