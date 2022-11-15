import React from "react"
import {Route, Routes, unstable_HistoryRouter as HistoryRouter} from "react-router-dom"
import Signup from "./pages/shared/Signup"
import Login from "./pages/shared/Login"
import Home from "./pages/shared/Home"
import {history} from "./utils/history"
import Profile from "./pages/member/Profile";
import MainLayout from "./pages/shared/Layout";
import {LoggedAuth} from "./components/authorization/LoggedAuth";
import UpdateProfile from "./pages/staff/UpdateProfile";
import Settings from "./pages/member/Settings";
import Membership from "./pages/member/Membership";
import NotFound404 from "./pages/shared/results/404";
import Renewal from "./pages/member/Renewal";
import {MembershipAdminAuth} from "./components/authorization/MembershipAdminAuth";
import {MemberAuth} from "./components/authorization/MemberAuth";
import ShowMemberList from "./pages/staff/ShowMemberList";
import SuccessPaid from "./pages/shared/results/SuccessPaid";
import Payment from "./pages/shared/Payment";
import UnlockAccount from "./pages/shared/UnlockAccount";
import SendEmail from "./pages/staff/SendEmail";
import Notification from "./pages/member/Notification";


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
                    <Route path="notification" element={<MemberAuth><Notification /></MemberAuth>} />

                    <Route path="member-list" element={<MembershipAdminAuth><ShowMemberList /></MembershipAdminAuth>} />
                    <Route path="send-email" element={<MembershipAdminAuth><SendEmail /></MembershipAdminAuth>} />
                    <Route path="update-profile" element={<MembershipAdminAuth><UpdateProfile /></MembershipAdminAuth>} />
                    <Route path="/*" element={<NotFound404/>}></Route>
                </Route>
                <Route path="/signup" element={<Signup />} />
                <Route path="/login" element={<Login />} />
                <Route path="/payment-confirmed" element={<SuccessPaid />} />
                <Route path="/payment" element={<Payment />} />
                <Route path="/unlock-account" element={<UnlockAccount />} />
            </Routes>
        </HistoryRouter>
    )
}
