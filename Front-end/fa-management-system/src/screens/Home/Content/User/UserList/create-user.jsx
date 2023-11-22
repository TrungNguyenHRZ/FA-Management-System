import React, { useEffect, useState } from "react";

import apiUserInstance from "../../../../../service/api-user";
import { useNavigate } from "react-router";

const CreateUser = () => {
  const [list, setList] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    apiUserInstance
      .get("/all")
      .then((response) => {
        setList(response.data.userResponseList);
        console.log(list);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  let className;
  const changeName = (e) => {
    className = e.target.value;
  };

  let classType;
  const changeType = (e) => {
    classType = e.target.value;
  };

  let classEmail;
  const changeEmail = (e) => {
    classEmail = e.target.value;
  };

  let classPhone;
  const changePhone = (e) => {
    classPhone = e.target.value;
  };

  let classBirth;
  const changeBirth = (e) => {
    classBirth = e.target.value;
  };

  let classGender;
  const changeGender = (e) => {
    classGender = e.target.value;
  };

  let classStatus;
  const changeStatus = (e) => {
    classStatus = e.target.value;
  };

  let newClass = {
    className: className,
  };

  const add = (e) => {
    apiUserInstance
      .post("/CreateClass", newClass)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div className="view-syllbus-container">
      <h1>Add new user</h1>

      <div className="table-syllabus-container">
        <table className="table-syllabus">
          <tbody>
            <div>User type</div>
            <input type="text" onChange={changeType} />
            <div>Name</div>
            <input type="text" onChange={changeName} />
            <div>Email address</div>
            <input type="text" onChange={changeEmail} />
            <div>Phone</div>
            <input type="text" onChange={changePhone} />
            <div>Date of birth</div>
            <input type="text" onChange={changeBirth} />
            <div>Gender</div>
            <input type="text" onChange={changeGender} />
            <div>Status</div>
            <input type="text" onChange={changeStatus} />
            <button className="btn-search" onClick={add}>
              Add new
            </button>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CreateUser;
