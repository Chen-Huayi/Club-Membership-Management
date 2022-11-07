import React, {useState} from "react";
import {NavLink, useNavigate} from "react-router-dom";
import "./NavLinks.css";
import {useStore} from "../store";
import {Dropdown, Form, Input, Modal, Popconfirm} from "antd";
import {DownOutlined, LoginOutlined, LogoutOutlined, UserOutlined} from "@ant-design/icons";
import axios from "axios";

const formItemLayout = {
    labelCol: {
        sm: { span: 7 }
    },
    wrapperCol: {
        sm: { span: 12 }
    }
}


export default function NavLinks() {
    const {loginStore}=useStore()
    const navigate=useNavigate()

    const onConfirm = ()=>{
        loginStore.logOut()
        window.location.reload()
    }

    // Setting Menu button: has two functionalities
    const items = [
        {
            label: <a /*onClick={updateProfile}*/ style={{width: "120px"}}>Update profile</a>
        },
        {
            label: <ResetPwd style={{width: "120px"}}>Reset password</ResetPwd>
        }
    ]

    return (
        <ul className="nav-links">
            {!loginStore.token && (
                <li>
                    <NavLink to="/login"><LoginOutlined /> Login</NavLink>
                </li>
            )}
            {loginStore.token && (
                <li>
                    <Dropdown menu={{items}} trigger={['click']}>
                        <a onClick={(e) => e.preventDefault()} >
                            <UserOutlined/>
                            <DownOutlined/>
                        </a>
                    </Dropdown>
                </li>
            )}
            {loginStore.token && (
                <li>
                    <a>
                        <Popconfirm onConfirm={onConfirm} title="Ready to exit?" okText="Exit" cancelText="Cancel">
                            <LogoutOutlined />
                        </Popconfirm>
                    </a>
                </li>
            )}
        </ul>
    )
}


const ResetPwd = () => {
    const [form] = Form.useForm()
    const [open, setOpen] = useState(false)

    const showDialog = () => {
        setOpen(true)
    }

    const handleOk = async () => {
        await form.validateFields()
            .then(value => {
                console.log('value:', value)
                // TODO 访问数据库
                // axios.post('/api/member/updatepwd', value)
                setOpen(false)
            }).catch(reason => {
                console.log('Validate Failed:', reason)
            })
    }

    const handleCancel = () => {
        form.resetFields()
        setOpen(false)
    }

    return (
        <>
            <a type="primary" onClick={showDialog}>Reset password</a>
            <Modal
                title="Change Password"
                open={open}
                onOk={handleOk}
                onCancel={handleCancel}
                okText="Confirm"
                cancelText="Cancel"
            >
                <Form
                    form={form}
                    {...formItemLayout}
                    name="form_in_modal"
                >
                    <Form.Item
                        label="Old Password"
                        name="oldPassword"
                        rules={[{ required: true, message: 'Please enter old password!' }]}
                    >
                        <Input type="password" placeholder="Your old password" maxLength={20} />
                    </Form.Item>

                    <Form.Item
                        label="New Password"
                        name="newPassword"
                        rules={[
                            {min: 6, message: 'Your password should be at least 6 characters!'},
                            {required: true, message: 'Please enter your password!'}
                        ]}
                        hasFeedback
                    >
                        <Input.Password type="password" placeholder="Enter new password" maxLength={20}/>
                    </Form.Item>

                    <Form.Item
                        label="Confirm Password"
                        name="confirmPassword"
                        dependencies={['newPassword']}
                        hasFeedback
                        rules={[
                            {required: true, message: 'Please retype new password'},
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('newPassword') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error('The two passwords that you entered do not match!'))
                                }
                            })
                        ]}
                    >
                        <Input.Password type="password" placeholder="Retype your new password" maxLength={20}/>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};
