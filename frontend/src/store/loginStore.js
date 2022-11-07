import {makeAutoObservable} from "mobx";
import {token, user_id, firstname, lastname, http, setValue, removeToken} from '../utils';

class LoginStore{
    token=token || ''
    user_id=user_id
    user_name=firstname+' '+lastname
    constructor() {
        makeAutoObservable(this)
    }

    login = async (values)=>{
        await http.post('/api/login', values)
            .then(value=>{
                if (value.status===1){
                    this.token=''
                }else {
                    this.token=value.token
                    this.user_id=value.user_id
                    this.user_name=value.firstname+' '+value.lastname
                }
                setValue(value)
            })
    }

    logOut = ()=>{
        this.token=''
        removeToken()
    }
}

export default LoginStore
