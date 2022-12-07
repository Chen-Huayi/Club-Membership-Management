import {EditOutlined, SearchOutlined, UserAddOutlined, UserDeleteOutlined} from '@ant-design/icons'
import {Breadcrumb, Button, Card, Input, message, Space, Table, DatePicker} from 'antd'
import React, {useEffect, useRef, useState} from 'react'
import {Link, useNavigate} from "react-router-dom";
import {useStore} from "../../store";

const { RangePicker } = DatePicker;


export default function ViewDuration () {
    // const {userStore, updateStore}=useStore()
    // const navigate=useNavigate()
    // const searchInput = useRef(null)
    // const [params, setParams] = useState({
    //     page: 1,
    //     per_page: 3
    // })
    // const [activeMember, setActiveMember]=useState({
    //     list: [],
    //     count: 0
    // })
    // const [inactiveMember, setInactiveMember]=useState({
    //     list: [],
    //     count: 0
    // })
    //
    // const pageChange = (page)=>{
    //     setParams({
    //         ...params, page
    //     })
    // }
    //
    // const editMemberInfo=(data)=>{
    //     navigate(`/update-member-profile?id=${data.member_id}`)
    // }
    //
    // const switchMemberStatus=async (data)=>{
    //     let res
    //
    //     if (data.membership_status){
    //         res = await updateStore.deactivateMember({member_id: data.member_id})
    //     }else {
    //         res = await updateStore.activateMember({member_id: data.member_id})
    //     }
    //     if (res.status===0){
    //         message.success(res.message)
    //     }else {
    //         message.error(res.message)
    //     }
    //     setParams({
    //         ...params,
    //         page: 1
    //     })
    // }
    //
    // const handleSearch = (selectedKeys, confirm) => {
    //     confirm()
    // }
    //
    // const handleReset = (clearFilters) => {
    //     clearFilters()
    // }
    //
    // const getColumnSearchProps = (dataIndex) => ({
    //     filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
    //         <div
    //             style={{
    //                 padding: 8,
    //             }}
    //         >
    //             <Input
    //                 ref={searchInput}
    //                 placeholder={`Search ${dataIndex}`}
    //                 value={selectedKeys[0]}
    //                 onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
    //                 onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
    //                 style={{
    //                     marginBottom: 8,
    //                     display: 'block',
    //                 }}
    //             />
    //             <Space>
    //                 <Button
    //                     type="primary"
    //                     onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
    //                     icon={<SearchOutlined />}
    //                     size="small"
    //                     style={{width: 90}}
    //                 >
    //                     Search
    //                 </Button>
    //                 <Button
    //                     onClick={() => {
    //                         clearFilters && handleReset(clearFilters)
    //                         confirm({closeDropdown: false})
    //                     }}
    //                     size="small"
    //                     style={{width: 90}}
    //                 >
    //                     Reset
    //                 </Button>
    //                 <Button type="link" size="small" onClick={() => close()}>
    //                     Close
    //                 </Button>
    //             </Space>
    //         </div>
    //     ),
    //     filterIcon: (filtered) => (
    //         <SearchOutlined
    //             style={{
    //                 color: filtered ? '#1890ff' : undefined,
    //             }}
    //         />
    //     ),
    //     onFilter: (value, record) =>
    //         record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    //     onFilterDropdownOpenChange: (visible) => {
    //         if (visible) {
    //             setTimeout(() => searchInput.current?.select(), 100);
    //         }
    //     },
    // })
    //
    // const columns = [
    //     {
    //         title: 'Member ID',
    //         dataIndex: 'member_id',
    //         key: 'member_id',
    //         ...getColumnSearchProps('member_id'),
    //         sorter: (a, b) => a.member_id.localeCompare(b.member_id),
    //     },
    //     {
    //         title: 'Name',
    //         dataIndex: 'name',
    //         key: 'name',
    //         ...getColumnSearchProps('name'),
    //         sorter: (a, b) => a.name.localeCompare(b.name),
    //     },
    //     {
    //         title: 'Birthday',
    //         dataIndex: 'birthday',
    //         key: 'birthday',
    //         ...getColumnSearchProps('birthday'),
    //         sorter: (a, b) => a.birthday.localeCompare(b.birthday),
    //     },
    //     {
    //         title: 'Email',
    //         dataIndex: 'email',
    //         key: 'email',
    //         ...getColumnSearchProps('email'),
    //         sorter: (a, b) => a.email.localeCompare(b.email),
    //     },
    //     {
    //         title: 'Address',
    //         dataIndex: 'address_line1',
    //         key: 'address_line1',
    //         ...getColumnSearchProps('address_line1'),
    //         sorter: (a, b) => a.address_line1.localeCompare(b.address_line1),
    //     },
    //     {
    //         title: 'Expire Date',
    //         dataIndex: 'expire_date',
    //         key: 'expire_date',
    //         ...getColumnSearchProps('expire_date'),
    //         sorter: (a, b) => a.expire_date.localeCompare(b.expire_date),
    //     },
    //     {
    //         title: 'Operation',
    //         render: data => {
    //             return (
    //                 <Space size="middle">
    //                     <Button
    //                         type="primary"
    //                         shape="circle"
    //                         icon={<EditOutlined />}
    //                         onClick={()=>editMemberInfo(data)}
    //                     />
    //                     {data.membership_status && (
    //                         <Button
    //                             type="primary"
    //                             danger
    //                             shape="circle"
    //                             icon={<UserDeleteOutlined />}
    //                             onClick={()=>switchMemberStatus(data)}
    //                         />
    //                     )}
    //                     {!data.membership_status && (
    //                         <Button
    //                             type="primary"
    //                             shape="circle"
    //                             icon={<UserAddOutlined />}
    //                             onClick={()=>switchMemberStatus(data)}
    //                         />
    //                     )}
    //                 </Space>
    //             )
    //         }
    //     }
    // ]
    //
    // const buildMemberList=(members)=>{
    //     const memberList = members.member_list
    //     const size = memberList.length
    //     let list=[]
    //
    //     for (let i = 0; i < size; i++) {
    //         const user=memberList[i]
    //         let formatData={
    //             ...user,
    //             name: user.firstname+' '+user.middle_name+' '+user.lastname,
    //             birthday: user.birthday_year+'/'+user.birthday_month+'/'+user.birthday_date,
    //             key: `${i}`
    //         }
    //         list.push(formatData)
    //     }
    //     return list
    // }
    //
    // // load member list
    // useEffect(() => {
    //     const loadList=async ()=>{
    //         const active = await userStore.getActiveMemberList({params})
    //         const inactive = await userStore.getInactiveMemberList({params})
    //         let memberList
    //
    //         memberList=buildMemberList(active)
    //         setActiveMember({
    //             list: memberList,
    //             count: memberList.length,
    //         })
    //
    //         memberList=buildMemberList(inactive)
    //         setInactiveMember({
    //             list: memberList,
    //             count: memberList.length,
    //         })
    //     }
    //     loadList()
    // }, [params])
    //
    // return (
    //     <Card
    //         title={
    //             <Breadcrumb separator=">">
    //                 <Breadcrumb.Item>
    //                     <Link to="/">Home</Link>
    //                 </Breadcrumb.Item>
    //                 <Breadcrumb.Item>Member List</Breadcrumb.Item>
    //             </Breadcrumb>
    //         }
    //         style={{ marginBottom: 20 }}
    //     >
    //         <h2>{activeMember.count} active members in total</h2>
    //         <Space direction="vertical" size={12}>
    //             <RangePicker />
    //         </Space>
    //         <Table
    //             columns={columns}
    //             dataSource={activeMember.list}
    //             pagination={{
    //                 pageSize: params.per_page,
    //                 total: activeMember.count,
    //                 onChange: pageChange
    //             }}
    //         />
    //     </Card>
    // )
}

