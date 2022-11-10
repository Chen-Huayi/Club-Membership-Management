import {makeAutoObservable} from "mobx";
import {http} from "../utils";

class UpdateStore{
    constructor() {
        makeAutoObservable(this)
    }

    updateSingleAttribute = async (values)=>{
        return await http.post('/api/member/update-single-profile', values)
    }

    updateUserInfo = async (values)=>{
        return await http.post('/api/member/update-profile', values)
    }

    updatePassword = async (values)=>{
        return await http.post('/api/member/update-pwd', values)
    }

}

export default UpdateStore
