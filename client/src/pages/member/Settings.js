import {Breadcrumb, Card, Form, Input, message, Modal} from "antd";
import {Link} from "react-router-dom";
import React, {useState} from "react";
import {useStore} from "../../store";


const formItemLayout = {
    labelCol: {
        sm: {span: 7}
    },
    wrapperCol: {
        sm: {span: 12}
    }
}

const ResetPwd = () => {
    const [form] = Form.useForm()
    const [open, setOpen] = useState(false)
    const {updateStore, loginStore} = useStore()

    const showDialog = () => {
        setOpen(true)
    }

    const handleOk = async () => {
        await form.validateFields()
            .then(value => {
                const userInfo = {...value, member_id: loginStore.member_id}

                updateStore.updatePassword(userInfo)
                    .then(result => {
                        if (result.status === 0)
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
                        rules={[{required: true, message: 'Please enter old password!'}]}
                    >
                        <Input type="password" placeholder="Your old password" maxLength={20}/>
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
                            ({getFieldValue}) => ({
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


export default function Settings() {
    const {updateStore, loginStore} = useStore()
    let previous = 0

    const requestNewCard = () => {
        let now = Date.now()

        // throttle
        if (now - previous >= 5000) {
            updateStore.requestReplaceCard({member_id: loginStore.member_id})
                .then(result => {
                    if (result.status === 0) {
                        message.success('Your request has already sent.')
                    } else {
                        message.error('Fail to request.')
                    }
                    previous = now  // reset previous
                })
        } else {
            message.warning('You click too fast')
        }
    }

    return (
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
                    <ResetPwd>Change Password</ResetPwd>
                </div>
                <div className="other-link" style={{fontWeight: "bold", marginBottom: 20}}>
                    <h2>Other</h2>
                    <a onClick={requestNewCard}>Request New Card</a>
                </div>

            </Card>
        </div>
    )
}
