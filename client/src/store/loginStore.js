import {makeAutoObservable} from "mobx";
import {
    expire_date,
    firstname,
    http,
    lastname,
    member_id,
    membership_status,
    removeToken,
    setValue,
    staff_id,
    token,
    user_role
} from '../utils';
import {HttpManager} from "../api";


class LoginStore {
    // Some data of user information when user login
    token = token || ''
    member_id = member_id
    firstname = firstname
    lastname = lastname
    user_role = user_role
    membership_status = membership_status
    expire_date = expire_date
    staff_id = staff_id

    constructor() {
        makeAutoObservable(this)
    }

    checkAccountLocked = async (values) => {
        return await http.post(`${HttpManager.login_url}/checked`, values)
    }

    memberLogin = async (values) => {
        await http.post(`${HttpManager.login_url}/member`, values)
            .then(result => {
                if (result.status === 1) {
                    this.token = ''
                } else {
                    this.token = result.token
                    this.member_id = result.member_id
                    this.firstname = result.firstname
                    this.lastname = result.lastname
                    this.user_role = result.user_role
                    this.membership_status = result.membership_status
                    this.expire_date = result.expire_date
                }
                setValue(result)
            })
            .catch(err => {
                throw Error(err)
            })
    }

    staffLogin = async (values) => {
        await http.post(`${HttpManager.login_url}/staff`, values)
            .then(result => {
                if (result.status === 1) {
                    this.token = ''
                } else {
                    this.token = result.token
                    this.staff_id = result.staff_id
                    this.firstname = result.firstname
                    this.lastname = result.lastname
                    this.user_role = result.user_role
                    this.membership_status = result.membership_status
                }
                setValue(result)
            })
            .catch(err => {
                throw Error(err)
            })
    }

    logout = () => {
        this.token = ''
        removeToken()
    }
}

export default LoginStore
