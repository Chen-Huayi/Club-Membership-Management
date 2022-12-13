import React, {useEffect, useState} from "react";
import {useStore} from "../../store";
import {Breadcrumb, Card, message} from "antd";
import {Link} from "react-router-dom";


const DeleteNotification = (props) => {
    const {loginStore, userStore} = useStore()

    const onClick = () => {
        userStore.deleteNotification({member_id: loginStore.member_id, notificationContent: props.content})
        .then(result => {
            if (result.status === 0) {
                message.success('This notification has been deleted')
                window.location.reload()
            } else {
                message.error('Fail to delete')
            }
        }).catch(err => {
            throw Error(err)
        })
    }

    return <a type="primary" onClick={onClick} style={{fontWeight: 'bold'}}>Delete</a>
}


export default function Notification() {
    const [notificationList, setNotificationList] = useState([])
    const {loginStore, userStore} = useStore()

    useEffect(() => {
        const loadNotification = async () => {
            const result = await userStore.getNotificationEmail(loginStore.member_id)

            setNotificationList(result.notifications
                .reverse()  // make sure the new notification will display at the top
                .map((data, i) => (
                    <Card type="inner" title={data.title} key={i} extra={<DeleteNotification content={data.content}/>}>
                        {data.content}
                    </Card>
                ))
            )
        }
        loadNotification()
    }, [])

    return (
        <div className="notification-content">
            <Card
                title={
                    <Breadcrumb separator=">">
                        <Breadcrumb.Item>
                            <Link to="/">Home</Link>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>Notification</Breadcrumb.Item>
                    </Breadcrumb>
                }
            >
                <h2>Your notifications are below:</h2>
                {notificationList}
            </Card>
        </div>
    )
}
