import {makeAutoObservable} from "mobx";
import {http} from "../utils";

class SettingStore {
    constructor() {
        makeAutoObservable(this)
    }

    updateMembershipFee = async (values)=> await http.put('/api/annual-fee', values)

    getMembershipFee = async ()=>await http.get('/api/annual-fee')

}

export default SettingStore
