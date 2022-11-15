import {makeAutoObservable} from "mobx";
import {http} from "../utils";

class UserStore {
    constructor() {
        makeAutoObservable(this)
    }

    // For club members
    getMemberInfo = async (member_id) => await http.get(`/api/member/profile/${member_id}`)
    getActiveMemberList = async ({params}) => await http.get('/api/member/active-list', {params})
    getInactiveMemberList = async ({params}) => await http.get('/api/member/inactive-list', {params})

    deactivateMember = async (values) => await http.put('/api/member/deactivate', values)
    activateMember = async (values) => await http.put('/api/member/activate', values)

    sendGroupEmail = async (values) => await http.post('/api/member/send-email', values)
    getNotificationEmail = async (member_id) => await http.get(`/api/member/receive-email/${member_id}`)
    deleteNotification = async (values) => await http.put('/api/member/delete-email', values)

    // For club staffs
    getStaffInfo = async (staff_id) => await http.get(`/api/staff/profile/${staff_id}`)
    // getActiveStaffList = async ({params}) => await http.get('/api/staff/active-list', {params})
    // getInactiveStaffList = async ({params}) => await http.get('/api/staff/active-list', {params})
    //
    // deactivateStaff = async(values) => await http.put('/api/staff/deactivate', values)
    // activateStaff = async(values) => await http.put('/api/staff/activate', values)


}
export default UserStore
