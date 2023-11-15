import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";
import React, { useState, useEffect } from "react";
import "./info.css";
import { RxAvatar } from "react-icons/rx";
import apiUserInstance from "../../../service/api-user";
import Authorization from "../../Authentication/Auth";

const Info = () => {
  const [info, setInfo] = useState({});
  const [infoId, setInfoId] = useState(0);
  const [listInfoUser, setListInfoUser] = useState([]);
  useEffect(() => {
    Authorization();
    const token = Cookies.get("token");
    if (token) {
      const decodedToken = jwtDecode(token);
      setInfo(decodedToken);
      setInfoId(info.id);
      console.log(infoId);
      apiUserInstance
        .get("/info/" + infoId)
        .then((response) => {
          setListInfoUser(response.data);
          console.log(typeof listInfoUser.userType);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [infoId]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };
  return (
    <div className="info-container">
      <h1 className="info-title">Your information</h1>
      <div className="info-content">
        <div className="info-form-container">
          <label htmlFor="">Email:</label>
          <input type="email" value={listInfoUser.email || ""} readOnly />
          <label htmlFor="">Name:</label>
          <input type="text" value={listInfoUser.name || ""} readOnly />
          <label htmlFor="">Phone:</label>
          <input type="number" value={listInfoUser.phone || ""} readOnly />
          <label htmlFor="">Date of birth:</label>
          <input type="text" value={listInfoUser.dob || ""} readOnly />
        </div>
        <div className="info-form-other">
          <div className="info-avatar">
            <RxAvatar />
          </div>
          <div
            className={
              "info-role " +
              (listInfoUser.userType === "Supper_Admin"
                ? "role-super-admin"
                : listInfoUser.userType === "Admin"
                ? "role-admin"
                : "role-trainer")
            }
          >
            {listInfoUser.userType || "null"}
          </div>
          <div className="info-status status-active">
            {listInfoUser.status || "null"}
          </div>
          <div className="info-create-date">
            Create at: {formatDate(listInfoUser.createdAt) || "null"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Info;
