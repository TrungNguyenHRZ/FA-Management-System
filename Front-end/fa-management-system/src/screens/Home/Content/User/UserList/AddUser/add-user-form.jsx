import React from "react";
import "./add-user-form.css";
import { MdClose } from "react-icons/md";
import apiUserInstance from "../../../../../../service/api-user";

const AddUserForm = ({ showForm, closeForm }) => {
  const handleCloseForm = (e) => {
    e.preventDefault();
    closeForm();
  };
  const handleOverlayClick = (e) => {
    if (e.target.classList.contains("user-form-popup-container")) {
      closeForm();
    }
  };

  let FullName = "";
  const changeFullName = (e) => {
    FullName = e.target.value;
  };

  let Email = "";
  const changeEmail = (e) => {
    Email = e.target.value;
  };

  let Phone = "";
  const changePhone = (e) => {
    Phone = e.target.value;
  };

  let Date = null;
  const changeDate = (e) => {
    Date = e.target.value;
  };

  let Gender = "true";
  const changeGender = (e) => {
    Gender = e.target.value;
    console.log(Gender);
  };

  let Status = "IN_ACTIVE";
  const changeStatus = (e) => {
    if (Status === "ACTIVE") {
      Status = "IN_ACTIVE";
    } else {
      Status = "ACTIVE";
    }

    console.log(Status);
    console.log({
      name: FullName,
      email: Email,
      phone: Phone,
      dob: Date,
      genderTrueMale: Gender,
      status: Status,
      password: Password,
    });
  };

  let Password = "";
  const changePassword = (e) => {
    Password = e.target.value;
    console.log(Status);
  };

  // let Role = "Super admin";
  // const changeRole = (e) => {
  //   Role = e.target.value;
  //   console.log(Role);

  // };

  const add = (e) => {
    // e.preventDefault();
    apiUserInstance
      .post("/create-sp-admin", {
        name: FullName,
        email: Email,
        phone: Phone,
        dob: Date,
        genderTrueMale: Gender,
        status: Status,
        password: Password,
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div className="user-form-popup-container" onClick={handleOverlayClick}>
      <div className="user-form">
        <div className="btn-close-form">
          <button onClick={handleCloseForm}>
            <MdClose />
          </button>
        </div>
        {/* <form action="" className="user-form-container"> */}
        <div className="user-form-container">
          <div className="ip ip-name-email">
            {" "}
            <div className="user-name">
              <label htmlFor="full-name">Full name</label>
              <div className="input-form input-name">
                <input type="text" onChange={changeFullName} />
              </div>
            </div>
            <div className="user-email">
              <label htmlFor="email">Email</label>
              <div className="input-form input-email">
                <input type="email" onChange={changeEmail} />
              </div>
            </div>
          </div>
          <div className="ip ip-phone-doba">
            <div className="user-phone">
              <label htmlFor="phone">Phone</label>
              <div className="input-form input-phone">
                <input type="number" onChange={changePhone} />
              </div>
            </div>
            <div className="user-dob">
              {" "}
              <label htmlFor="">Birthday</label>
              <div className="input-form input-dob">
                <input type="date" onChange={changeDate} />
              </div>
            </div>
          </div>
          <div className="user-email">
            <label htmlFor="email">Password</label>
            <div className="input-form input-email">
              <input type="email" onChange={changePassword} />
            </div>
          </div>

          <div className="user-gender">
            <label>Gender:</label>
            <div className="user-gender-choice" onChange={changeGender}>
              <div className="gender-male">
                <label htmlFor="male">Male</label>
                <input type="radio" name="gender" value="true" />
              </div>
              <div className="gender-female">
                <label htmlFor="female">Female</label>
                <input type="radio" name="gender" value="false" id="female" />
              </div>
            </div>
          </div>

          <div className="user-isActive">
            <label htmlFor="">Active</label>
            <input type="checkbox" value={"ACTIVE"} onChange={changeStatus} />
          </div>
          {/* <div className="user-type">
            <select
              name=""
              id=""
              className="user-type-select"
              onChange={changeRole}
            >
              <option value="SUPER_ADMIN">Super admin</option>
              <option value="ADMIN">Admin</option>
              <option value="TRAINER">Trainer</option>
            </select>
          </div> */}
          <div className="btn-action-form">
            <button className="btn-action-save" onClick={add}>
              Save
            </button>
          </div>
        </div>
        {/* </form> */}
      </div>
    </div>
  );
};

export default AddUserForm;
