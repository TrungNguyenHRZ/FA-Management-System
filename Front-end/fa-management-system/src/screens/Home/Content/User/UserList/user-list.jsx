import React, { useEffect, useState } from "react";
import apiUserInstance from "../../../../../service/api-user";
import "./user-list.css";
import { BiPlusCircle } from "react-icons/bi";
import AddUserForm from "./AddUser/add-user-form";

const UserList = () => {
  const [list, setList] = useState([]);
  const [showFormAddUser, setShowFormAddUser] = useState(false);

  useEffect(() => {
    apiUserInstance
      .get("/all")
      .then((response) => {
        setList(response.data.userResponseList);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const openForm = () => {
    setShowFormAddUser(true);
  };

  const closeForm = () => {
    setShowFormAddUser(false);
  };
  return (
    <div className="view-syllbus-container">
      <h1>View Users</h1>
      <div className="add-user">
        <button className="btn-add-user" onClick={openForm}>
          <BiPlusCircle />
          Add user
        </button>
      </div>
      <div className="table-syllabus-container">
        {showFormAddUser && (
          <div className="user-form-popup-container">
            <div className="user-form">
              <AddUserForm openForm={openForm} closeForm={closeForm} />
            </div>
          </div>
        )}
        <table className="table-syllabus">
          <thead>
            <tr>
              <th>ID</th>
              <th>Full name</th>
              <th>Email</th>
              <th>Date of birth</th>
              <th>Gender</th>
              <th>Type</th>
            </tr>
          </thead>
          <tbody>
            {list.map((item, index) => (
              <tr key={index}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.dob}</td>
                <td>{item.gender}</td>
                <td>{item.userType}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserList;
