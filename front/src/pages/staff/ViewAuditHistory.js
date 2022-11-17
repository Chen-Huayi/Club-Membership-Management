import {EditOutlined, SearchOutlined} from '@ant-design/icons'
import {Breadcrumb, Button, Card, Input, Space, Table} from 'antd'
import React, {useEffect, useRef, useState} from 'react'
import {Link, useNavigate} from "react-router-dom";
import {useStore} from "../../store";

export default function ViewAuditHistory () {
    const {userStore, updateStore}=useStore()
    const navigate=useNavigate()
    const searchInput = useRef(null)
    const [params, setParams] = useState({
        page: 1,
        per_page: 10
    })
    const [record, setRecord]=useState({
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
            title: 'Effective Date',
            dataIndex: 'effective_date',
            key: 'effective_date',
            ...getColumnSearchProps('effective_date'),
            sorter: (a, b) => a.effective_date.localeCompare(b.effective_date),
        },
        {
            title: 'Expire Date',
            dataIndex: 'expire_date',
            key: 'expire_date',
            ...getColumnSearchProps('expire_date'),
            sorter: (a, b) => a.expire_date.localeCompare(b.expire_date),
        },
        {
            title: 'Payment Date',
            dataIndex: 'payment_date',
            key: 'payment_date',
            ...getColumnSearchProps('payment_date'),
            sorter: (a, b) => a.payment_date.localeCompare(b.payment_date),
        },
        {
            title: 'Approved By',
            dataIndex: 'approved_by',
            key: 'approved_by',
            ...getColumnSearchProps('approved_by'),
            sorter: (a, b) => a.approved_by.localeCompare(b.approved_by),
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

    const buildRecordList=(records)=>{
        const recordList = records.record_list
        const size = recordList.length
        let list=[]

        for (let i = 0; i < size; i++) {
            const record=recordList[i]
            let formatData={
                ...record,
                key: `${i}`
            }
            list.push(formatData)
        }
        return list
    }

    // load member list
    useEffect(() => {
        const loadList=async ()=>{
            const records = await userStore.getMembershipRecord({params})
            let recordList

            recordList=buildRecordList(records)
            setRecord({
                list: recordList,
                count: recordList.length,
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
                    <Breadcrumb.Item>Audit History</Breadcrumb.Item>
                </Breadcrumb>
            }
            style={{ marginBottom: 20 }}
        >
            <h2>{record.count} membership record(s) in total</h2>

            <Table
                columns={columns}
                dataSource={record.list}
                pagination={{
                    pageSize: params.per_page,
                    total: record.count,
                    onChange: pageChange
                }}
            />
        </Card>
    )
}

