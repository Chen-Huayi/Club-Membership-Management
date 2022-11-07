import {makeAutoObservable} from "mobx";
import {http} from "../utils";

class UpdateStore{
    constructor() {
        makeAutoObservable(this)
    }

    updateUserInfo = async (values)=>{
        return await http.post('/api/member/updateprofile', values)
    }

    updatePassword = async (values)=>{
        return await http.post('/api/member/updatepwd', values)
    }

}

export default UpdateStore
