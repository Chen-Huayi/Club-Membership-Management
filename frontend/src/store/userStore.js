import {makeAutoObservable} from "mobx";
import {http} from "../utils";

class UserStore {
    userInfo={}

    constructor() {
        makeAutoObservable(this)
    }

    // getUserInfo = async(user_id) =>{
    //     return this.userInfo=await http.post('/api/member/profile', user_id)
    // }

    // Admin
    getMemberList = async ({params})=>{
        return await http.get('/api/member/list', {params})
    }

    getUserInfoBeta = async(user_id) =>{
        return await http.get(`/api/member/profile/${user_id}`)
    }

    // Admin
    removeMember = async(user_id) =>{
        return await http.get(`/api/member/delete/${user_id}`)
    }

}
export default UserStore
