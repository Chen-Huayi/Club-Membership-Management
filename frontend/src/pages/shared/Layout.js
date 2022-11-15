import {
    BellOutlined,
    HomeOutlined,
    LogoutOutlined,
    SendOutlined,
    SettingOutlined,
    ShoppingOutlined,
    UserOutlined
} from '@ant-design/icons';
import {Layout, Menu, Popconfirm} from 'antd';
import {observer} from 'mobx-react-lite'
import './Layout.css'
import React, {useEffect, useState} from 'react';
import {Link, Outlet, useLocation} from "react-router-dom";
import {useStore} from "../../store";


const { Header, Sider } = Layout;
const navigationMenu = [
    {
        label: <Link to={'/'}>nav1</Link>,
    },
    {
        label: <Link to={'/'}>nav2</Link>,
    }
]
const siderMemberMenus = [
    {
        key: '/',
        icon: <HomeOutlined />,
        label: <Link to="/">Home</Link>,
    },
    {
        key: '/profile',
        icon: <UserOutlined />,
        label: <Link to="/profile">My Profile</Link>,
    },
    {
        key: '/settings',
        icon: <SettingOutlined />,
        label: <Link to="/settings">Settings</Link>,
    },
    {
        key: '/membership',
        icon: <ShoppingOutlined />,
        label: <Link to="/membership">Membership</Link>,
    },
    {
        key: '/notification',
        icon: <BellOutlined />,
        label: <Link to="/notification">Notification</Link>,
    },
]
const siderMembershipAdminMenus = [
    {
        key: '/',
        icon: <HomeOutlined />,
        label: <Link to="/">Home</Link>,
    },
    {
        key: '/member-list',
        icon: <UserOutlined />,
        label: <Link to="/member-list">Member List</Link>,
    },
    {
        key: '/send-email',
        icon: <SendOutlined />,
        label: <Link to="/send-email">Send Email</Link>
    }
]


const MainLayout = () => {
    const {pathname}=useLocation()
    const {loginStore, userStore}=useStore()
    const [userInfo, setUserInfo]=useState({
        name: loginStore.firstname+' '+loginStore.lastname
    })

    const onConfirm=()=>{
        loginStore.logout()
        window.location.reload()
    }

    useEffect(()=>{
        const loadInfo = async () => {
            let userInfo

            if (loginStore.user_role==='Club Member'){
                userInfo=await userStore.getMemberInfo(loginStore.member_id)
            }else if (loginStore.user_role==='Membership Admin'){
                userInfo=await userStore.getStaffInfo(loginStore.staff_id)
            }

            setUserInfo({
                name: userInfo.firstname+' '+userInfo.lastname
            })
        }
        loadInfo()
    }, [])

    return(
        <Layout style={{height:"100vh"}}>
            <Header className="header" >
                <div className="header-info">
                    <span className="header-left-conner">
                        <a className="header-logo" href="/">GREEN SPACE</a>
                    </span>
                    <span className="header-left-conner">
                        <Menu theme="dark" mode="horizontal" items={navigationMenu} />
                    </span>
                    <span >
                        <a className="header-logout">
                            <Popconfirm onConfirm={onConfirm} title="Ready to exit?" okText="Exit" cancelText="Cancel">
                                <LogoutOutlined /> Logout
                            </Popconfirm>
                        </a>
                    </span>
                    <span className="header-userinfo">
                        Hi, {userInfo.name}
                    </span>
                </div>
            </Header>

            <Layout>
                {loginStore.user_role==='Club Member' && (
                    <Sider className="site-layout-background" width={170}>
                        <Menu
                            mode="inline"
                            theme="light"
                            defaultSelectedKeys={[pathname]}
                            items={siderMemberMenus}
                            style={{ height: '100%', fontSize: 'large' }}
                        />
                    </Sider>
                )}
                {loginStore.user_role==='Membership Admin' && (
                    <Sider className="site-layout-background" width={170}>
                        <Menu
                            mode="inline"
                            theme="light"
                            defaultSelectedKeys={[pathname]}
                            items={siderMembershipAdminMenus}
                            style={{ height: '100%', fontSize: 'large' }}
                        />
                    </Sider>
                )}

                {/*TODO*/}

                <Layout className="layout-content" style={{ padding: 20 }}>
                    <Outlet />
                </Layout>
            </Layout>
        </Layout>
    )
}
export default observer(MainLayout);
