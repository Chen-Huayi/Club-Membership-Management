import React, { useContext } from "react";
import RegisterButton from "../components/RegisterButton";
import FindPlayDatesButton from "../components/FindPlayDatesButton";
import EditProfileButton from "../components/EditProfileButton";
import MyMatchesButton from "../components/MyMatchesButton";
import { AuthContext } from "../../components/context/auth-context";

import "./Home.css";
import home_img from '../../assets/home.png'
/******************************************************************************************
 *
 * Home.js
 *
 * This is the main home page.
 * It has buttons that allow the user to register a new account or log in *
 *
 ******************************************************************************************/
export default function Home(props) {
    const auth = useContext(AuthContext);
    const { userInfo } = useContext(AuthContext);

    return (
        <div className="home-page">
            <div className="home-page__content">
                {!auth.isLoggedIn && (
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
                {auth.isLoggedIn && (
                    <div className="home-page-logged">
                        <h2 className="user-info-title">
                            Welcome Back, {userInfo.ownerName}
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
