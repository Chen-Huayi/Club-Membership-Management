import {MailOutlined} from '@ant-design/icons'
import {Breadcrumb, Button, Card, message, Space, Table} from 'antd'
import React, {useEffect, useRef, useState} from 'react'
import {Link} from "react-router-dom";
import {useStore} from "../../store";
import {getFilterProps} from "../../utils";


export default function SendCardList() {
    const {userStore} = useStore()
    const searchInput = useRef(null)
    const [params, setParams] = useState({
        page: 1,
        per_page: 3
    })
    const [newCard, setNewCard] = useState({
        list: [],
        count: 0
    })
    const [replaceCard, setReplaceCard] = useState({
        list: [],
        count: 0
    })

    const pageChange = (page) => {
        setParams({
            ...params, page
        })
    }

    const sendCardToMember = (data) => {
        userStore.sendToEligibleMember({member_id: data.member_id})
        .then(result => {
            console.log(result)
            if (result.status === 0) {
                message.success('Membership card will deliver soon')
                setTimeout(() => {
                    window.location.reload()
                }, 700)
            } else {
                message.error('Fail to request send card to member')
            }
        })
    }

    const getColumnSearchProps = (dataIndex) => (
        getFilterProps(dataIndex, searchInput)
    )

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
        },
        {
            title: 'Mailing Address',
            dataIndex: 'address',
            key: 'address',
            ...getColumnSearchProps('address'),
        },
        {
            title: 'Effective Date',
            dataIndex: 'effective_date',
            key: 'effective_date',
            ...getColumnSearchProps('effective_date'),
            sorter: (a, b) => a.effective_date.localeCompare(b.effective_date),
        },
        {
            title: 'Send Card',
            render: data => {
                return (
                    <Space size="middle">
                        <Button
                            type="primary"
                            shape="round"
                            icon={<MailOutlined/>}
                            onClick={() => sendCardToMember(data)}
                        />
                    </Space>
                )
            }
        }
    ]

    const buildSendCardList = (sendCardList) => {
        const memberList = sendCardList.member_list
        const size = memberList.length
        let cards = []

        for (let i = 0; i < size; i++) {
            const user = memberList[i]
            let formatData = {
                ...user,
                name: user.firstname + ' ' + user.middle_name + ' ' + user.lastname,
                address: user.address_line1 + ' ' + user.address_line2 + ' ' + user.address_line3 + ' ' + user.address_city + ' ' + user.address_country,
                key: `${i}`
            }
            cards.push(formatData)
        }
        return cards
    }

    // load member list
    useEffect(() => {
        const loadList = async () => {
            const newCardList = await userStore.getSendCardList({params})
            const replaceCardList = await userStore.getReplaceCardList({params})
            let cardList

            cardList = buildSendCardList(newCardList)
            setNewCard({
                list: cardList,
                count: cardList.length,
            })

            cardList = buildSendCardList(replaceCardList)
            setReplaceCard({
                list: cardList,
                count: cardList.length,
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
                    <Breadcrumb.Item>Send Card List</Breadcrumb.Item>
                </Breadcrumb>
            }
            style={{marginBottom: 20}}
        >
            <h2>{newCard.count} eligible member(s) request to send card (activate since last Monday)</h2>
            <Table
                columns={columns}
                dataSource={newCard.list}
                pagination={{
                    pageSize: params.per_page,
                    total: newCard.count,
                    onChange: pageChange
                }}
            />
            <h2>{replaceCard.count} member(s) request to replace card</h2>
            <Table
                columns={columns}
                dataSource={replaceCard.list}
                pagination={{
                    pageSize: params.per_page,
                    total: replaceCard.count,
                    onChange: pageChange
                }}
            />
        </Card>
    )
}

