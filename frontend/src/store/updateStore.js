import {makeAutoObservable} from "mobx";
import {http} from "../utils";

class UpdateStore{
    constructor() {
        makeAutoObservable(this)
    }

    updateMemberInfo = async (values)=>{
        return await http.put('/api/member/update-info', values)
    }

    updatePassword = async (values)=>{
        return await http.put('/api/member/update-pwd', values)
    }

}

export default UpdateStore
