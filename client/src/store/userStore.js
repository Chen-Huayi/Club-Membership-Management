import {makeAutoObservable} from "mobx"
import {http} from "../utils"

class UserStore {
    constructor() {
        makeAutoObservable(this)
    }

    // For club member users information
    getMemberInfo = async (member_id) => await http.get(`/member/profile/${member_id}`)
    getActiveMemberList = async ({params}) => await http.get('/member/active', {params})
    getInactiveMemberList = async ({params}) => await http.get('/member/inactive', {params})

    // For club staff users information
    getStaffInfo = async (staff_id) => await http.get(`/staff/profile/${staff_id}`)
    getActiveStaffList = async ({params}) => await http.get('/staff/active', {params})
    getInactiveStaffList = async ({params}) => await http.get('/staff/inactive', {params})

    // Functional processes
    sendGroupEmail = async (values) => await http.post('/member/email/send', values)
    getNotificationEmail = async (member_id) => await http.get(`/member/email/get/${member_id}`)
    deleteNotification = async (values) => await http.put('/member/email/delete', values)
    getSendCardList = async ({params}) => await http.get('/member/card/send', {params})
    getReplaceCardList = async ({params}) => await http.get('/member/card/replace', {params})
    sendToEligibleMember = (values) => http.put('/member/card/deliver', values)

    // Membership record
    getMembershipRecord = ({params}) => http.get('/membership/record', {params})

    // Time range filter
    getNewRegisteredList = async ({params}, range) => await http.get(`/membership/registered/${range}`, {params})
    getExpiredList = async ({params}, range) => await http.get(`/membership/expired/${range}`, {params})
    getRenewedList = async ({params}, range) => await http.get(`/membership/renewed/${range}`, {params})

}

export default UserStore
