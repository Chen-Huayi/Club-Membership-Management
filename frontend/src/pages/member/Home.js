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
    const {loginStore, memberStore}=useStore()
    const [userInfo, setUserInfo]=useState({
        name: loginStore.firstname,
        membership: loginStore.membership_status
    })

    useEffect(()=>{
        const loadInfo = async () => {
            await memberStore.getMemberInfo(loginStore.member_id)
                .then(result=>{
                    setUserInfo({
                        name: result.firstname,
                        membership: result.membership_status
                    })
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

