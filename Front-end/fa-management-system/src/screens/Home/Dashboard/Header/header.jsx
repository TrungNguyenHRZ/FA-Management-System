import React, { useEffect, useState } from "react";
import "./header.css";
import { FaBell } from "react-icons/fa";
import { FaMessage } from "react-icons/fa6";
import jwtDecode from "jwt-decode";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [isSubMenuUser, setIsSubMenuUser] = useState(false);
  const [userInfo, setUserInfo] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwtDecode(token);
      console.log(decodedToken);
      setUserInfo(decodedToken);
    }
  }, []);

  const handleMouseEnter = () => {
    setIsSubMenuUser(true);
  };

  const handleMouseLeave = () => {
    setIsSubMenuUser(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="header-container">
      <div className="header-title">
        <h1>Fresher Academy Management System</h1>
      </div>
      <div className="header-action">
        <div className="header-notification">
          <button className="btn-message">
            <FaMessage />
          </button>
          <button className="btn-notification">
            <FaBell />
          </button>
        </div>
        <div className="user">
          <div
            className="welcome-user"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            {userInfo ? userInfo.name : "null"}
          </div>

          <div
            className={`sub-menu-user ${
              isSubMenuUser ? "show-sub-menu-user" : ""
            }`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <div>Information</div>
            <div onClick={handleLogout}>Log out</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
