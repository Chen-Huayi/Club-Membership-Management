import {makeAutoObservable} from "mobx";
import {http} from "../utils";
import {HttpManager} from "../api";

class UpdateStore {
    constructor() {
        makeAutoObservable(this)
    }

    updateMemberInfo = async (values) => await http.put(HttpManager.memberProfile_url, values)
    updateStaffInfo = async (values) => await http.put(HttpManager.staffProfile_url, values)

    updatePassword = async (values) => await http.patch(HttpManager.memberPassword_url, values)
    resetPassword = async (values) => await http.put(HttpManager.memberPassword_url, values)

    activateMember = async (values) => await http.put(HttpManager.activeMember_url, values)
    deactivateMember = async (values) => await http.put(HttpManager.inactiveMember_url, values)

    activateStaff = async (values) => await http.put(HttpManager.activeStaff_url, values)
    deactivateStaff = async (values) => await http.put(HttpManager.inactiveStaff_url, values)

    requestReplaceCard = (values) => http.put(HttpManager.memberCard_url, values)

    membershipActivateRecord = (values) => http.post(`${HttpManager.membershipRecord_url}/activate`, values)
    membershipDeactivateRecord = (values) => http.post(`${HttpManager.membershipRecord_url}/deactivate`, values)

}

export default UpdateStore
