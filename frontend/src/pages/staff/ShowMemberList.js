import {EditOutlined, SearchOutlined, UserAddOutlined, UserDeleteOutlined} from '@ant-design/icons'
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

    const editMemberInfo=(data)=>{
        navigate(`/update-profile?id=${data.member_id}`)
    }

    const switchMemberStatus=async (data)=>{
        let res

        if (data.membership_status){
            res = await userStore.deactivateMember({member_id: data.member_id})
        }else {
            res = await userStore.activateMember({member_id: data.member_id})
        }
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
            title: 'Member ID',
            dataIndex: 'member_id',
            key: 'member_id',
            ...getColumnSearchProps('member_id'),
            sorter: (a, b) => a.member_id.localeCompare(b.member_id),
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
                        {data.membership_status && (
                            <Button
                                type="primary"
                                danger
                                shape="circle"
                                icon={<UserDeleteOutlined />}
                                onClick={()=>switchMemberStatus(data)}
                            />
                        )}
                        {!data.membership_status && (
                            <Button
                                type="primary"
                                shape="circle"
                                icon={<UserAddOutlined />}
                                onClick={()=>switchMemberStatus(data)}
                            />
                        )}
                    </Space>
                )
            }
        }
    ]

    // load member list
    useEffect(() => {
        const loadList=async ()=>{
            const active = await userStore.getActiveMemberList({params})
            const inactive = await userStore.getInactiveMemberList({params})
            const activeList = active.member_list
            const inactiveList = inactive.member_list
            const activeSize = activeList.length
            const inactiveSize = inactiveList.length
            let activeMembers=[], inactiveMembers=[]

            for (let i = 0; i < activeSize; i++) {
                let formatData={
                    ...activeList[i],
                    birthday: activeList[i].birthday_year+'/'+activeList[i].birthday_month+'/'+activeList[i].birthday_date,
                    key: `${i}`
                }
                activeMembers.push(formatData)
            }
            for (let i = 0; i < inactiveSize; i++) {
                let formatData={
                    ...inactiveList[i],
                    birthday: inactiveList[i].birthday_year+'/'+inactiveList[i].birthday_month+'/'+inactiveList[i].birthday_date,
                    key: `${i}`
                }
                inactiveMembers.push(formatData)
            }
            setActiveMember({
                list: activeMembers,
                count: activeSize,
            })
            setInactiveMember({
                list: inactiveMembers,
                count: inactiveSize,
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
                <h2>{activeMember.count} active members in total</h2>
                <Table
                    // rowKey="id"
                    columns={columns}
                    dataSource={activeMember.list}
                    pagination={{
                        pageSize: params.per_page,
                        total: activeMember.count,
                        onChange: pageChange
                    }}
                />
                <h2>{inactiveMember.count} inactive members in total</h2>
                <Table
                    columns={columns}
                    dataSource={inactiveMember.list}
                    pagination={{
                        pageSize: params.per_page,
                        total: inactiveMember.count,
                        onChange: pageChange
                    }}
                />
            </Card>
        </Layout>
    )
}

