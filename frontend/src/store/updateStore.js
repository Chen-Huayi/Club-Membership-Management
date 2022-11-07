import {makeAutoObservable} from "mobx";
import {http} from "../tools";

class UpdateStore{
    updateForm = {}
    constructor() {
        makeAutoObservable(this)
    }

    updateUserInfo = async (values)=>{
        this.updateForm = await http.post('/api/updateinfo', values)
    }

    updatePassword = async (values)=>{
        this.updateForm = await http.post('/api/updatepwd', values)
    }

}

export default UpdateStore
