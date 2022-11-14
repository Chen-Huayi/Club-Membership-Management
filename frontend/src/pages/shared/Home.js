/******************************************************************************************
 *
 * Home.js
 *
 * This is the main home page.
 *
 ******************************************************************************************/
import React, {useEffect, useState} from "react";
import "./Home.css";
import home_img from '../../assets/home.png'
import {useStore} from "../../store";


export default function Home() {
    const {loginStore, userStore}=useStore()
    const [userInfo, setUserInfo]=useState({
        name: loginStore.firstname+' '+loginStore.lastname,
        membership: loginStore.membership_status
    })

    useEffect(()=>{
        const loadInfo = async () => {
            let userInfo

            if (loginStore.user_role==='Club Member'){
                userInfo=await userStore.getMemberInfo(loginStore.member_id)
            }else if (loginStore.user_role==='Membership Admin'){
                userInfo=await userStore.getStaffInfo(loginStore.staff_id)
            }
            setUserInfo({
                name: userInfo.firstname+' '+userInfo.lastname,
                membership: userInfo.membership_status
            })
        }
        loadInfo()
    }, [])

    return (
        <div className="home-page">
            <div className="home-page-content">
                <div className="userinfo-title">
                    Welcome back, {userInfo.name}!
                    <br/>
                    {userInfo.membership? '😍 You are' : '😢 You are not'} our membership
                </div>
                <div className="home-page-image">
                    <img
                        src={home_img}
                        alt="homePageImage"
                    />
                </div>
            </div>
        </div>
    )
}
