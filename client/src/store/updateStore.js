import {makeAutoObservable} from "mobx";
import {http} from "../utils";

class UpdateStore {
    constructor() {
        makeAutoObservable(this)
    }

    updateMemberInfo = async (values) => await http.put('/member/profile/update', values)
    updateStaffInfo = async (values) => await http.put('/staff/profile/update', values)

    updatePassword = async (values) => await http.put('/member/pw/update', values)
    resetPassword = async (values) => await http.put('/member/pw/reset', values)

    deactivateMember = async (values) => await http.put('/member/deactivate', values)
    activateMember = async (values) => await http.put('/member/activate', values)

    deactivateStaff = async (values) => await http.put('/staff/deactivate', values)
    activateStaff = async (values) => await http.put('/staff/activate', values)

    requestReplaceCard = (values) => http.put('/member/card/request', values)

    membershipActivateRecord = (values) => http.post('/membership/record/activate', values)
    membershipDeactivateRecord = (values) => http.post('/membership/record/deactivate', values)

}

export default UpdateStore
