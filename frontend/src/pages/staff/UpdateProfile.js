import {Breadcrumb, Button, Card, Form, Input, message, Select} from 'antd';
import React, {useEffect} from 'react';
import {useStore} from "../../store";
import {Link, useNavigate, useSearchParams} from "react-router-dom";

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
    const {updateStore, memberStore}=useStore()
    const [params]=useSearchParams()
    const member_id =params.get('id')

    const onFinish = async () => {
        await form.validateFields()
            .then(value => {
                const userInfo={member_id, ...value}

                updateStore.updateMemberInfo(userInfo)
                    .then(result=>{
                        if (result.status===0){
                            navigate('/member-list')
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
            await memberStore.getMemberInfo(member_id)
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
                            <Link to="/">Home</Link>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>
                            <Link to="/member-list">Member List</Link>
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
                        label="Birthday"
                        style={{marginBottom: 0}}
                    >
                        <Form.Item
                            name="birthday_year"
                            style={{display: 'inline-block', marginRight: 10}}
                            rules={[{required: true, message: 'Enter year!'}]}
                        >
                            <Input placeholder="YYYY" style={{width: '80px'}}/>
                        </Form.Item>
                        <Form.Item
                            name="birthday_month"
                            style={{display: 'inline-block', marginRight: 10}}
                            rules={[{required: true, message: 'Select month!'}]}
                        >
                            <Select placeholder="MM" style={{width: '80px'}}>
                                <Option value="1">Jan</Option>
                                <Option value="2">Feb</Option>
                                <Option value="3">Mar</Option>
                                <Option value="4">Apr</Option>
                                <Option value="5">May</Option>
                                <Option value="6">Jun</Option>
                                <Option value="7">Jul</Option>
                                <Option value="8">Aug</Option>
                                <Option value="9">Sept</Option>
                                <Option value="10">Oct</Option>
                                <Option value="11">Nov</Option>
                                <Option value="12">Dec</Option>
                            </Select>
                        </Form.Item>
                        <Form.Item
                            name="birthday_date"
                            style={{display: 'inline-block', marginRight: 10}}
                            rules={[{required: true, message: 'Enter date!'}]}
                        >
                            <Input placeholder="DD" style={{width: '80px'}}/>
                        </Form.Item>
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
