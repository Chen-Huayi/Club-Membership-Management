import {makeAutoObservable} from "mobx";
import {http} from "../utils";
import {HttpManager} from "../api";

class SignupStore {
    constructor() {
        makeAutoObservable(this)
    }

    memberSignup = async (values) => await http.post(`${HttpManager.signup_url}/member`, values)

    staffSignup = async (values) => await http.post(`${HttpManager.signup_url}/staff`, values)

}

export default SignupStore
