import {EditOutlined, SearchOutlined, UserAddOutlined, UserDeleteOutlined} from '@ant-design/icons'
import {Breadcrumb, Button, Card, Input, message, Space, Table} from 'antd'
import React, {useEffect, useRef, useState} from 'react'
import {Link, useNavigate} from "react-router-dom";
import {useStore} from "../../store";


export default function ShowStaffList () {
    const {userStore, updateStore}=useStore()
    const navigate=useNavigate()
    const searchInput = useRef(null)
    const [params, setParams] = useState({
        page: 1,
        per_page: 3
    })
    const [activeStaff, setActiveStaff]=useState({
        list: [],
        count: 0
    })
    const [inactiveStaff, setInactiveStaff]=useState({
        list: [],
        count: 0
    })

    const pageChange = (page)=>{
        setParams({
            ...params, page
        })
    }

    const editStaffInfo=(data)=>{
        navigate(`/update-staff-profile?id=${data.staff_id}`)
    }

    const switchStaffStatus=async (data)=>{
        let res

        if (data.membership_status){
            res = await updateStore.deactivateStaff({staff_id: data.staff_id})
        }else {
            res = await updateStore.activateStaff({staff_id: data.staff_id})
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
            title: 'Staff ID',
            dataIndex: 'staff_id',
            key: 'staff_id',
            ...getColumnSearchProps('staff_id'),
            sorter: (a, b) => a.staff_id.localeCompare(b.staff_id),
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
            title: 'Phone',
            dataIndex: 'phone',
            key: 'phone',
            ...getColumnSearchProps('phone'),
            sorter: (a, b) => a.phone.localeCompare(b.phone),
        },
        {
            title: 'User role',
            dataIndex: 'user_role',
            key: 'user_role',
            sorter: (a, b) => a.user_role.localeCompare(b.user_role),
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
                            onClick={()=>editStaffInfo(data)}
                        />
                        {data.membership_status && (
                            <Button
                                type="primary"
                                danger
                                shape="circle"
                                icon={<UserDeleteOutlined />}
                                onClick={()=>switchStaffStatus(data)}
                            />
                        )}
                        {!data.membership_status && (
                            <Button
                                type="primary"
                                shape="circle"
                                icon={<UserAddOutlined />}
                                onClick={()=>switchStaffStatus(data)}
                            />
                        )}
                    </Space>
                )
            }
        }
    ]

    const buildStaffList=(staffs)=>{
        const staffList = staffs.staff_list
        const size = staffList.length
        let list=[]

        for (let i = 0; i < size; i++) {
            const user=staffList[i]
            let formatData={
                ...user,
                name: user.firstname+' '+user.middle_name+' '+user.lastname,
                key: `${i}`
            }
            list.push(formatData)
        }
        return list
    }

    // load staff list
    useEffect(() => {
        const loadList=async ()=>{
            const active = await userStore.getActiveStaffList({params})
            const inactive = await userStore.getInactiveStaffList({params})
            let staffList

            staffList=buildStaffList(active)
            setActiveStaff({
                list: staffList,
                count: staffList.length,
            })

            staffList=buildStaffList(inactive)
            setInactiveStaff({
                list: staffList,
                count: staffList.length,
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
                    <Breadcrumb.Item>Staff List</Breadcrumb.Item>
                </Breadcrumb>
            }
            style={{ marginBottom: 20 }}
        >
            <h2>{activeStaff.count} active staffs in total</h2>
            <Table
                columns={columns}
                dataSource={activeStaff.list}
                pagination={{
                    pageSize: params.per_page,
                    total: activeStaff.count,
                    onChange: pageChange
                }}
            />
            <h2>{inactiveStaff.count} inactive staffs in total</h2>
            <Table
                columns={columns}
                dataSource={inactiveStaff.list}
                pagination={{
                    pageSize: params.per_page,
                    total: inactiveStaff.count,
                    onChange: pageChange
                }}
            />
        </Card>
    )
}
