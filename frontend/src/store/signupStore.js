import {makeAutoObservable} from "mobx";
import {http} from "../utils";

class SignupStore {
    constructor() {
        makeAutoObservable(this)
    }

    signup = async (values)=>{
        return await http.post('/api/signup', values)
    }
}

export default SignupStore
