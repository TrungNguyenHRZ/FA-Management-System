import React, { useEffect, useState } from "react";
import "./header.css";
import jwtDecode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { BiLogOut } from "react-icons/bi";
import Cookies from "js-cookie";
import { RxAvatar } from "react-icons/rx";

const Header = () => {
  const [userInfo, setUserInfo] = useState({});
  const [info, setInfo] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      const decodedToken = jwtDecode(token);
      setUserInfo(decodedToken);
      setInfo(decodedToken.userInfo);
    }
  }, []);

  const handleLogout = () => {
    Cookies.remove("token");
    navigate("/login");
  };

  return (
    <div className="header-container">
      <div className="header-title">
        <div className="logo-header">
          <img
            src="https://insacmau.com/wp-content/uploads/2023/02/logo-FPT-Polytechnic-.png"
            alt=""
          />
        </div>
        <h1>Fresher Academy Management System</h1>
      </div>
      <div className="header-action">
        <div className="avatar-user">
          <RxAvatar />
        </div>
        <div className="user-action">
          <div
            className={
              info[0] === "Supper_Admin"
                ? "role-user role-user-super-admin"
                : info[0] === "Admin"
                ? "role-user role-user-admin"
                : "role-user role-user-trainer"
            }
          >
            {userInfo ? userInfo.userInfo : "null"}
          </div>

          <div className="name-user">{userInfo ? userInfo.name : "null"}</div>
        </div>
        <div className="logout-user" onClick={handleLogout}>
          <BiLogOut />
        </div>
      </div>
    </div>
  );
};

export default Header;
