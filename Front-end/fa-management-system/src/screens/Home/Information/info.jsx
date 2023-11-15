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
  const [enableEdit, setEnableEdit] = useState(false);

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

  const handleEdit = () => {
    setEnableEdit((prevEnableEdit) => !prevEnableEdit);
  };
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
          <div className="info-form-show">
            <label htmlFor="">Email:</label>
            <input
              type="email"
              value={listInfoUser.email || ""}
              readOnly
              disabled
            />
            <label htmlFor="">Name:</label>
            <input
              type="text"
              value={listInfoUser.name || ""}
              readOnly={!enableEdit}
              disabled={!enableEdit}
              onChange={(e) =>
                setListInfoUser({ ...listInfoUser, name: e.target.value })
              }
            />
            <label htmlFor="">Phone:</label>
            <input
              type="number"
              value={listInfoUser.phone || ""}
              readOnly={!enableEdit}
              disabled={!enableEdit}
              onChange={(e) =>
                setListInfoUser({ ...listInfoUser, phone: e.target.value })
              }
            />
            <label htmlFor="">Date of birth:</label>
            <input
              type="text"
              value={listInfoUser.dob || ""}
              readOnly={!enableEdit}
              disabled={!enableEdit}
              onChange={(e) =>
                setListInfoUser({ ...listInfoUser, dob: e.target.value })
              }
            />
          </div>
          <div className="info-form-action">
            {enableEdit ? (
              <React.Fragment className="info-form-save">
                <button className="info-form-cancel" onClick={handleEdit}>
                  Cancel
                </button>
                <button className="info-form-save">Save</button>
              </React.Fragment>
            ) : (
              <button className="info-form-edit" onClick={handleEdit}>
                Edit
              </button>
            )}
          </div>
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
