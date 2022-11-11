import {makeAutoObservable} from "mobx";
import {http} from "../utils";

class UpdateStore{
    constructor() {
        makeAutoObservable(this)
    }

    updateInfoByMember = async (values)=>{
        return await http.put('/api/member/update-info-by-member', values)
    }

    updatePassword = async (values)=>{
        return await http.put('/api/member/update-pwd', values)
    }

    // Admin use
    updateInfoByAdmin = async (values)=>{
        return await http.put('/api/member/update-info-by-admin', values)
    }

}

export default UpdateStore
