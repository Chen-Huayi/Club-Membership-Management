import {SendOutlined} from '@ant-design/icons'
import {Breadcrumb, Button, Card, Form, Input, message, Space} from 'antd'
import React from 'react'
import {Link} from "react-router-dom";
import {useStore} from "../../store";

const { TextArea } = Input;

export default function SendEmail () {
    const [form] = Form.useForm()
    const {userStore}=useStore()

    const onFinish = async(values)=> {
        form.resetFields()
        console.log(values)
        await userStore.sendGroupEmail(values)
        message.success('Email sent successfully!')
    }

    const onFinishFailed = (err) => {
        console.log('Failed: ', err)
    }

    return (
        <Card
            title={
                <Breadcrumb separator=">">
                    <Breadcrumb.Item>
                        <Link to="/">Home</Link>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>Send Group Email</Breadcrumb.Item>
                </Breadcrumb>
            }
            style={{ marginBottom: 20 }}
        >
            <h2>Send group email to all active members:</h2>
            <Form
                form={form}
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 16 }}
                initialValues={{ content: '' }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >
                <Form.Item
                    label="Title"
                    name="title"
                    rules={[{required: true, message: 'Please enter title'}]}
                >
                    <Input placeholder="Enter your title" maxLength={100}/>
                </Form.Item>
                <Form.Item
                    label="Content"
                    name="content"
                    rules={[{required: true, message: 'Please enter content'}]}
                >
                    <TextArea
                        rows={8}
                        showCount
                        allowClear
                        maxLength={1000}
                        placeholder="Enter your content here"
                    />
                </Form.Item>
                <Form.Item wrapperCol={{ offset: 4 }}>
                    <Space>
                        <Button size="large" type="primary" htmlType="submit" shape="round">
                            <SendOutlined />Send
                        </Button>
                    </Space>
                </Form.Item>
            </Form>
        </Card>
    )
}

