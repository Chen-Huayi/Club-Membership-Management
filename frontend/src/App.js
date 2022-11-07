import React from "react"
import {Route, Routes, unstable_HistoryRouter as HistoryRouter} from "react-router-dom"
import MainNavigation from "./components/Navigation/MainNavigation"
import Home from "./pages/Home"
import Signup from "./pages/Signup"
import Login from "./pages/Login"

// import Account from "./user/pages/Account";
// import InfoUpdated from "./user/pages/InfoUpdated";
// import UpdateAccInfo from "./user/pages/UpdateAccInfo";
// import DeleteAccountWarning from "./user/pages/DeleteAccountWarning";
// import AccountDeleted from "./user/pages/AccountDelected";
// import PlayDates from "./user/pages/PlayDates";
// import Matches from "./user/pages/Matches";
// import { AuthContext } from "./components/auth-context";
// import { useAuth } from "./components/auth-hook";
// import {AuthComponent} from './components/AuthComponent'
// import {useStore} from "./store";
import {history} from "./tools/history"



function App() {
    let routes = (
        <Routes>
            <Route path="/" element={<Home />} />

            {/*<Route*/}
            {/*    path="/playDates"*/}
            {/*    element={*/}
            {/*        <PlayDates API_URL={API_URL} API_URL_IMAGES={API_URL_IMAGES} />*/}
            {/*    }*/}
            {/*/>*/}

            {/*<Route path="/account" element={<Account API_URL={API_URL} />} />*/}

            {/*<Route*/}
            {/*    path="/updateAccInfo"*/}
            {/*    element={<UpdateAccInfo API_URL={API_URL} />}*/}
            {/*/>*/}

            {/*<Route*/}
            {/*    path="/matches"*/}
            {/*    element={*/}
            {/*        <Matches API_URL={API_URL} API_URL_IMAGES={API_URL_IMAGES} />*/}
            {/*    }*/}
            {/*/>*/}

            {/*<Route*/}
            {/*    path="/deleteaccountwarning"*/}
            {/*    element={<DeleteAccountWarning API_URL={API_URL} />}*/}
            {/*/>*/}

            {/*<Route path="/" element={<Home />} />*/}
        </Routes>
    )

    return (
        <HistoryRouter history={history}>
            <MainNavigation />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/login" element={<Login />} />
                {/*<Route path="/profileupdated" element={<InfoUpdated />} />*/}
                {/*<Route path="/accountdeleted" element={<AccountDeleted />} />*/}
                <Route path="/*" element={<Home />} />
            </Routes>
        </HistoryRouter>
    )
}

export default App
