import {makeAutoObservable} from "mobx";
import {http} from "../utils";

class UpdateStore{
    constructor() {
        makeAutoObservable(this)
    }

    updateInfoByMember = async (values)=>{
        return await http.post('/api/member/update-single-profile', values)
    }

    updatePassword = async (values)=>{
        return await http.post('/api/member/update-pwd', values)
    }

    // Admin
    updateInfoByAdmin = async (values)=>{
        return await http.put('/api/member/update-profile', values)
    }

}

export default UpdateStore
