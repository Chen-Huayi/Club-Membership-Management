import {Button, Card, Checkbox, DatePicker, Form, Input, message, Select} from 'antd'
import React from 'react'
import {useNavigate} from 'react-router-dom'
import './Signup.css'
import axios from "axios";
// import {useStore} from 'store';

const { Option } = Select
const formItemLayout = {
    labelCol: {
        span: 9
    },
    wrapperCol: {
        span: 6
    },
}
const tailFormItemLayout = {
    wrapperCol: {
        span: 16,
        offset: 9
    }
}


function Signup(props) {
    const [form] = Form.useForm()
    const navigate=useNavigate()
    // const {registerStore}=useStore()

    const onFinish = async (values) => {
        await axios.post(`${props.url}/api/signup`, values)
            .then((response)=>{
                const msg=response.data.message

                if (response.data.status===0){
                    navigate('/')
                    message.success(msg)
                } else {
                    message.error(msg)
                }
            })

    }


    const onFinishFailed = (err) =>{
        console.log('Failed: ', err)
    }


    return (
        <div className="register">
            <Card className="register-container">
                <Form
                    {...formItemLayout}
                    form={form}
                    name="register"
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    initialValues={{}}
                    scrollToFirstError
                >
                    <div className="register-heading">Register an Account</div>

                    <Form.Item
                        name="firstname"
                        label="First Name"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your User ID!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item name="middle_name" label="Middle Name">
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="lastname"
                        label="Last Name"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your User ID!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="email"
                        label="E-mail"
                        rules={[
                            {
                                type: 'email',
                                message: 'The input is not valid E-mail!',
                            },
                            {
                                required: true,
                                message: 'Please input your E-mail!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="user_id"
                        label="User ID"
                        tooltip="Create your custom member ID"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your User ID!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        label="Password"
                        rules={[
                            {
                                min: 6,
                                required: true,
                                message: 'Please input your password!',
                            },
                        ]}
                        hasFeedback
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item
                        name="confirm"
                        label="Confirm Password"
                        dependencies={['password']}
                        hasFeedback
                        rules={[
                            {
                                required: true,
                                message: 'Please confirm your password!',
                            },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('password') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error('The two passwords that you entered do not match!'));
                                },
                            }),
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item
                        name="address_line1"
                        label="Address line 1"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your address!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item name="address_line2" label="Address line 2">
                        <Input />
                    </Form.Item>

                    <Form.Item name="address_line3" label="Address line 3">
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="address_city"
                        label="City"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your city!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="address_country"
                        label="Country"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your country!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="address_postalcode"
                        label="Postal Code"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your postal code!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="phone"
                        label="Phone Number"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your phone number!',
                            },
                        ]}
                    >
                        <Input style={{width: '100%',}}/>
                    </Form.Item>

                    <Form.Item
                        name="birthday"
                        label="Birthday"
                        rules={[
                            {
                                required: true,
                                message: 'Please select your birthday!',
                            },
                        ]}
                    >
                        <DatePicker />
                    </Form.Item>

                    <Form.Item
                        name="gender"
                        label="Gender"
                        rules={[
                            {
                                required: true,
                                message: 'Please select gender!',
                            },
                        ]}
                    >
                        <Select placeholder="select gender" style={{width: '150px'}}>
                            <Option value="male">Male</Option>
                            <Option value="female">Female</Option>
                            <Option value="other">Other</Option>
                        </Select>
                    </Form.Item>

                    <Form.Item
                        name="user_role"
                        label="Your Role"
                        rules={[
                            {
                                required: true,
                                message: 'Please select role!',
                            },
                        ]}
                    >
                        <Select placeholder="select role" style={{width: '150px'}}>
                            <Option value="Membership Admin">Membership Admin</Option>
                            <Option value="Club Member">Club Member</Option>
                            <Option value="System Admin">System Admin</Option>
                            <Option value="Management User">Management User</Option>
                        </Select>
                    </Form.Item>

                    <Form.Item
                        name="agreement"
                        valuePropName="checked"
                        rules={[
                            {
                                validator: (_, value) =>
                                    value ? Promise.resolve() : Promise.reject(new Error('Should accept agreement')),
                            },
                        ]}
                        {...tailFormItemLayout}
                    >
                        <Checkbox>
                            I have read the <a href="#">agreement</a>
                        </Checkbox>
                    </Form.Item>

                    <Form.Item {...tailFormItemLayout}>
                        <Button type="primary" htmlType="submit" size="large" shape="round">
                            Register
                        </Button>
                    </Form.Item>

                </Form>
            </Card>
        </div>
    );
}

export default Signup