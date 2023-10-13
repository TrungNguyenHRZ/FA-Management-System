import React from "react";
import axios from "axios";
import PropTypes from "prop-types";

let serSearchResult = null;

await axios.get("http://localhost:8080/user/all").then((res) => {
  serSearchResult = res.data.userResponseList;
  console.log(serSearchResult);
});

const UserList = () => {
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
            {serSearchResult.map((item, index) => (
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
