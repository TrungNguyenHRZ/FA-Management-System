import React from "react";
import "./header.css";

const Header = () => {
  return (
    <div className="header-container">
      <div className="header-title">
        <h1>Fresher Academy Management System</h1>
      </div>
      <div className="header-login">
        <button>Login</button>
      </div>
    </div>
  );
};

export default Header;
