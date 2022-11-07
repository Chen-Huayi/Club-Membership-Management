import React from "react";
import RegisterButton from "../components/Home/RegisterButton";
import FindPlayDatesButton from "../components/Home/FindPlayDatesButton";
import EditProfileButton from "../components/Home/EditProfileButton";
import MyMatchesButton from "../components/Home/MyMatchesButton";
import "./Home.css";
import home_img from '../assets/home.png'
import {useStore} from "../store";

/******************************************************************************************
 *
 * Home.js
 *
 * This is the main home page.
 * It has buttons that allow the user to register a new account or log in *
 *
 ******************************************************************************************/
export default function Home() {
    const {loginStore}=useStore()

    return (
        <div className="home-page">
            <div className="home-page__content">
                {!loginStore.token && (
                    <div className="home-page-not-logged">
                        <h1>Green Space Club</h1>
                        <div className="home-page__introduction" data-testid="body">
                            Want to be a membership of Club?
                        </div>
                        <div className="home-page__image" data-testid="photo">
                            <img
                                src={home_img}
                                alt="homePageImage"
                            />
                        </div>
                        <div data-testid="button">
                            <RegisterButton />
                        </div>
                    </div>
                )}
                {loginStore.token && (
                    <div className="home-page-logged">
                        <h2 className="user-info-title">
                            Welcome Back, {loginStore.user_name}
                        </h2>
                        <FindPlayDatesButton />
                        <EditProfileButton />
                        <MyMatchesButton />
                    </div>
                )}
            </div>
        </div>
    );
}
