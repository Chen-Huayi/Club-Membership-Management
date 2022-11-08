import React, {useState} from "react";
import {NavLink} from "react-router-dom";
import "./NavLinks.css";
import {useStore} from "../store";
import {DatePicker, Dropdown, Form, Input, message, Modal, Popconfirm, Select} from "antd";
import {DownOutlined, LoginOutlined, LogoutOutlined, UserOutlined} from "@ant-design/icons";

const { Option } = Select
const formItemLayout = {
    labelCol: {
        sm: { span: 7 }
    },
    wrapperCol: {
        sm: { span: 12 }
    }
}

// Show update personal information dialog
const UpdateInfo =  () => {
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

                updateStore.updateUserInfo(userInfo)
                    .then(result=>{
                        if (result.status===0)
                            message.success(result.message)
                        else
                            message.error(result.message)
                    })
                setOpen(false)
            })
            .catch(reason => {
                console.log('Validate Failed:', reason)
            })
    }

    const handleCancel = () => {
        form.resetFields()
        setOpen(false)
    }

    return (
        <>
            <a type="primary" onClick={showDialog}>Update profile</a>
            <Modal
                title="Update Information"
                open={open}
                onOk={handleOk}
                onCancel={handleCancel}
                okText="Confirm"
                cancelText="Cancel"
            >
                <Form
                    form={form}
                    {...formItemLayout}
                    name="update-profile-form"
                    scrollToFirstError
                >
                    <Form.Item
                        label="First Name"
                        name="firstname"
                        rules={[{ required: true, message: 'Please enter old first name!' }]}
                    >
                        <Input placeholder="Your first name" />
                    </Form.Item>

                    <Form.Item
                        label="Last Name"
                        name="lastname"
                        rules={[{ required: true, message: 'Please enter old last name!' }]}
                    >
                        <Input placeholder="Your last name" />
                    </Form.Item>

                    <Form.Item
                        name="email"
                        label="E-mail"
                        rules={[
                            {type: 'email', message: 'The input is not valid E-mail!'},
                            {required: true, message: 'Please enter your E-mail!'}
                        ]}
                    >
                        <Input placeholder="Your email"/>
                    </Form.Item>

                    <Form.Item
                        name="address_line1"
                        label="Address line 1"
                        rules={[{required: true, message: 'Please enter your address!'}]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item name="address_line2" label="Address line 2" initialValue="">
                        <Input />
                    </Form.Item>

                    <Form.Item name="address_line3" label="Address line 3" initialValue="">
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="address_city"
                        label="City"
                        rules={[{required: true, message: 'Please enter your city!'}]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="address_country"
                        label="Country"
                        rules={[{required: true, message: 'Please enter your country!'}]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="address_postalcode"
                        label="Postal Code"
                        rules={[{required: true, message: 'Please enter your postal code!'}]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="phone"
                        label="Phone Number"
                        rules={[{required: true, message: 'Please enter your phone number!'}]}
                    >
                        <Input style={{width: '100%'}}/>
                    </Form.Item>

                    <Form.Item
                        name="birthday"
                        label="Birthday"
                        rules={[{required: true, message: 'Please select your birthday!'}]}
                    >
                        <DatePicker />
                    </Form.Item>

                    <Form.Item
                        name="gender"
                        label="Gender"
                        rules={[{required: true, message: 'Please select gender!'}]}
                    >
                        <Select placeholder="select gender" style={{width: '150px'}}>
                            <Option value="male">Male</Option>
                            <Option value="female">Female</Option>
                            <Option value="other">Other</Option>
                        </Select>
                    </Form.Item>

                </Form>
            </Modal>
        </>
    )
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
            })
            .catch(reason => {
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
    )
}

// Setting Menu button: has two functionalities
const items = [
    {
        label: <UpdateInfo style={{width: "120px"}}>Update profile</UpdateInfo>
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



