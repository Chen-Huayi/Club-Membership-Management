import {makeAutoObservable} from "mobx"
import {http} from "../utils"
import {HttpManager} from "../api";

class UserStore {
    constructor() {
        makeAutoObservable(this)
    }

    // For club member users information
    getMemberInfo = async (member_id) => await http.get(`${HttpManager.memberProfile_url}/${member_id}`)
    getActiveMemberList = async ({params}) => await http.get(HttpManager.activeMember_url, {params})
    getInactiveMemberList = async ({params}) => await http.get(HttpManager.inactiveMember_url, {params})

    // For club staff users information
    getStaffInfo = async (staff_id) => await http.get(`${HttpManager.staffProfile_url}/${staff_id}`)
    getActiveStaffList = async ({params}) => await http.get(HttpManager.activeStaff_url, {params})
    getInactiveStaffList = async ({params}) => await http.get(HttpManager.inactiveStaff_url, {params})

    // Functional processes
    sendGroupEmail = async (values) => await http.post(HttpManager.memberEmail_url, values)
    getNotificationEmail = async (member_id) => await http.get(`${HttpManager.memberEmail_url}/${member_id}`)
    deleteNotification = async (values) => await http.put(HttpManager.memberEmail_url, values)

    getSendCardList = async ({params}) => await http.get(`${HttpManager.memberCard_url}/send`, {params})
    getReplaceCardList = async ({params}) => await http.get(`${HttpManager.memberCard_url}/replace`, {params})
    sendToEligibleMember = (values) => http.patch(HttpManager.memberCard_url, values)

    // Membership record
    getMembershipRecord = ({params}) => http.get(HttpManager.membershipRecord_url, {params})

    // Time range filter
    getNewRegisteredList = async ({params}, range) => await http.get(`/membership/registered/${range}`, {params})
    getExpiredList = async ({params}, range) => await http.get(`/membership/expired/${range}`, {params})
    getRenewedList = async ({params}, range) => await http.get(`/membership/renewed/${range}`, {params})

}

export default UserStore
