import React from "react"
import {Route, Routes, unstable_HistoryRouter as HistoryRouter} from "react-router-dom"
import Signup from "./pages/Signup"
import Login from "./pages/Login"
import Home from "./pages/Home"
import {history} from "./utils/history"
import Profile from "./pages/Profile";
import MyLayout from "./pages/Layout";
import {AuthComponent} from "./components/AuthComponent";
import Article from "./pages/article";
import UpdateProfile from "./pages/UpdateProfile";
import Settings from "./pages/Settings";
import Membership from "./pages/Membership";
import NotFound404 from "./pages/404";


export default function App() {
    return (
        <HistoryRouter history={history}>
            <Routes>
                <Route path="/" element={
                    <AuthComponent>
                        <MyLayout />
                    </AuthComponent>
                }>
                    <Route index element={<Home />} />
                    <Route path="profile" element={<Profile />} />
                    <Route path="settings" element={<Settings />}/>
                    <Route path="membership" element={<Membership />}></Route>
                    <Route path="article" element={<Article />} />
                    <Route path="update-profile" element={<UpdateProfile />} />
                    <Route path="/*" element={<NotFound404/>}></Route>
                </Route>
                <Route path="/signup" element={<Signup />} />
                <Route path="/login" element={<Login />} />
                {/*<Route path="/profileupdated" element={<InfoUpdated />} />*/}
                {/*<Route path="/accountdeleted" element={<AccountDeleted />} />*/}
            </Routes>
        </HistoryRouter>
    )
}
