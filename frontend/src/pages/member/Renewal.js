import {Breadcrumb, Button, Card, Form, InputNumber, message} from 'antd';
import React, {useEffect, useState} from 'react';
import '../member/Profile.css'
import {Link, useNavigate} from "react-router-dom";
import {useStore} from "../../store";


export default function Renewal () {
    const navigate=useNavigate()
    const {loginStore, userStore}=useStore()
    const [userInfo, setUserInfo]=useState({
        membership: loginStore.membership_status
    })

    const onFinish = async (values) => {
        navigate(`/payment?id=${loginStore.member_id}&&amount=${values.amount}`)
    }

    const onFinishFailed =async(err) => {
        console.log('Failed:', err)
    }

    useEffect(()=>{
        const loadInfo = async () => {
            await userStore.getMemberInfo(loginStore.member_id)
                .then(result=>{
                    setUserInfo({
                        membership: result.membership_status
                    })
                })
        }
        loadInfo()
    }, [])

    return (
        <div className="renewal-content">
            <Card
                title={
                    <Breadcrumb separator=">">
                        <Breadcrumb.Item>
                            <Link to="/">Home</Link>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>
                            <Link to="/membership">Membership</Link>
                        </Breadcrumb.Item>
                        {userInfo.membership && (
                            <Breadcrumb.Item>Renewal</Breadcrumb.Item>
                        )}
                        {!userInfo.membership && (
                            <Breadcrumb.Item>Active</Breadcrumb.Item>
                        )}
                    </Breadcrumb>
                }
            >
                <Form
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    name="renewal-form"
                    initialValues={{amount: 648}}
                >
                    <Form.Item
                        label="Amount"
                        name="amount"
                        rules={[{required: true, message: 'Please enter a number'}]}
                    >
                        <InputNumber
                            min={648}
                            max={648}
                            formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                            style={{width: '120px'}}
                        />
                    </Form.Item>

                    <Form.Item className="resubmit-button">
                        <Button type="primary" htmlType="submit" size="large" shape="round">
                            Go to Payment Page
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    )
}
