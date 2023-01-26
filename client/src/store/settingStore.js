import {makeAutoObservable} from "mobx";
import {http} from "../utils";
import {HttpManager} from "../api";

class SettingStore {
    constructor() {
        makeAutoObservable(this)
    }

    updateMembershipFee = async (values) => await http.put(HttpManager.membershipFee_url, values)

    getMembershipFee = async () => await http.get(HttpManager.membershipFee_url)

}

export default SettingStore
