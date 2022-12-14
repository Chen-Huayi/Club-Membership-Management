import {makeAutoObservable} from "mobx";
import {http} from "../utils";

class SignupStore {
    constructor() {
        makeAutoObservable(this)
    }

    memberSignup = async (values) => await http.post('/api/member/signup', values)

    staffSignup = async (values) => await http.post('/api/staff/signup', values)

}

export default SignupStore
