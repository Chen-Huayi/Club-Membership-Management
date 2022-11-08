import {makeAutoObservable} from "mobx";
import {token, user_id, firstname, lastname, user_role, http, setValue, removeToken} from '../utils';

class LoginStore{
    token=token || ''
    user_id=user_id
    user_name=firstname+' '+lastname
    user_role=user_role

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
                    this.user_role=value.user_role
                }
                setValue(value)
            })
            .catch(err => {
                throw Error(err)
            })
    }

    logOut = ()=>{
        this.token=''
        removeToken()
    }
}

export default LoginStore
