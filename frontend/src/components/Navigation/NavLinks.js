import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../context/auth-context";

import "./NavLinks.css";

export default function NavLinks() {
    const auth = useContext(AuthContext);
    return (
        <ul className="nav-links">
            {!auth.isLoggedIn && (
                <li>
                    <NavLink to="/login">Login</NavLink>
                </li>
            )}
            {auth.isLoggedIn && (
                <li>
                    <NavLink to={`/account`}>My Account</NavLink>
                </li>
            )}
            {auth.isLoggedIn && (
                <li>
                    <button onClick={auth.logout}>Logout</button>
                </li>
            )}
        </ul>
    );
}
