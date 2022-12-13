import {makeAutoObservable} from "mobx";
import {http} from "../utils";

class UpdateStore {
    constructor() {
        makeAutoObservable(this)
    }

    updateMemberInfo = async (values) => await http.put('/member/update-info', values)
    updateStaffInfo = async (values) => await http.put('/staff/update-info', values)

    updatePassword = async (values) => await http.put('/member/update-pwd', values)
    resetPassword = async (values) => await http.put('/member/reset-pwd', values)

    deactivateMember = async (values) => await http.put('/member/deactivate', values)
    activateMember = async (values) => await http.put('/member/activate', values)

    deactivateStaff = async (values) => await http.put('/staff/deactivate', values)
    activateStaff = async (values) => await http.put('/staff/activate', values)

    requestReplaceCard = (values) => http.put('/member/request-replace-card', values)

    membershipActivateRecord = (values) => http.post('/membership/activate-record', values)
    membershipDeactivateRecord = (values) => http.post('/membership/deactivate-record', values)

}

export default UpdateStore
