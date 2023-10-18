import React, { useState } from "react";
import "./header.css";
import { FaBell } from "react-icons/fa";
import { FaMessage } from "react-icons/fa6";

const Header = () => {
  const [isSubMenuUser, setIsSubMenuUser] = useState(false);

  const handleMouseEnter = () => {
    setIsSubMenuUser(true);
  };

  const handleMouseLeave = () => {
    setIsSubMenuUser(false);
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
            Super admin
          </div>
          <div
            className={`sub-menu-user ${
              isSubMenuUser ? "show-sub-menu-user" : ""
            }`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <div>Information</div>
            <div>Log out</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
