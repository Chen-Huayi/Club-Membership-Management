import {Breadcrumb, Button, Card, DatePicker, Form, Input, message, Select} from 'antd';
import React, {useEffect} from 'react';
import './Profile.css'
import {useStore} from "../store";
import {Link, useNavigate} from "react-router-dom";

const { Option } = Select
const formItemLayout = {
    labelCol: {
        sm: { span: 7 }
    },
    wrapperCol: {
        sm: { span: 12 }
    }
}
const tailFormItemLayout = {
    wrapperCol: {
        span: 16,
        offset: 9
    }
}


export default function UpdateProfile () {
    const [form] = Form.useForm()
    const navigate=useNavigate()
    const {updateStore, loginStore, userStore}=useStore()

    const onFinish = async () => {
        await form.validateFields()
            .then(value => {
                const userInfo={...value, user_id: loginStore.user_id}

                updateStore.updateUserInfo(userInfo)
                    .then(result=>{
                        if (result.status===0){
                            navigate('/profile')
                            message.success(result.message)
                        } else {
                            message.error(result.message)
                        }
                    })
            })
            .catch(reason => {
                console.log('Validate Failed:', reason)
            })
    }

    const onFinishFailed =async(err) => {
        console.log('Failed:', err)
    }

    // backfill the user information to the form
    useEffect(()=>{
        const loadDetail=async ()=>{
            await userStore.getUserInfo({user_id: loginStore.user_id})
                .then(currProfile=>{
                    const {birthday, ...userInfo}=currProfile
                    form.setFieldsValue({...userInfo})
                })
                .catch(err=>{
                    throw Error(err)
                })
        }
        loadDetail()
    }, [])

    return (
        <div className="profile-content">
            <Card
                title={
                    <Breadcrumb separator=">">
                        <Breadcrumb.Item>
                            <Link to="/home">Home</Link>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>
                            <Link to="/profile">Profile</Link>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>Update</Breadcrumb.Item>
                    </Breadcrumb>
                }
            >
                <Form
                    form={form}
                    {...formItemLayout}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
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

                    <Form.Item {...tailFormItemLayout} className="resubmit-button">
                        <Button type="primary" htmlType="submit" size="large" shape="round">
                            Resubmit
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    )
}
