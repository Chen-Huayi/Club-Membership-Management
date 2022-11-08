import {LockOutlined, UserOutlined} from '@ant-design/icons';
import {Button, Checkbox, Form, Input, message} from 'antd';
import React from 'react';
import {useNavigate} from "react-router-dom";
import './Login.css'
import {useStore} from "../store";


function Login (){
    const navigate=useNavigate()
    const {loginStore}=useStore()
    const [form] = Form.useForm();


    const onFinish = async (values) => {
        await loginStore.login(values)

        if (loginStore.token!==''){
            const role=loginStore.user_role

            if (role==='Club Member'){
                navigate('/')
                window.location.reload()
            }else if (role==='Membership Admin'){
                navigate('/')
            }else if (role==='System Admin'){
                navigate('/')
            }else if (role==='Management User'){
                navigate('/')
            }
            message.success('Successfully login!')
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
        <div className="login-page">
            <div className="login-heading">LOGIN TO ACCOUNT</div>
            <Form
                name="normal_login"
                className="login-form"
                initialValues={{
                    remember: true,
                }}
                form={form}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >
                <Form.Item
                    className="input-form"
                    name="user_id"
                    rules={[{required: true, message: 'Please input your Username!'}]}
                >
                    <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="User ID" />
                </Form.Item>

                <Form.Item
                    className="input-form"
                    name="password"
                    rules={[
                        {required: true, message: 'Please input your Password!'},
                        {min: 6, message: 'Please input valid Password!'}
                    ]}
                >
                    <Input prefix={<LockOutlined className="site-form-item-icon" />} type="password" placeholder="Password"/>
                </Form.Item>
                <Form.Item>
                    <Form.Item name="remember" valuePropName="checked" noStyle>
                        <Checkbox>Remember me</Checkbox>
                    </Form.Item>

                    <a className="login-form-forgot" href="">
                        Forgot password?
                    </a>
                </Form.Item>

                <Form.Item>
                    <span className="login-submit-button">
                        <Button type="primary" htmlType="submit" className="login-form-button" shape="round">Log in</Button>
                    </span>
                    <span className="register-link">
                        Or <a onClick={redirectToSignup}><b>Register Now!</b></a>
                    </span>
                </Form.Item>
            </Form>
        </div>
    )
}
export default Login;