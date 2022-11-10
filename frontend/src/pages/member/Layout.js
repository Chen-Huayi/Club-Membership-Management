import {LogoutOutlined, SettingOutlined, ShoppingOutlined, UserOutlined} from '@ant-design/icons';
import {Layout, Menu, Popconfirm} from 'antd';
import {observer} from 'mobx-react-lite'
import './Layout.css'
import React, {useEffect, useState} from 'react';
import {Link, Outlet, useLocation} from "react-router-dom";
import {useStore} from "../../store";


const { Header, Sider } = Layout;
const navigationMenu = [
    {
        label: <Link to={'/article'}>nav1</Link>,
    },
    {
        label: <Link to={'/'}>nav2</Link>,
    }
]
const siderMenus = [
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
];


const MyLayout = () => {
    const {pathname}=useLocation()
    const {loginStore, userStore}=useStore()
    const [userInfo, setUserInfo]=useState({
        name: loginStore.firstname
    })

    const onConfirm=()=>{
        loginStore.logOut()
        window.location.reload()
    }

    useEffect(()=>{
        const loadInfo = async () => {
            await userStore.getUserInfo({user_id: loginStore.user_id})
                .then(result=>{
                    setUserInfo({
                        name: result.firstname
                    })
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
                <Sider className="site-layout-background" width={170}>
                    <Menu
                        mode="inline"
                        theme="light"
                        defaultSelectedKeys={[pathname]}
                        items={siderMenus}
                        style={{ height: '100%', fontSize: 'large' }}
                    />
                </Sider>
                <Layout className="layout-content" style={{ padding: 20 }}>
                    <Outlet />
                </Layout>
            </Layout>
        </Layout>
    )
}
export default observer(MyLayout);
