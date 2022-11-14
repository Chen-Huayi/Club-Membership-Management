import {makeAutoObservable} from "mobx";
import {http} from "../utils";

class UserStore {
    constructor() {
        makeAutoObservable(this)
    }

    getMemberInfo = async (member_id) => await http.get(`/api/member/profile/${member_id}`)
    getStaffInfo = async (staff_id) => await http.get(`/api/staff/profile/${staff_id}`)

    getActiveMemberList = async ({params}) => await http.get('/api/member/active-list', {params})
    // getActiveStaffList = async ({params}) => await http.get('/api/staff/active-list', {params})

    getInactiveMemberList = async ({params}) => await http.get('/api/member/inactive-list', {params})
    // getInactiveStaffList = async ({params}) => await http.get('/api/staff/active-list', {params})

    deactivateMember = async (values) => await http.put('/api/member/deactivate', values)
    // deactivateStaff = async(values) => await http.put('/api/staff/deactivate', values)

    activateMember = async (values) => await http.put('/api/member/activate', values)
    // activateStaff = async(values) => await http.put('/api/staff/activate', values)

}
export default UserStore
