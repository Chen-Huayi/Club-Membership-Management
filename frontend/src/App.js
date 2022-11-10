import React from "react"
import {Route, Routes, unstable_HistoryRouter as HistoryRouter} from "react-router-dom"
import Signup from "./pages/shared/Signup"
import Login from "./pages/shared/Login"
import Home from "./pages/member/Home"
import {history} from "./utils/history"
import Profile from "./pages/member/Profile";
import MainLayout from "./pages/shared/Layout";
import {LoggedAuth} from "./components/authorization/LoggedAuth";
import Article from "./pages/admin/article";
import UpdateProfile from "./pages/admin/UpdateProfile";
import Settings from "./pages/member/Settings";
import Membership from "./pages/member/Membership";
import NotFound404 from "./pages/results/404";
import Renewal from "./pages/member/Renewal";
import {AdminAuth} from "./components/authorization/AdminAuth";
import {MemberAuth} from "./components/authorization/MemberAuth";


export default function App() {
    return (
        <HistoryRouter history={history}>
            <Routes>
                <Route path="/" element={<LoggedAuth><MainLayout /></LoggedAuth>}>
                    <Route index element={<Home />} />
                    <Route path="profile" element={<MemberAuth><Profile /></MemberAuth>} />
                    <Route path="settings" element={<MemberAuth><Settings /></MemberAuth>}/>
                    <Route path="membership" element={<MemberAuth><Membership /></MemberAuth>}/>
                    <Route path="renewal" element={<MemberAuth><Renewal /></MemberAuth>} />

                    <Route path="article" element={<AdminAuth><Article /></AdminAuth>} />
                    <Route path="update-profile" element={<AdminAuth><UpdateProfile /></AdminAuth>} />
                    <Route path="/*" element={<NotFound404/>}></Route>
                </Route>
                <Route path="/signup" element={<Signup />} />
                <Route path="/login" element={<Login />} />
            </Routes>
        </HistoryRouter>
    )
}
