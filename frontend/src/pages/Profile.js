import {Breadcrumb, Button, Card, DatePicker, Form, Input, message, Modal, Select} from 'antd';
import React, {useEffect, useState} from 'react';
import './Profile.css'
import {useStore} from "../store";
import {Link} from "react-router-dom";

const { Option } = Select
const formItemLayout = {
    labelCol: {
        sm: { span: 7 }
    },
    wrapperCol: {
        sm: { span: 12 }
    }
}


// Show update each personal information dialog
const UpdateItem = (props) => {
    const [form] = Form.useForm()
    const [open, setOpen] = useState(false)
    const {updateStore, loginStore, userStore}=useStore()

    const showDialog = () => {
        setOpen(true)
    }

    const handleOk = async () => {
        await form.validateFields()
            .then(value => {
                const userInfo={user_id: loginStore.user_id, attribute: props.attribute, value}

                updateStore.updateSingleAttribute(userInfo)
                    .then(result=>{
                        if (result.status===0){
                            message.success(result.message)
                            window.location.reload()
                        } else{
                            message.error(result.message)
                        }
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

    // backfill the user information to the form
    useEffect(()=>{
        const loadInfo = async () => {
            const profileData= await userStore.getUserInfo({user_id: loginStore.user_id})
            const {birthday, ...userInfo}=profileData
            // console.log(profileData.birthday)
            form.setFieldsValue({...userInfo})
        }
        if (open){
            loadInfo()
        }
    }, [open])

    return (
        <>
            <a type="primary" onClick={showDialog} style={{fontWeight: 'bold'}}>Update</a>
            <Modal
                title={`Update your ${props.attribute}`}
                open={open}
                onOk={handleOk}
                onCancel={handleCancel}
                okText="Confirm"
                cancelText="Cancel"
            >
                <Form form={form} name="form_in_modal" {...formItemLayout}>
                    {props.attribute==='name' && (<>
                        <Form.Item name="firstname" label="First Name" rules={[{required: true, message: 'Please enter your first name!'}]}>
                            <Input />
                        </Form.Item>
                        <Form.Item name="middle_name" label="Middle Name" initialValue="">
                            <Input />
                        </Form.Item>
                        <Form.Item name="lastname" label="Last Name" rules={[{required: true, message: 'Please enter your last name!'}]}>
                            <Input />
                        </Form.Item>
                    </>)}
                    {props.attribute==='gender' && (
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
                    )}
                    {props.attribute==='birthday' && (
                        <Form.Item
                            name="birthday"
                            label="Birthday"
                            rules={[{required: true, message: 'Please select your birthday!'}]}
                        >
                            <DatePicker />
                        </Form.Item>
                    )}
                    {props.attribute==='address' && (<>
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
                    </>)}
                    {props.attribute==='email' && (
                        <Form.Item
                            name="email"
                            label="E-mail"
                            rules={[
                                {type: 'email', message: 'The input is not valid E-mail!'},
                                {required: true, message: 'Please enter your E-mail!'}
                            ]}
                        >
                            <Input />
                        </Form.Item>
                    )}
                    {props.attribute==='phone' && (
                        <Form.Item
                            name="phone"
                            label="Phone Number"
                            rules={[{required: true, message: 'Please enter your phone number!'}]}
                        >
                            <Input style={{width: '100%'}}/>
                        </Form.Item>
                    )}
                </Form>
            </Modal>
        </>
    )
}


export default function Profile () {
    const [profile, setProfile] = useState({})
    const {loginStore, userStore}=useStore()

    useEffect(()=>{
        const loadInfo = async () => {
            const profileData= await userStore.getUserInfo({user_id: loginStore.user_id})
            setProfile({...profileData})
        }
        loadInfo()
    }, [])

    return (
        <div className="profile-content">
            <Card
                title={
                    <Breadcrumb separator=">">
                        <Breadcrumb.Item>
                            <Link to="/home">Home</Link>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>Profile</Breadcrumb.Item>
                    </Breadcrumb>
                }
            >
                <Card type="inner" title="USER ID">
                    {profile.user_id}
                </Card>
                <Card type="inner" title="NAME" extra={<UpdateItem attribute={'name'}/>}>
                    {profile.firstname} {profile.middle_name} {profile.lastname}
                </Card>
                <Card type="inner" title="GENDER" extra={<UpdateItem attribute={'gender'}/>}>
                    {(profile.gender==='male') ? 'Male' : (profile.gender==='female') ? 'Female' : 'Other'}
                </Card>
                <Card type="inner" title="BIRTHDAY" extra={<UpdateItem attribute={'birthday'}/>}>
                    {profile.birthday}
                </Card>
                <Card type="inner" title="ADDRESS" extra={<UpdateItem attribute={'address'}/>}>
                    {profile.address_line1}{profile.address_line2?`, ${profile.address_line2}`:''}{profile.address_line3?`, ${profile.address_line3}`:''}<br/>
                    {profile.address_city}, {profile.address_country}<br/>
                    {profile.address_postalcode}
                </Card>
                <Card type="inner" title="EMAIL" extra={<UpdateItem attribute={'email'}/>}>
                    {profile.email}
                </Card>
                <Card type="inner" title="PHONE NUMBER" extra={<UpdateItem attribute={'phone'}/>}>
                    {profile.phone}
                </Card>
                <Card type="inner" title="REGISTERED DATE">
                    {profile.registered_date}
                </Card>
                <Card type="inner" title="MEMBERSHIP EFFECTIVE DATE">
                    {profile.effective_date}
                </Card>
                <Card type="inner" title="MEMBERSHIP EXPIRE DATE">
                    {profile.expire_date}
                </Card>
                <Card type="inner" title="MEMBERSHIP STATUS">
                    {(profile.membership_status? 'Yes':'No')}
                </Card>

                {/*<Button style={{marginTop: 10}} type="primary" htmlType="submit" size="large" shape="round">*/}
                {/*    <Link to="/update-profile">Update My Profile</Link>*/}
                {/*</Button>*/}
            </Card>
        </div>
    )
}
