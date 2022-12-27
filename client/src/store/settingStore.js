import {makeAutoObservable} from "mobx";
import {http} from "../utils";

class SettingStore {
    constructor() {
        makeAutoObservable(this)
    }

    updateMembershipFee = async (values) => await http.put('/fee/change', values)

    getMembershipFee = async () => await http.get('/fee/get')

}

export default SettingStore
