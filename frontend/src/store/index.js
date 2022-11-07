import React from "react"
import LoginStore from './loginStore'
import UserStore from './userStore'
import SignupStore from './signupStore';
import UpdateStore from './updateStore'

class RootStore {
    constructor() {
        this.signupStore = new SignupStore()
        this.loginStore = new LoginStore()
        this.userStore = new UserStore()
        this.updateStore = new UpdateStore()
    }
}

const StoresContext = React.createContext(new RootStore())
export const useStore = () => React.useContext(StoresContext)
