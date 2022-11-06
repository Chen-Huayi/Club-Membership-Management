import React from "react";
import "./EditProfileButton.css";

export default function EditProfileButton() {
    return (
        <a className="editProfileBtn" href="/updateAccInfo" role="button">
            Edit My Profile
        </a>
    );
}
