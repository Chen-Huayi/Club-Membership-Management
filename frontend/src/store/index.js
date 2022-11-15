import React from "react"
import SignupStore from './signupStore';
import LoginStore from './loginStore'
import UpdateStore from './updateStore'
import UserStore from './userStore'
import SettingStore from "./settingStore";

class RootStore {
    constructor() {
        this.signupStore = new SignupStore()
        this.loginStore = new LoginStore()
        this.updateStore = new UpdateStore()
        this.userStore = new UserStore()
        this.settingStore = new SettingStore()
    }
}

const StoresContext = React.createContext(new RootStore())
export const useStore = () => React.useContext(StoresContext)
