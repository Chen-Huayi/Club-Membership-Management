import {Button, Card, Checkbox, Form, Input, InputNumber, message, Select, Switch} from 'antd'
import React, {useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import './Signup.css'
import {useStore} from '../../store';

const { Option } = Select
const formItemLayout = {
    labelCol: {
        span: 9
    },
    wrapperCol: {
        span: 7
    },
}
const tailFormItemLayout = {
    wrapperCol: {
        span: 16,
        offset: 9
    }
}


export default function Signup() {
    const [form] = Form.useForm()
    const navigate=useNavigate()
    const {signupStore, settingStore}=useStore()
    const [fee, setFee] = useState(1)
    const [payment, setPayment]=useState(true)

    const onFinish = async (values) => {
        await signupStore.memberSignup(values)
            .then(result=>{

                if (result.status===0){
                    if (result.pay_now){
                        navigate(`/payment?id=${result.member_id}&&amount=${result.amount}`)
                    }else {
                        navigate('/')
                    }
                    message.success(result.message)
                } else {
                    form.setFieldsValue({member_id: ''})
                    message.error(result.message)
                }
            })
            .catch(err => {
                throw Error(err)
            })
    }

    const onFinishFailed = (err) =>{
        console.log('Failed: ', err)
    }

    const switchDisplay = (value) => {
        setPayment(!value)
    }

    useEffect( ()=>{
        const loadFee=async ()=>{
            await settingStore.getMembershipFee()
                .then(value => {
                    setFee(value.membership_fee)
                    form.setFieldsValue({amount: value.membership_fee})
                })
                .catch(err=>{
                    throw Error(err)
                })
        }
        loadFee()
    }, [payment, form, settingStore])

    return (
        <div className="register">
            <Card className="register-container">
                <Form
                    {...formItemLayout}
                    form={form}
                    name="register"
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    initialValues={{middle_name: '', birthday_year: 2000, birthday_date: 1, amount: fee}}
                    scrollToFirstError
                >
                    <div className="register-heading">Register an Account</div>

                    <Form.Item
                        name="firstname"
                        label="First Name"
                        rules={[{required: true, message: 'Please enter your first name!'},
                        ]}
                    >
                        <Input maxLength={30}/>
                    </Form.Item>

                    <Form.Item name="middle_name" label="Middle Name">
                        <Input maxLength={30}/>
                    </Form.Item>

                    <Form.Item
                        name="lastname"
                        label="Last Name"
                        rules={[{required: true, message: 'Please enter your last name!'}]}
                    >
                        <Input maxLength={30}/>
                    </Form.Item>

                    <Form.Item
                        name="email"
                        label="E-mail"
                        rules={[
                            {type: 'email', message: 'The input is not valid E-mail!'},
                            {required: true, message: 'Please enter your E-mail!'}
                        ]}
                    >
                        <Input maxLength={30}/>
                    </Form.Item>

                    <Form.Item
                        name="member_id"
                        label="Member ID"
                        tooltip="Create your custom member ID"
                        rules={[
                            {min: 3, message: 'Your Member ID should be at least 3 characters!'},
                            {max: 20, message: 'Your Member ID  should be at most 20 characters!'},
                            {required: true, message: 'Please enter your Member ID!'}
                        ]}
                    >
                        <Input maxLength={30}/>
                    </Form.Item>

                    <Form.Item
                        name="password"
                        label="Password"
                        rules={[
                            {min: 6, message: 'Your password should be at least 6 characters!'},
                            {max: 20, message: 'Your password should be at most 20 characters!'},
                            {required: true, message: 'Please enter your password!'}
                        ]}
                        hasFeedback
                    >
                        <Input.Password maxLength={30}/>
                    </Form.Item>

                    <Form.Item
                        name="confirm"
                        label="Confirm Password"
                        dependencies={['password']}
                        hasFeedback
                        rules={[
                            {required: true, message: 'Please confirm your password!'},
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('password') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error('The two passwords that you entered do not match!'))
                                }
                            })
                        ]}
                    >
                        <Input.Password type="password" maxLength={30}/>
                    </Form.Item>

                    <Form.Item
                        name="address_line1"
                        label="Address line 1"
                        rules={[{required: true, message: 'Please enter your address!'}]}
                    >
                        <Input maxLength={30}/>
                    </Form.Item>

                    <Form.Item name="address_line2" label="Address line 2" initialValue="">
                        <Input maxLength={30}/>
                    </Form.Item>

                    <Form.Item name="address_line3" label="Address line 3" initialValue="">
                        <Input maxLength={30}/>
                    </Form.Item>

                    <Form.Item
                        name="address_city"
                        label="City"
                        rules={[{required: true, message: 'Please enter your city!'}]}
                    >
                        <Input maxLength={30}/>
                    </Form.Item>

                    <Form.Item
                        name="address_country"
                        label="Country"
                        rules={[{required: true, message: 'Please enter your country!'}]}
                    >
                        <Input maxLength={30}/>
                    </Form.Item>

                    <Form.Item
                        name="address_postalcode"
                        label="Postal Code"
                        rules={[{required: true, message: 'Please enter your postal code!'}]}
                    >
                        <Input maxLength={30}/>
                    </Form.Item>

                    <Form.Item
                        name="phone"
                        label="Phone Number"
                        rules={[{required: true, message: 'Please enter your phone number!'}]}
                    >
                        <Input maxLength={30} style={{width: '100%'}}/>
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
                            <InputNumber placeholder="YYYY" min={1900} max={2022} style={{width: '80px'}}/>
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
                            <InputNumber placeholder="DD" min={1} max={31} style={{width: '80px'}}/>
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

                    <Form.Item name="pay_now" label="Pay now" valuePropName="checked">
                        <Switch onChange={switchDisplay}/>
                    </Form.Item>
                    <Form.Item
                        label="Amount"
                        name="amount"
                        hidden={payment}
                        rules={[{required: true, message: 'Please enter a number'}]}
                    >
                        <InputNumber
                            min={fee}
                            max={fee}
                            formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                            style={{width: '120px'}}
                        />
                    </Form.Item>

                    <Form.Item
                        name="agreement"
                        valuePropName="checked"
                        rules={[{
                            validator: (_, value) =>
                                value ? Promise.resolve() : Promise.reject(new Error('Should accept agreement')),
                            }
                        ]}
                        {...tailFormItemLayout}
                    >
                        <Checkbox>
                            I have read the <a>agreement</a>
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
