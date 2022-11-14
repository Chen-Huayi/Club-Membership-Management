import {makeAutoObservable} from "mobx";
import {http} from "../utils";

class SignupStore {
    constructor() {
        makeAutoObservable(this)
    }

    signup = async (values)=>{
        return await http.post('/api/member/signup', values)
    }
}

export default SignupStore
