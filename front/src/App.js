import React from "react"
import {Route, Routes, unstable_HistoryRouter as HistoryRouter} from "react-router-dom"
import {history} from "./utils/history"
import {LoginAuth, MemberAuth, MembershipAdminAuth, SystemAdminAuth, ManagementUserAuth} from "./components/authorization";
import NotFound404 from "./pages/404";
import SuccessPaid from "./pages/SuccessPaid";
import Payment from "./pages/Payment";
import UnlockAccount from "./pages/UnlockAccount";
import Login from "./pages/Login"
import MainLayout from "./pages/Layout";
import Home from "./pages/Home"
// Members
import MemberSignup from "./pages/member/Signup"
import Profile from "./pages/member/Profile";
import Settings from "./pages/member/Settings";
import Membership from "./pages/member/Membership";
import Renewal from "./pages/member/Renewal";
import Notification from "./pages/member/Notification";
// Staffs
import StaffSignup from "./pages/staff/Signup";
import ShowMemberList from "./pages/staff/ShowMemberList";
import ShowStaffList from "./pages/staff/ShowStaffList";
import UpdateMemberProfile from "./pages/staff/UpdateMemberProfile";
import UpdateStaffProfile from "./pages/staff/UpdateStaffProfile";
import SendEmail from "./pages/staff/SendEmail";
import SystemSettings from "./pages/staff/SystemSettings";
import SendCardList from "./pages/staff/SendCardList";
import ViewAuditHistory from "./pages/staff/ViewAuditHistory";
import ViewFilterResult from "./pages/staff/ViewFilterResult";
import ViewDuration from "./pages/staff/ViewDuration";


export default function App() {
    return (
        <HistoryRouter history={history}>
            <Routes>
                <Route path="/" element={<LoginAuth><MainLayout /></LoginAuth>}>
                    <Route index element={<Home />} />
                    {/*<Route path="profile" element={<MemberAuth><Profile /></MemberAuth>} />*/}
                    <Route path="profile" element={<Profile />} />
                    <Route path="settings" element={<MemberAuth><Settings /></MemberAuth>}/>
                    <Route path="membership" element={<MemberAuth><Membership /></MemberAuth>}/>
                    <Route path="renewal" element={<MemberAuth><Renewal /></MemberAuth>} />
                    <Route path="notification" element={<MemberAuth><Notification /></MemberAuth>} />

                    <Route path="member-list" element={<MembershipAdminAuth><ShowMemberList /></MembershipAdminAuth>} />
                    <Route path="send-card-list" element={<MembershipAdminAuth><SendCardList /></MembershipAdminAuth>} />
                    <Route path="send-email" element={<MembershipAdminAuth><SendEmail /></MembershipAdminAuth>} />
                    <Route path="update-member-profile" element={<MembershipAdminAuth><UpdateMemberProfile /></MembershipAdminAuth>} />

                    <Route path="register-staff" element={<SystemAdminAuth><StaffSignup /></SystemAdminAuth>} />
                    <Route path="staff-list" element={<SystemAdminAuth><ShowStaffList /></SystemAdminAuth>} />
                    <Route path="update-staff-profile" element={<SystemAdminAuth><UpdateStaffProfile /></SystemAdminAuth>} />
                    <Route path="system-settings" element={<SystemAdminAuth><SystemSettings /></SystemAdminAuth>} />

                    <Route path="view-audit" element={<ManagementUserAuth><ViewAuditHistory/></ManagementUserAuth>}/>
                    <Route path="view-filter-result" element={<ManagementUserAuth><ViewFilterResult/></ManagementUserAuth>}/>
                    <Route path="view-membership-duration" element={<ManagementUserAuth><ViewDuration/></ManagementUserAuth>}/>

                    <Route path="/*" element={<NotFound404/>}></Route>
                </Route>
                <Route path="/signup" element={<MemberSignup />} />
                <Route path="/login" element={<Login />} />
                <Route path="/payment-confirmed" element={<SuccessPaid />} />
                <Route path="/payment" element={<Payment />} />
                <Route path="/unlock-account" element={<UnlockAccount />} />
            </Routes>
        </HistoryRouter>
    )
}
