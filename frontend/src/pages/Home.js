/******************************************************************************************
 *
 * Home.js
 *
 * This is the main home page.
 *
 ******************************************************************************************/
import React from "react";
import "./Home.css";
import home_img from '../assets/home.png'
import {useStore} from "../store";


export default function Home() {
    const {loginStore}=useStore()

    return (
        <div className="home-page">
            <div className="home-page-content">
                <div className="userinfo-title">
                    Welcome back, {loginStore.user_name}!
                    <br/>
                    {loginStore.membership_status? '😍 You have' : '😢 You are not'} our membership
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

