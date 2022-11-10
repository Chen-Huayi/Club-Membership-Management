import {Link, useNavigate} from 'react-router-dom'
import {observer} from "mobx-react-lite";
import React, {useEffect, useState} from "react";
import {Breadcrumb, Button, Card, DatePicker, Form, Layout, Radio, Select, Space, Table, Tag} from 'antd'
import locale from 'antd/es/date-picker/locale/en_US'
import {DeleteOutlined, EditOutlined} from '@ant-design/icons'
// import img404 from 'assets/404.jpg'
import {http} from "../../utils";
import {useStore} from "../../store";
// import './article.scss'

const { Option } = Select
const { RangePicker } = DatePicker

function Article () {
    const {channelStore}=useStore()
    const [channels, setChannels]=useState([])
    const [articleList, setArticleList]=useState({
        list: [],
        count: 0
    })
    const [params, setParams] = useState({
        page: 1,
        per_page: 10
    })
    const navigate=useNavigate()


    const onFinish=(values)=>{
        const {channel_id , date, status}=values
        const parameter={}

        if (status!==-1){
            parameter.status = status
        }
        if (channel_id){
            parameter.channel_id = channel_id
        }
        if (date) {
            parameter.begin_pubdate = date[0].format('YYYY-MM-DD')
            parameter.end_pubdate = date[1].format('YYYY-MM-DD')
        }
        setParams({
            ...params, ...parameter
        })
    }


    const pageChange=(page)=>{
        setParams({
            ...params, page
        })
    }


    const publishArticle=(data)=>{
        navigate(`/publish?id=${data.id}`)
    }


    const deleteArticle=async (data)=>{
        await http.get(`/my/delete/${data.id}`)
        setParams({
            ...params,
            page: 1
        })
    }


    const columns = [
        {
            title: 'Cover',
            dataIndex: 'cover',
            width:120,
            render: cover => {
                return <img src={cover.images || ''}  width={80} height={60} alt="" />
            }
        },
        {
            title: 'Title',
            dataIndex: 'title',
            width: 220
        },
        {
            title: 'Status',
            dataIndex: 'status',
            render: data => <Tag color="green">Verified</Tag>
        },
        {
            title: 'Publish Date',
            dataIndex: 'pubdate'
        },
        {
            title: 'View',
            dataIndex: 'read_count'
        },
        {
            title: 'Comment',
            dataIndex: 'comment_count'
        },
        {
            title: 'Like',
            dataIndex: 'like_count'
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
                            onClick={()=>publishArticle(data)}
                        />
                        <Button
                            type="primary"
                            danger
                            shape="circle"
                            icon={<DeleteOutlined />}
                            onClick={()=>deleteArticle(data)}
                        />
                    </Space>
                )
            }
        }
    ]


    // // load article list
    // useEffect(() => {
    //     const loadList=async ()=>{
    //         const res = await http.get('/my/article', {params})
    //         const { articles, size } = res
    //         setArticleList({
    //             list: articles,
    //             count: size
    //         })
    //     }
    //     loadList()
    // }, [params])


    // Display channel options
    // useEffect(()=>{
    //     setChannels(channelStore.channelList.map((channel, i)=>(
    //         <Option key={i} value={i}>{channel}</Option>
    //     )))
    // }, [])


    return (
        <Layout style={{height: '100vh'}}>
            <Card
                title={
                    <Breadcrumb separator=">">
                        <Breadcrumb.Item>
                            <Link to="/home">Home</Link>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>Content</Breadcrumb.Item>
                    </Breadcrumb>
                }
                style={{ marginBottom: 20 }}
            >
                <Form
                    onFinish={onFinish}
                    initialValues={{ status: null }}>
                    <Form.Item label="Status" name="status">
                        <Radio.Group>
                            <Radio value={null}>All</Radio>
                            <Radio value={0}>Draft</Radio>
                            <Radio value={1}>To audit</Radio>
                            <Radio value={2}>Pass Audit</Radio>
                            <Radio value={3}>Failure Audit</Radio>
                        </Radio.Group>
                    </Form.Item>

                    <Form.Item label="Channel" name="channel_id">
                        <Select
                            placeholder="Please select channel"
                            style={{ width: 120 }}
                        >
                            {channels}
                        </Select>
                    </Form.Item>

                    <Form.Item label="Date" name="date">
                        <RangePicker locale={locale}></RangePicker>
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" style={{ marginLeft: 80 }}>
                            Filter
                        </Button>
                    </Form.Item>
                </Form>
            </Card>

            <Card title={`${articleList.count} results after selecting:`} style={{ marginBottom: 20 }}>
                <Table
                    rowKey="id"
                    columns={columns}
                    dataSource={articleList.list}
                    pagination={{
                        pageSize: params.per_page,
                        total: articleList.count,
                        onChange: pageChange
                    }}
                />
            </Card>
        </Layout>
    )
}

export default observer(Article)
