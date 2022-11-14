import {makeAutoObservable} from "mobx";
import {http} from "../utils";

class UserStore {
    constructor() {
        makeAutoObservable(this)
    }

    getMemberInfo = async(member_id) => await http.get(`/api/member/profile/${member_id}`)
    getStaffInfo = async(staff_id) => await http.get(`/api/staff/profile/${staff_id}`)

    getActiveMemberList = async ({params}) => await http.get('/api/member/active-list', {params})
    getActiveStaffList = async ({params}) => await http.get('/api/staff/active-list', {params})

    getInactiveMemberList = async ({params}) => await http.get('/api/member/inactive-list', {params})
    getInactiveStaffList = async ({params}) => await http.get('/api/staff/active-list', {params})

    deactivateMember = async(member_id) => await http.get(`/api/member/deactivate/${member_id}`)
    deactivateStaff = async(staff_id) => await http.get(`/api/staff/deactivate/${staff_id}`)

    activateMember = async(member_id) => await http.get(`/api/member/activate/${member_id}`)
    activateStaff = async(staff_id) => await http.get(`/api/staff/activate/${staff_id}`)

}
export default UserStore
