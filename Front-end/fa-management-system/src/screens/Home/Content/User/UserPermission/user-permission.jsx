import React from "react";
import "./user-permission.css";
import { FaCirclePlus, FaEye } from "react-icons/fa6";
import { BsFillStarFill } from "react-icons/bs";

const UserPermission = () => {
  const roles = [
    {
      roleName: "Super admin",
      rolePermission: "Full access",
      icon: <BsFillStarFill />,
    },
    { roleName: "Admin", rolePermission: "Create", icon: <FaCirclePlus /> },
    { roleName: "Trainer", rolePermission: "View", icon: <FaEye /> },
  ];

  const permissionOptions = [
    "Access denied",
    "View",
    "Modify",
    "Create",
    "Full access",
  ];

  const renderSelect = () => {
    return (
      <select name="" id="" defaultValue="Permission">
        <option selected disabled>
          Permission
        </option>
        {permissionOptions.map((value, i) => (
          <option key={i} value={value}>
            {value}
          </option>
        ))}
      </select>
    );
  };

  return (
    <div className="user-permission-container">
      <h1>User permission</h1>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Role name</th>
              <th>Syllabus</th>
              <th>Training program</th>
              <th>Class</th>
              <th>Learning material</th>
              <th>User</th>
            </tr>
          </thead>
          <tbody>
            {roles.map((role, index) => (
              <tr key={index}>
                <td>{role.roleName}</td>
                <td>{renderSelect()}</td>
                <td>{renderSelect()}</td>
                <td>{renderSelect()}</td>
                <td>{renderSelect()}</td>
                <td>
                  <span className="icon">{role.icon}</span>
                  {role.rolePermission}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="button-container">
        <button className="cancel-button">Cancel</button>
        <button className="save-button">Save</button>
      </div>
    </div>
  );
};

export default UserPermission;
