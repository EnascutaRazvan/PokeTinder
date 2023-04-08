import React, { useState } from "react";
import "./NavBar.css";
import MenuIcon from "./photo.svg";

interface Props {
  userProfileImage?: string;
  children?: React.ReactNode;
}

const NavBar = (props: Props) => {
  const [showProfileOptions, setShowProfileOptions] = useState(false);

  const toggleProfileOptions = () => {
    setShowProfileOptions(!showProfileOptions);
  };

  const handleLogout = () => {
    localStorage.removeItem("id");
    window.location.href = "/login";
  };

  

  return (
    <nav className="navbar_component">
      <h1 className="navbar-title">PokéTinder</h1>
      <div className="navbar-profile" onClick={toggleProfileOptions}>
        <img
          className="navbar-profile-image"
          src={props.userProfileImage}
          alt="Profile"
        />
        {showProfileOptions && (
          <div className="whisper-animation">
            <div className="whisper-content">
              <ul className="profile-options-list">
                <li>Profile</li>
                <li onClick={handleLogout}>Logout</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
