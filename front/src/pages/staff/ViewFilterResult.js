import {EditOutlined, SearchOutlined, UserAddOutlined, UserDeleteOutlined} from '@ant-design/icons'
import {Breadcrumb, Button, Card, Input, message, Space, Table, DatePicker, Form} from 'antd'
import React, {useEffect, useRef, useState} from 'react'
import {Link, useNavigate} from "react-router-dom";
import {useStore} from "../../store";

const { RangePicker } = DatePicker;


export default function ViewFilterResult () {
    const [form]=Form.useForm()
    const {userStore, updateStore}=useStore()
    const navigate=useNavigate()
    const searchInput = useRef(null)
    const [params, setParams] = useState({
        page: 1,
        per_page: 3
    })
    const [activeMember, setActiveMember]=useState({
        list: [],
        count: 0
    })
    const [inactiveMember, setInactiveMember]=useState({
        list: [],
        count: 0
    })

    const pageChange = (page)=>{
        setParams({
            ...params, page
        })
    }

    const viewMemberInfo=(data)=>{
        navigate(`/profile?id=${data.member_id}`)
    }

    const handleSearch = (selectedKeys, confirm) => {
        confirm()
    }

    const handleReset = (clearFilters) => {
        clearFilters()
    }

    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
            <div
                style={{
                    padding: 8,
                }}
            >
                <Input
                    ref={searchInput}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{
                        marginBottom: 8,
                        display: 'block',
                    }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{width: 90}}
                    >
                        Search
                    </Button>
                    <Button
                        onClick={() => {
                            clearFilters && handleReset(clearFilters)
                            confirm({closeDropdown: false})
                        }}
                        size="small"
                        style={{width: 90}}
                    >
                        Reset
                    </Button>
                    <Button type="link" size="small" onClick={() => close()}>
                        Close
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered) => (
            <SearchOutlined
                style={{
                    color: filtered ? '#1890ff' : undefined,
                }}
            />
        ),
        onFilter: (value, record) =>
            record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownOpenChange: (visible) => {
            if (visible) {
                setTimeout(() => searchInput.current?.select(), 100);
            }
        },
    })

    const columns = [
        {
            title: 'Member ID',
            dataIndex: 'member_id',
            key: 'member_id',
            ...getColumnSearchProps('member_id'),
            sorter: (a, b) => a.member_id.localeCompare(b.member_id),
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            ...getColumnSearchProps('name'),
            sorter: (a, b) => a.name.localeCompare(b.name),
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            ...getColumnSearchProps('email'),
            sorter: (a, b) => a.email.localeCompare(b.email),
        },
        {
            title: 'Register Date',
            dataIndex: 'registered_date',
            key: 'registered_date',
            ...getColumnSearchProps('registered_date'),
            sorter: (a, b) => a.registered_date.localeCompare(b.registered_date),
        },
        {
            title: 'Expire Date',
            dataIndex: 'expire_date',
            key: 'expire_date',
            ...getColumnSearchProps('expire_date'),
            sorter: (a, b) => a.expire_date.localeCompare(b.expire_date),
        },
        {
            title: 'Renewal Date',
            dataIndex: 'recent_renewal_date',
            key: 'recent_renewal_date',
            ...getColumnSearchProps('recent_renewal_date'),
            sorter: (a, b) => a.recent_renewal_date.localeCompare(b.recent_renewal_date),
        },
        {
            title: 'Operation',
            render: data => {
                return (
                    <Space size="middle">
                        <Button
                            type="primary"
                            shape="circle"
                            icon={<EditOutlined />}
                            onClick={()=>viewMemberInfo(data)}
                        />
                    </Space>
                )
            }
        }
    ]

    const buildMemberList=(members)=>{
        const memberList = members.member_list
        const size = memberList.length
        let list=[]

        for (let i = 0; i < size; i++) {
            const user=memberList[i]
            let formatData={
                ...user,
                name: user.firstname+' '+user.middle_name+' '+user.lastname,
                birthday: user.birthday_year+'/'+user.birthday_month+'/'+user.birthday_date,
                key: `${i}`
            }
            list.push(formatData)
        }
        return list
    }

    const onFinish = (values) => {
        console.log(values)

        // userStore.getMembershipRecord()
        //     .then(result => {
        //         if (result.status===0){
        //
        //         }
        //     })

    }

    const onFinishFailed = (err) => {
        console.log('Failed: ', err)
    }

    const resetForm = () => {
        form.resetFields()
    }

    // load member list
    useEffect(() => {
        const loadList=async ()=>{
            const active = await userStore.getActiveMemberList({params})
            const inactive = await userStore.getInactiveMemberList({params})
            let memberList

            memberList=buildMemberList(active)
            setActiveMember({
                list: memberList,
                count: memberList.length,
            })

            memberList=buildMemberList(inactive)
            setInactiveMember({
                list: memberList,
                count: memberList.length,
            })
        }
        loadList()
    }, [params])

    return (
        <Card
            title={
                <Breadcrumb separator=">">
                    <Breadcrumb.Item>
                        <Link to="/">Home</Link>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>Member List</Breadcrumb.Item>
                </Breadcrumb>
            }
            style={{ marginBottom: 20 }}
        >
            <h2>{activeMember.count} active members in total</h2>

            <Form
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                form={form}
                style={{ marginBottom: 20 }}
            >
                <Form.Item name="time_range" style={{display: 'inline-block'}} rules={[{required: true, message: 'Please pick a time range!'}]}>
                    <RangePicker />
                </Form.Item>
                <Form.Item style={{display: 'inline-block'}}>
                    <Button type="primary" htmlType="submit" shape="round" style={{ marginLeft: 30 }}>
                        Filter
                    </Button>
                    <Button type="ghost" onClick={resetForm} shape="round" style={{ marginLeft: 10 }}>
                        Reset
                    </Button>
                </Form.Item>
            </Form>

            <Table
                columns={columns}
                dataSource={activeMember.list}
                pagination={{
                    pageSize: params.per_page,
                    total: activeMember.count,
                    onChange: pageChange
                }}
            />
        </Card>
    )
}

