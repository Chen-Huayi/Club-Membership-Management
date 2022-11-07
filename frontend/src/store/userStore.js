import {makeAutoObservable} from "mobx";
import {http} from "../tools";

class UserStore {
    userInfo={}
    constructor() {
        makeAutoObservable(this)
    }

    getUserInfo = async() =>{
        // const res = await http.get('http://geek.itheima.net/v1_0/user/profile')
        // this.userInfo = res.data
        this.userInfo = await http.get('/api/profile')
    }

    clearUserInfo = async() =>{
        this.userInfo = await http.put('/api/profile')
    }

}
export default UserStore
