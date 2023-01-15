import {makeAutoObservable} from "mobx";
import {http} from "../utils";

class UpdateStore {
    constructor() {
        makeAutoObservable(this)
    }

    updateMemberInfo = async (values) => await http.put('/member/profiles', values)
    updateStaffInfo = async (values) => await http.put('/staff/profiles', values)

    updatePassword = async (values) => await http.patch('/member/password', values)
    resetPassword = async (values) => await http.put('/member/password', values)

    activateMember = async (values) => await http.put('/member/active', values)
    deactivateMember = async (values) => await http.put('/member/inactive', values)

    activateStaff = async (values) => await http.put('/staff/active', values)
    deactivateStaff = async (values) => await http.put('/staff/inactive', values)

    requestReplaceCard = (values) => http.put('/member/cards', values)

    membershipActivateRecord = (values) => http.post('/membership/record/activate', values)
    membershipDeactivateRecord = (values) => http.post('/membership/record/deactivate', values)

}

export default UpdateStore
