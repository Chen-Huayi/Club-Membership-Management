import {
    FacebookOutlined,
    GoogleOutlined,
    LockOutlined,
    MobileOutlined,
    TwitterOutlined,
    UserOutlined
} from '@ant-design/icons';
import {Button, Checkbox, Col, Form, Input, message, Row, Space, Tabs} from 'antd';
import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";
import './Login.css'
import {useStore} from '../../store';

const iconStyles = {
    marginInlineStart: '16px',
    color: 'rgba(0, 0, 0, 0.2)',
    fontSize: '24px',
    verticalAlign: 'middle',
    cursor: 'pointer',
}
const types = [
    {
        key: 'account',
        label: 'Account/Password ',
    },
    {
        key: 'phone',
        label: 'Phone',
    }
]


export default function Login() {
    const [loginType, setLoginType] = useState('account')
    const navigate=useNavigate()
    const {loginStore}=useStore()
    const [form] = Form.useForm()

    const onFinish = async (values) => {
        await loginStore.login(values)

        if (loginStore.token!==''){
            navigate('/')
            message.success('Successfully login!')
            window.location.reload()
        }else {
            form.setFieldsValue({password: ''})
            message.error('Invalid User ID or Password!')
        }
    }

    const onFinishFailed = (err) =>{
        console.log('Failed: ', err)
    }

    const redirectToSignup=()=>{
        navigate('/signup')
    }

    return (
        <div className="login-page" style={{ backgroundColor: 'white'}}>
            <div className="login-heading">LOGIN TO ACCOUNT</div>
            <Form
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                form={form}
                initialValues={{
                    remember: true
                }}
            >
                <Tabs centered activeKey={loginType} onChange={(activeKey) => setLoginType(activeKey)} items={types} />

                {loginType === 'account' && (<>
                    <Form.Item
                        className="input-form"
                        name="member_id"
                        rules={[{
                            required: true,
                            message: 'Please enter your id!'
                        }]}
                    >
                        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="admin or user id" />
                    </Form.Item>

                    <Form.Item
                        className="input-form"
                        name="password"
                        rules={[{
                            required: true,
                            message: 'Please enter your Password!'
                        }, {
                            min: 6,
                            message: 'Please enter valid Password!'
                        }]}
                    >
                        <Input.Password prefix={<LockOutlined className="site-form-item-icon" />} type="password" placeholder="password"/>
                    </Form.Item>

                    <Form.Item>
                        <Form.Item name="remember" valuePropName="checked" noStyle>
                            <Checkbox><b>Remember me</b></Checkbox>
                        </Form.Item>
                        <a className="login-form-forgot" style={{float: 'right'}}>
                            <b>Forgot password?</b>
                        </a>
                    </Form.Item>

                </>)}

                {loginType === 'phone' && (<>
                    <Form.Item
                        name="phone"
                        rules={[{
                            required: true,
                            message: 'Please enter your phone number',
                        }, {
                            min: 10,
                            message: 'Phone number is invalid!',
                        }]}
                    >
                        <Input prefix={<MobileOutlined className="prefixIcon"/>} placeholder="phone number" />
                    </Form.Item>

                    <Form.Item>
                        <Row gutter={8}>
                            <Col span={15}>
                                <Form.Item
                                    name="captcha"
                                    noStyle
                                    rules={[{
                                            required: true,
                                            message: 'Please input the captcha you got!',
                                    }]}
                                >
                                    <Input prefix={<LockOutlined className="prefixIcon"/>} placeholder="Enter captcha" />
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Button> <b><a>Get your captcha</a></b></Button>
                            </Col>
                        </Row>
                    </Form.Item>
                </>)}

                <Form.Item>
                    <Button type="primary" htmlType="submit" className="login-form-button" shape="round" size="large"><b>Log in</b></Button>
                </Form.Item>

            </Form>
            <div style={{marginBottom: 20, fontSize: 'large'}}>
                Don't have an account? <a onClick={redirectToSignup}><b>Register Now!</b></a>
            </div>

            <Space style={{fontSize: 'large'}}>
                Other Login Methods
                <GoogleOutlined style={iconStyles}/>
                <FacebookOutlined style={iconStyles}/>
                <TwitterOutlined style={iconStyles}/>
            </Space>
        </div>
    )
}
