import React from "react";
import "./user-permission.css";

const UserPermission = () => {
  const roles = [
    { roleName: "Super admin", rolePermission: "Full access" },
    { roleName: "Admin", rolePermission: "Create" },
    { roleName: "Trainer", rolePermission: "View" },
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
      <select name="" id="">
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
                <td>{role.rolePermission}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserPermission;
