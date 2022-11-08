import {makeAutoObservable} from "mobx";
import {http} from "../utils";

class UserStore {
    userInfo
    constructor() {
        makeAutoObservable(this)
    }

    getUserInfo = async(user_id) =>{
        console.log(user_id)
        const result=await http.get('/api/member/list', user_id)
        // this.userInfo=await http.get('/api/member/profile', user_id)
        console.log(result)
        return result
        // return await http.get('/api/member/profile', user_id)
    }

    clearUserInfo = async() =>{
        this.userInfo = await http.put('/api/profile')
    }

}
export default UserStore
