import {makeAutoObservable} from "mobx";
import {http} from "../utils";

class UpdateStore{
    constructor() {
        makeAutoObservable(this)
    }

    updateMemberInfo = async (values) => await http.put('/api/member/update-info', values)

    updateStaffInfo = async (values) => await http.put('/api/staff/update-info', values)

    updatePassword = async (values) => await http.put('/api/member/update-pwd', values)

    resetPassword = async (values) => await http.put('/api/member/reset-pwd', values)

    deactivateMember = async (values) => await http.put('/api/member/deactivate', values)

    activateMember = async (values) => await http.put('/api/member/activate', values)

    deactivateStaff = async(values) => await http.put('/api/staff/deactivate', values)

    activateStaff = async(values) => await http.put('/api/staff/activate', values)

    requestReplaceCard = (values) => http.put('/api/member/request-replace-card', values)

}

export default UpdateStore
