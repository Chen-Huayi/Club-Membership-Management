import {makeAutoObservable} from "mobx";
import {http} from "../tools";

class SignupStore {
    constructor() {
        makeAutoObservable(this)
    }

    signup = async (values)=>{
        return await http.post('/api/signup', values)
    }
}

export default SignupStore
