import {Breadcrumb, Card} from "antd";
import {Link} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {useStore} from "../../store";


export default function Membership () {
    const {loginStore, memberStore}=useStore()
    const [userInfo, setUserInfo]=useState({
        membership: loginStore.membership_status,
    })

    useEffect(()=>{
        const loadInfo = async () => {
            await memberStore.getMemberInfo(loginStore.member_id)
                .then(result=>{
                    setUserInfo({
                        membership: result.membership_status,
                        effectiveDate: result.effective_date,
                        expireDate: result.expire_date,
                    })
                })
        }
        loadInfo()
    }, [])

    return (
        <div className="membership-content">
            <Card
                title={
                    <Breadcrumb separator=">">
                        <Breadcrumb.Item>
                            <Link to="/">Home</Link>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>Membership</Breadcrumb.Item>
                    </Breadcrumb>
                }
            >
                <h2 align="center">{userInfo.membership? '😍 You are' : '😢 You are not'} our membership</h2>
                <h2>Effective date: </h2>{userInfo.effectiveDate}<br/><br/>
                <h2>Expire date: </h2>{userInfo.expireDate}<br/><br/>

                <div className="other-link" style={{fontWeight: "bold", marginBottom: 20}}>
                    <Link to="/renewal">Renewal</Link>
                </div>

            </Card>
        </div>
    )
}
