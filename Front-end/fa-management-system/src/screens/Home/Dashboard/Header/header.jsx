import React from "react";
import "./header.css";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="header-container">
      <div className="header-title">
        <h1>Fresher Academy Management System</h1>
      </div>
      <div className="header-login">
        <button>
          <Link to={"/login"}>Login</Link>
        </button>
      </div>
    </div>
  );
};

export default Header;
