import React from "react"
import SignupStore from './signupStore';
import LoginStore from './loginStore'
import UpdateStore from './updateStore'
import MemberStore from './memberStore'

class RootStore {
    constructor() {
        this.signupStore = new SignupStore()
        this.loginStore = new LoginStore()
        this.updateStore = new UpdateStore()
        this.memberStore = new MemberStore()
    }
}

const StoresContext = React.createContext(new RootStore())
export const useStore = () => React.useContext(StoresContext)
