import {makeAutoObservable} from "mobx";
import {token, member_id, firstname, user_role, membership_status,  http, setValue, removeToken} from '../utils';

class LoginStore{
    token=token || ''
    member_id=member_id
    firstname=firstname
    user_role=user_role
    membership_status=membership_status

    constructor() {
        makeAutoObservable(this)
    }

    checkLocked= async (values)=>{
        return await http.post('/api/login-checked', values)
    }

    login = async (values)=>{
        await http.post('/api/login', values)
            .then(value=>{
                if (value.status===1){
                    this.token=''
                }else {
                    this.token=value.token
                    this.member_id=value.member_id
                    this.firstname=value.firstname
                    this.user_role=value.user_role
                    this.membership_status=value.membership_status
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
