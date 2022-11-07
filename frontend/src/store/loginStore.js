import {makeAutoObservable} from "mobx";
import {firstname, http, lastname, removeToken, setValue, token} from '../utils';

class LoginStore{
    token=token || ''
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
