import React, { useEffect, useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import apiUserInstance from "../../../../../service/api-user";

const UserList = () => {
  const [list, setList] = useState([]);

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

  return (
    <div className="view-syllbus-container">
      <h1>View Users</h1>

      <div className="table-syllabus-container">
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
