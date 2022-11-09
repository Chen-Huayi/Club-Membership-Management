// import { SmileOutlined, UserOutlined } from '@ant-design/icons';
// import { Avatar, Button, Form, Input, InputNumber, Modal, Typography } from 'antd';
// import React, { useEffect, useRef, useState } from 'react';
// import './Profile.css'
// const layout = {
//     labelCol: {
//         span: 8,
//     },
//     wrapperCol: {
//         span: 16,
//     },
// };
// const tailLayout = {
//     wrapperCol: {
//         offset: 8,
//         span: 16,
//     },
// };
//
// // reset form fields when modal is form, closed
// const useResetFormOnCloseModal = ({ form, open }) => {
//     const prevOpenRef = useRef();
//     useEffect(() => {
//         prevOpenRef.current = open;
//     }, [open]);
//     const prevOpen = prevOpenRef.current;
//     useEffect(() => {
//         if (!open && prevOpen) {
//             form.resetFields();
//         }
//     }, [form, prevOpen, open]);
// };
//
//
// const ModalForm = ({ open, onCancel }) => {
//     const [form] = Form.useForm();
//     useResetFormOnCloseModal({
//         form,
//         open,
//     });
//     const onOk = () => {
//         form.submit();
//     };
//     return (
//         <Modal title="Basic Drawer" open={open} onOk={onOk} onCancel={onCancel}>
//             <Form form={form} layout="vertical" name="userForm">
//                 <Form.Item
//                     name="name"
//                     label="User Name"
//                     rules={[
//                         {
//                             required: true,
//                         },
//                     ]}
//                 >
//                     <Input />
//                 </Form.Item>
//                 <Form.Item
//                     name="age"
//                     label="User Age"
//                     rules={[
//                         {
//                             required: true,
//                         },
//                     ]}
//                 >
//                     <InputNumber />
//                 </Form.Item>
//             </Form>
//         </Modal>
//     );
// };
//
//
// const Profile = () => {
//     const [open, setOpen] = useState(false);
//     const showUserModal = () => {
//         setOpen(true);
//     };
//     const hideUserModal = () => {
//         setOpen(false);
//     };
//     const onFinish = (values) => {
//         console.log('Finish:', values);
//     };
//     return (
//         <>
//             <div className="profile-header"></div>
//             <Form.Provider
//                 onFormFinish={(name, { values, forms }) => {
//                     if (name === 'userForm') {
//                         const { basicForm } = forms;
//                         const users = basicForm.getFieldValue('users') || [];
//                         basicForm.setFieldsValue({
//                             users: [...users, values],
//                         });
//                         setOpen(false);
//                     }
//                 }}
//             >
//                 <Form {...layout} name="basicForm" onFinish={onFinish}>
//                     <Form.Item
//                         name="group"
//                         label="Group Name"
//                         rules={[
//                             {
//                                 required: true,
//                             },
//                         ]}
//                     >
//                         <Input />
//                     </Form.Item>
//                     <Form.Item
//                         label="User List"
//                         shouldUpdate={(prevValues, curValues) => prevValues.users !== curValues.users}
//                     >
//                         {({ getFieldValue }) => {
//                             const users = getFieldValue('users') || [];
//                             return users.length ? (
//                                 <ul>
//                                     {users.map((user, index) => (
//                                         <li key={index} className="user">
//                                             <Avatar icon={<UserOutlined />} />
//                                             {user.name} - {user.age}
//                                         </li>
//                                     ))}
//                                 </ul>
//                             ) : (
//                                 <Typography.Text className="ant-form-text" type="secondary">
//                                     ( <SmileOutlined /> No user yet. )
//                                 </Typography.Text>
//                             );
//                         }}
//                     </Form.Item>
//                     <Form.Item {...tailLayout}>
//                         <Button htmlType="submit" type="primary">
//                             Submit
//                         </Button>
//                         <Button
//                             htmlType="button"
//                             style={{
//                                 margin: '0 8px',
//                             }}
//                             onClick={showUserModal}
//                         >
//                             Add User
//                         </Button>
//                     </Form.Item>
//                 </Form>
//
//                 <ModalForm open={open} onCancel={hideUserModal} />
//             </Form.Provider>
//         </>
//
//     );
// };
// export default Profile;

import {Breadcrumb, Button, Card, DatePicker, Form, Input, List, message, Modal, Select} from 'antd';
import React, {useState} from 'react';
import './Profile.css'
import {useStore} from "../store";
import {Link} from "react-router-dom";
const { Option } = Select
const data = [
    {
        title: 'Title 1',
    },
    {
        title: 'Title 2',
    },
    {
        title: 'Title 3',
    },
    {
        title: 'Title 4',
    },
    {
        title: 'Title 5',
    },
    {
        title: 'Title 6',
    },
];




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

/*
const UpdateInfo =  () => {
    const [form] = Form.useForm()
    const [open, setOpen] = useState(false)
    const {updateStore, loginStore}=useStore()

    const showDialog = () => {
        setOpen(true)
    }

    const handleOk = async () => {
        await form.validateFields()
            .then(value => {
                const userInfo={...value, user_id: loginStore.user_id}

                updateStore.updateUserInfo(userInfo)
                    .then(result=>{
                        if (result.status===0)
                            message.success(result.message)
                        else
                            message.error(result.message)
                    })
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

    return (
        <>
            <a type="primary" onClick={showDialog}>Update profile</a>
            <Modal
                title="Update Information"
                open={open}
                onOk={handleOk}
                onCancel={handleCancel}
                okText="Confirm"
                cancelText="Cancel"
            >
                <Form
                    form={form}
                    {...formItemLayout}
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

                </Form>
            </Modal>
        </>
    )
}

*/



const Profile = () => {
    const [form] = Form.useForm()
    const [open, setOpen] = useState(false)
    const {updateStore, loginStore}=useStore()

    return (
        <div className="profile-content">

            {/*<div className="list">*/}
            {/*    <List*/}
            {/*        grid={{*/}
            {/*            gutter: 16,*/}
            {/*            // xs: 1,*/}
            {/*            // sm: 2,*/}
            {/*            // md: 4,*/}
            {/*            // lg: 4,*/}
            {/*            // xl: 6,*/}
            {/*            // xxl: 3,*/}
            {/*        }}*/}
            {/*        dataSource={data}*/}
            {/*        renderItem={(item) => (*/}
            {/*            <List.Item>*/}
            {/*                <Card title={item.title}>Card content</Card>*/}
            {/*            </List.Item>*/}
            {/*        )}*/}
            {/*    />*/}
            {/*</div>*/}

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
                <Link to="/update-profile">Update My Profile</Link>

            </Card>

        </div>

    )
}
export default Profile;