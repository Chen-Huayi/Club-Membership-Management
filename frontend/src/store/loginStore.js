import {makeAutoObservable} from "mobx";
import {firstname, http, lastname, removeToken, setValue, token} from '../tools';

class LoginStore{
    token=token || ''
    user_name=firstname+' '+lastname
    constructor() {
        makeAutoObservable(this)
    }

    login = async (values)=>{
        await http.post('/api/login', values)
            .then(response=>{
                if (response.status===1){
                    this.token=''
                }else {
                    this.token=response.token
                    this.user_name=response.firstname+' '+response.lastname
                }
                setValue(response)
            })
    }

    logOut = ()=>{
        this.token=''
        removeToken()
    }
}

export default LoginStore
