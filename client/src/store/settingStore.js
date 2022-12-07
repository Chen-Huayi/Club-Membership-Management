import {makeAutoObservable} from "mobx";
import {http} from "../utils";

class SettingStore {
    constructor() {
        makeAutoObservable(this)
    }

    updateMembershipFee = async (values)=> await http.put('/fee/change-fee', values)

    getMembershipFee = async () => await http.get('/fee/get-fee')

}

export default SettingStore
