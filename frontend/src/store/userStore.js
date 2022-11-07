import {makeAutoObservable} from "mobx";
import {http} from "../utils";

class UserStore {
    userInfo={}
    constructor() {
        makeAutoObservable(this)
    }

    getUserInfo = async() =>{
        this.userInfo = await http.get('/api/profile')
    }

    clearUserInfo = async() =>{
        this.userInfo = await http.put('/api/profile')
    }

}
export default UserStore
