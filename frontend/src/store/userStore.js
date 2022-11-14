import {makeAutoObservable} from "mobx";
import {http} from "../utils";

class UserStore {
    constructor() {
        makeAutoObservable(this)
    }

    getMemberInfo = async(member_id) =>{
        return await http.get(`/api/member/profile/${member_id}`)
    }
    getStaffInfo = async(staff_id) =>{
        return await http.get(`/api/staff/profile/${staff_id}`)
    }
    // Admin use
    getActiveList = async ({params})=>{
        return await http.get('/api/member/active-list', {params})
    }
    // Admin use
    getInactiveList = async ({params})=>{
        return await http.get('/api/member/inactive-list', {params})
    }
    // Admin use
    deactivateMember = async(member_id) =>{
        return await http.get(`/api/member/deactivate/${member_id}`)
    }
    // Admin use
    activateMember = async(member_id) =>{
        return await http.get(`/api/member/activate/${member_id}`)
    }

}
export default UserStore
