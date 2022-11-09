import {makeAutoObservable} from "mobx";
import {http} from "../utils";

class UserStore {
    userInfo
    constructor() {
        makeAutoObservable(this)
    }

    getUserInfo = async(user_id) =>{
        return await http.post('/api/member/profile', user_id)
    }

    clearUserInfo = async() =>{
        this.userInfo = await http.put('/api/profile')
    }

}
export default UserStore
