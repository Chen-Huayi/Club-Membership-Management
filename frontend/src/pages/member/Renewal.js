import {Breadcrumb, Button, Card, Form, InputNumber, message} from 'antd';
import React from 'react';
import '../member/Profile.css'
import {Link, useNavigate} from "react-router-dom";
import {useStore} from "../../store";


export default function Renewal () {
    const navigate=useNavigate()
    const {loginStore}=useStore()

    const onFinish = async (values) => {
        navigate(`/payment?id=${loginStore.member_id}&&amount=${values.amount}`)
    }

    const onFinishFailed =async(err) => {
        console.log('Failed:', err)
    }

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
                        <Breadcrumb.Item>Renewal</Breadcrumb.Item>
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
