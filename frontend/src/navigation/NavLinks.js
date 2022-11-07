import React, {useState} from "react";
import {NavLink, useNavigate} from "react-router-dom";
import "./NavLinks.css";
import {useStore} from "../store";
import {Dropdown, Form, Input, message, Modal, Popconfirm} from "antd";
import {DownOutlined, LoginOutlined, LogoutOutlined, UserOutlined} from "@ant-design/icons";

const formItemLayout = {
    labelCol: {
        sm: { span: 7 }
    },
    wrapperCol: {
        sm: { span: 12 }
    }
}

// Show update password dialog
const ResetPwd = () => {
    const [form] = Form.useForm()
    const [open, setOpen] = useState(false)
    const {updateStore, loginStore}=useStore()

    const showDialog = () => {
        setOpen(true)
    }

    const handleOk = async () => {
        await form.validateFields()
            .then(value => {
                const userInfo={...value, user_id: loginStore.user_id}

                updateStore.updatePassword(userInfo)
                    .then(result=>{
                        if (result.status===0)
                            message.success(result.message)
                        else
                            message.error(result.message)
                    })
                setOpen(false)
            }).catch(reason => {
                console.log('Validate Failed:', reason)
            })
        form.resetFields()
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
    )
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

export default function NavLinks() {
    const {loginStore}=useStore()

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



