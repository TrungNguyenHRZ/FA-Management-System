import React, { useEffect, useState } from "react";
import "./header.css";
import jwtDecode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { BiLogOut } from "react-icons/bi";
import Cookies from "js-cookie";
import { RxAvatar } from "react-icons/rx";
import { Avatar } from "@mui/material";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
const Header = () => {
  const [userInfo, setUserInfo] = useState({});
  const [info, setInfo] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      const decodedToken = jwtDecode(token);
      setUserInfo(decodedToken);
      setInfo(decodedToken.permission);
    }
  }, []);

  const handleLogout = () => {
    Cookies.remove("token");
    navigate("/login");
  };
  const handleViewInfo = () => {
    navigate("/view-info");
  };
  function stringToColor(string) {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = "#";

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
  }

  function stringAvatar(name) {
    return {
      sx: {
        bgcolor: stringToColor(name),
      },
      children: `${name.split(" ")[0][0]}`,
    };
  }

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
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
          <Avatar
            className="avatar-img"
            {...stringAvatar(`${userInfo.name}`)}
            sx={{
              width: 50,
              height: 50,
              bgcolor: stringToColor(`${userInfo.name}`),
            }}
          />
        </div>
        <div className="user-action">
          <div
            className={
              info === "Super admin"
                ? "role-user role-user-super-admin"
                : info === "Admin"
                ? "role-user role-user-admin"
                : "role-user role-user-trainer"
            }
          >
            {info ? info : "null"}
          </div>

          <div className="name-user">
            <Button
              className="btn-name-user"
              id="basic-button"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
            >
              {userInfo ? userInfo.name : "null"}
            </Button>
          </div>
        </div>
        {/* <div className="logout-user" onClick={handleLogout}>
          <BiLogOut />
        </div> */}
      </div>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem
          onClick={() => {
            handleViewInfo();
            handleClose();
          }}
        >
          Profile
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleLogout();
            handleClose();
          }}
        >
          Logout
        </MenuItem>
      </Menu>
    </div>
  );
};

export default Header;
