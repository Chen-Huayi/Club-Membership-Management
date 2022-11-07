import React from "react";
import {NavLink, useNavigate} from "react-router-dom";
import "./NavLinks.css";
import {useStore} from "../../store";
import {Popconfirm} from "antd";
import {LoginOutlined, LogoutOutlined, UserOutlined} from "@ant-design/icons";

export default function NavLinks() {
    const {loginStore}=useStore()
    const navigate=useNavigate()

    const onConfirm = ()=>{
        loginStore.logOut()
        window.location.reload()
    }


    return (
        <ul className="nav-links">
            {!loginStore.token && (
                <li>
                    <NavLink to="/login"><LoginOutlined /> Login</NavLink>
                </li>
            )}
            {loginStore.token && (
                <li>
                    <NavLink to={`/account`}><UserOutlined /></NavLink>
                </li>
            )}
            {loginStore.token && (
                <li>
                    <a onClick={()=>{}}>
                        <Popconfirm
                            onConfirm={onConfirm}
                            title="Ready to exit?" okText="Exit" cancelText="Cancel">
                            <LogoutOutlined />
                        </Popconfirm>
                    </a>
                </li>
            )}
        </ul>
    );
}
