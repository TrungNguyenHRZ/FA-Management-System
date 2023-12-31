import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";
import React, { useState, useEffect } from "react";
import "./info.css";
import { RxAvatar } from "react-icons/rx";
import apiUserInstance from "../../../service/api-user";
import Authorization from "../../Authentication/Auth";
import { useNavigate } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import { Avatar } from "@mui/material";

const Info = () => {
  const [info, setInfo] = useState({});
  const [listInfoUser, setListInfoUser] = useState({});
  const [enableEdit, setEnableEdit] = useState(false);

  const decodedToken = jwtDecode(Cookies.get("token"));

  useEffect(() => {
    Authorization();
  });

  useEffect(() => {
    setInfo(decodedToken);
    apiUserInstance
      .get("/info/" + decodedToken.id)
      .then((response) => {
        setListInfoUser(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [decodedToken.id]);

  const handleSave = async () => {
    const afterValue = {
      name: listInfoUser.name,
      phone: listInfoUser.phone,
      dob: listInfoUser.dob,
      genderTrueMale: listInfoUser.gender === "Male" ? true : false,
      status: listInfoUser.status,
    };
    console.log(listInfoUser);
    console.log(afterValue);
    console.log(`/update/${decodedToken.id}`, afterValue);
    await apiUserInstance
      .put(`/update/${decodedToken.id}`, afterValue)
      .then((response) => {
        console.log(response.data);
        toast.success("Update information successfully !!!");
      })
      .catch((error) => {
        console.error(error);
        toast.error("Update information failed !!!");
      });
    setEnableEdit(false);
  };
  const handleEdit = () => {
    setEnableEdit((prevEnableEdit) => !prevEnableEdit);
  };
  const handleInputChange = (e) => {
    setListInfoUser((prevInfo) => ({
      ...prevInfo,
      [e.target.name]: e.target.value,
    }));
  };
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
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
  return (
    <div className="info-container">
      <h1 className="info-title">{listInfoUser.name}'s information</h1>
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
              name="name"
              value={listInfoUser.name || ""}
              readOnly={!enableEdit}
              disabled={!enableEdit}
              onChange={handleInputChange}
            />
            <label htmlFor="">Phone:</label>
            <input
              type="number"
              name="phone"
              value={listInfoUser.phone || ""}
              readOnly={!enableEdit}
              disabled={!enableEdit}
              onChange={handleInputChange}
            />
            <label htmlFor="">Date of birth:</label>
            <input
              type="text"
              name="dob"
              value={listInfoUser.dob || ""}
              readOnly={!enableEdit}
              disabled={!enableEdit}
              onChange={handleInputChange}
            />
          </div>
          <div className="info-form-action">
            {enableEdit ? (
              <>
                <button className="info-form-cancel" onClick={handleEdit}>
                  Cancel
                </button>
                <button className="info-form-save" onClick={handleSave}>
                  Save
                </button>
              </>
            ) : (
              <button className="info-form-edit" onClick={handleEdit}>
                Edit
              </button>
            )}
          </div>
        </div>
        <div className="info-form-other">
          <div className="info-avatar">
            <Avatar
              {...stringAvatar(`${listInfoUser.name}`)}
              sx={{
                width: 150,
                height: 150,
                bgcolor: stringToColor(`${listInfoUser.name}`),
              }}
              style={{ fontSize: "60px" }}
            />
          </div>
          <div className="info-name">{listInfoUser.name}</div>
          <div
            className={
              "info-role " +
              (info.permission === "Super admin"
                ? "role-super-admin"
                : info.permission === "Admin"
                ? "role-admin"
                : "role-trainer")
            }
          >
            {info.permission || "null"}
          </div>
          <div className="info-status status-active">
            {listInfoUser.status || "null"}
          </div>
          <div className="info-create-date">
            Create at: {formatDate(listInfoUser.createdAt) || "null"}
          </div>
        </div>
      </div>
      <div>
        <ToastContainer
          position="top-center"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </div>
    </div>
  );
};

export default Info;
