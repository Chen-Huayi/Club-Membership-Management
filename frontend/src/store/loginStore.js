import {makeAutoObservable} from "mobx";
import {token, member_id, staff_id, firstname, lastname, user_role, membership_status,  http, setValue, removeToken} from '../utils';

class LoginStore{
    token=token || ''
    member_id=member_id
    firstname=firstname
    lastname=lastname
    user_role=user_role
    membership_status=membership_status

    staff_id=staff_id

    constructor() {
        makeAutoObservable(this)
    }

    checkAccountLocked= async (values)=>{
        return await http.post('/api/login-checked', values)
    }

    memberLogin = async (values)=>{
        await http.post('/api/member/login', values)
            .then(result=>{
                if (result.status===1){
                    this.token=''
                }else {
                    this.token=result.token
                    this.member_id=result.member_id
                    this.firstname=result.firstname
                    this.lastname=result.lastname
                    this.user_role=result.user_role
                    this.membership_status=result.membership_status
                }
                setValue(result)
            })
            .catch(err => {
                throw Error(err)
            })
    }

    staffLogin=async(values)=>{
        await http.post('/api/staff/login', values)
            .then(result =>{
                if (result.status===1){
                    this.token=''
                }else {
                    this.token=result.token
                    this.staff_id=result.staff_id
                    this.firstname=result.firstname
                    this.lastname=result.lastname
                    this.user_role=result.user_role
                    this.membership_status=result.membership_status
                }
                setValue(result)
            })
            .catch(err=>{
                throw Error(err)
            })
    }

    logout = ()=>{
        this.token=''
        removeToken()
    }
}

export default LoginStore
