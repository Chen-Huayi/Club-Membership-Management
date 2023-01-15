import {makeAutoObservable} from "mobx";
import {http} from "../utils";

class SettingStore {
    constructor() {
        makeAutoObservable(this)
    }

    updateMembershipFee = async (values) => await http.put('/fee', values)

    getMembershipFee = async () => await http.get('/fee')

}

export default SettingStore
