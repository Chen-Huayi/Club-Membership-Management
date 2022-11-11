import {DeleteOutlined, EditOutlined, SearchOutlined} from '@ant-design/icons'
import {Breadcrumb, Button, Card, Input, Layout, message, Space, Table} from 'antd'
import React, {useEffect, useRef, useState} from 'react'
import {Link, useNavigate} from "react-router-dom";
import {useStore} from "../../store";


export default function ShowMemberList () {
    const {userStore}=useStore()
    const navigate=useNavigate()
    const searchInput = useRef(null)
    const [params, setParams] = useState({
        page: 1,
        per_page: 3
    })
    const [memberList, setMemberList]=useState({
        list: [],
        count: 0
    })

    const pageChange = (page)=>{
        setParams({
            ...params, page
        })
    }

    const editMemberInfo=(data)=>{
        navigate(`/update-profile?id=${data.user_id}`)
    }

    const deleteMember=async (data)=>{
        const res=await userStore.removeMember(data.user_id)

        if (res.status===0){
            message.success(res.message)
        }else {
            message.error(res.message)
        }
        setParams({
            ...params,
            page: 1
        })
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
            title: 'User ID',
            dataIndex: 'user_id',
            key: 'user_id',
            ...getColumnSearchProps('user_id'),
            sorter: (a, b) => a.user_id.localeCompare(b.user_id),
        },
        {
            title: 'First Name',
            dataIndex: 'firstname',
            key: 'firstname',
            ...getColumnSearchProps('firstname'),
            sorter: (a, b) => a.firstname.localeCompare(b.firstname),
        },
        {
            title: 'Birthday',
            dataIndex: 'birthday',
            key: 'birthday',
            ...getColumnSearchProps('birthday'),
            sorter: (a, b) => a.birthday.localeCompare(b.birthday),
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            ...getColumnSearchProps('email'),
            sorter: (a, b) => a.email.localeCompare(b.email),
        },
        {
            title: 'Address',
            dataIndex: 'address_line1',
            key: 'address_line1',
            ...getColumnSearchProps('address_line1'),
            sorter: (a, b) => a.address_line1.localeCompare(b.address_line1),
        },
        {
            title: 'Expire Date',
            dataIndex: 'expire_date',
            key: 'expire_date',
            ...getColumnSearchProps('expire_date'),
            sorter: (a, b) => a.expire_date.localeCompare(b.expire_date),
        },
        {
            title: 'Membership',
            dataIndex: 'membership_status',
            key: 'membership_status',
            sorter: (a, b) => a.membership_status.localeCompare(b.membership_status),
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
                            onClick={()=>editMemberInfo(data)}
                        />
                        <Button
                            type="primary"
                            danger
                            shape="circle"
                            icon={<DeleteOutlined />}
                            onClick={()=>deleteMember(data)}
                        />
                    </Space>
                )
            }
        }
    ]

    // load member list
    useEffect(() => {
        const loadList=async ()=>{
            const res = await userStore.getMemberList({params})
            const memberList=res.member_list
            const size=memberList.length
            let members=[]

            for (let i = 0; i < size; i++) {
                let temp
                if (memberList[i].membership_status===true){
                    temp={...memberList[i], membership_status: 'Yes', key: `${i}`}
                }else {
                    temp={...memberList[i], membership_status: 'No', key: `${i}`}
                }
                members.push(temp)
            }
            setMemberList({
                list: members,
                count: size,
            })
        }
        loadList()
    }, [params])

    return (
        <Layout style={{height: '100vh'}}>
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
                <h2>{memberList.count} registered members in total</h2>

                <Table
                    // rowKey="id"
                    columns={columns}
                    dataSource={memberList.list}
                    pagination={{
                        pageSize: params.per_page,
                        total: memberList.count,
                        onChange: pageChange
                    }}
                />
            </Card>
        </Layout>
    )
}

