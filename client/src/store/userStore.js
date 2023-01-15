import {makeAutoObservable} from "mobx"
import {http} from "../utils"

class UserStore {
    constructor() {
        makeAutoObservable(this)
    }

    // For club member users information
    getMemberInfo = async (member_id) => await http.get(`/member/profiles/${member_id}`)
    getActiveMemberList = async ({params}) => await http.get('/member/active', {params})
    getInactiveMemberList = async ({params}) => await http.get('/member/inactive', {params})

    // For club staff users information
    getStaffInfo = async (staff_id) => await http.get(`/staff/profiles/${staff_id}`)
    getActiveStaffList = async ({params}) => await http.get('/staff/active', {params})
    getInactiveStaffList = async ({params}) => await http.get('/staff/inactive', {params})

    // Functional processes
    sendGroupEmail = async (values) => await http.post('/member/emails', values)
    getNotificationEmail = async (member_id) => await http.get(`/member/emails/${member_id}`)
    deleteNotification = async (values) => await http.put('/member/emails', values)

    getSendCardList = async ({params}) => await http.get('/member/cards/send', {params})
    getReplaceCardList = async ({params}) => await http.get('/member/cards/replace', {params})
    sendToEligibleMember = (values) => http.patch('/member/cards', values)

    // Membership record
    getMembershipRecord = ({params}) => http.get('/membership/record', {params})

    // Time range filter
    getNewRegisteredList = async ({params}, range) => await http.get(`/membership/registered/${range}`, {params})
    getExpiredList = async ({params}, range) => await http.get(`/membership/expired/${range}`, {params})
    getRenewedList = async ({params}, range) => await http.get(`/membership/renewed/${range}`, {params})

}

export default UserStore
