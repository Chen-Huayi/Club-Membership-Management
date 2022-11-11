import {makeAutoObservable} from "mobx";
import {http} from "../utils";

class UserStore {
    constructor() {
        makeAutoObservable(this)
    }

    getUserInfo = async(user_id) =>{
        return await http.get(`/api/member/profile/${user_id}`)
    }

    // Admin use
    getMemberList = async ({params})=>{
        return await http.get('/api/member/list', {params})
    }

    // Admin use
    removeMember = async(user_id) =>{
        return await http.get(`/api/member/delete/${user_id}`)
    }

}
export default UserStore
