import {Breadcrumb, Card, Form, InputNumber, message, Modal} from "antd";
import {Link} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {useStore} from "../../store";

const formItemLayout = {
    labelCol: {
        sm: { span: 7 }
    },
    wrapperCol: {
        sm: { span: 12 }
    }
}


const SetMembershipFee = () => {
    const [form] = Form.useForm()
    const {settingStore}=useStore()
    const [open, setOpen] = useState(false)
    const [fee, setFee] = useState(1)

    const showDialog = () => {
        setOpen(true)
    }

    const handleOk = async () => {
        await form.validateFields()
            .then(value => {
                settingStore.updateMembershipFee(value)
                    .then(result=>{
                        if (result.status===0){
                            message.success(result.message)
                            window.location.reload()
                        } else{
                            message.error(result.message)
                        }
                        form.resetFields()
                        setOpen(false)
                    })
                    .catch(err=>{
                        throw Error(err)
                    })
            })
            .catch(reason => {
                console.log('Validate Failed:', reason)
            })
    }

    const handleCancel = () => {
        form.resetFields()
        setOpen(false)
    }

    useEffect( ()=>{
        const loadFee=()=>{
            settingStore.getMembershipFee()
                .then(value => {
                    setFee(value.membership_fee)
                })
                .catch(err=>{
                    throw Error(err)
                })
        }
        loadFee()
    }, [])

    return (
        <>
            <a type="primary" onClick={showDialog}>Update fee</a>
            <Modal
                title="Update Membership Fee"
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
                    initialValues={{membership_fee: fee}}
                >
                    <Form.Item
                        label="Membership Fee"
                        name="membership_fee"
                        rules={[{ required: true, message: 'Please enter membership fee!' }]}
                    >
                        <InputNumber
                            placeholder="Your old password"
                            min={1}
                            max={9999}
                            formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                            style={{width: '120px'}}
                        />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
}


export default function SystemSettings () {
    return(
        <div className="settings-content">
            <Card
                title={
                    <Breadcrumb separator=">">
                        <Breadcrumb.Item>
                            <Link to="/">Home</Link>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>Settings</Breadcrumb.Item>
                    </Breadcrumb>
                }
            >
                <div className="password-link" style={{fontWeight: "bold", marginBottom: 20}}>
                    <h2>Password</h2>
                    <Link to="/">Change Password</Link>
                    {/*<ResetPwd >Change Password</ResetPwd>*/}
                </div>
                <div className="other-link" style={{fontWeight: "bold", marginBottom: 20}}>
                    <h2>Update annual membership fee</h2>
                    <SetMembershipFee />
                </div>

            </Card>
        </div>
    )
}


































/*


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
                const userInfo={...value, member_id: loginStore.member_id}

                updateStore.updatePassword(userInfo)
                    .then(result=>{
                        if (result.status===0)
                            message.success(result.message)
                        else
                            message.error(result.message)
                    })
                form.resetFields()
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

*/




