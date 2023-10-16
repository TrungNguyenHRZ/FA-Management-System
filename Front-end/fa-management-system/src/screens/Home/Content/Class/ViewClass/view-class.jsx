import React, { useEffect, useState } from "react";
import apiClassInstance from "../../../../../service/api-class";

const ViewClass = () => {
  const [list, setList] = useState([]);

  useEffect(() => {
    apiClassInstance
      .get("/all")
      .then((response) => {
        setList(response.data.payload);
        console.log(list);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div className="view-syllbus-container">
      <h1>View Class</h1>

      <div className="table-syllabus-container">
        <table className="table-syllabus">
          <thead>
            <tr>
              <th>Class</th>
              <th>Class code</th>
              <th>Created on</th>
              <th>Created by</th>
              <th>Duration</th>
              <th>Status</th>
              <th>Location</th>
              <th>FSU</th>
            </tr>
          </thead>
          <tbody>
            {list?.map((item, index) => (
              <tr key={index}>
                <td>{item.className}</td>
                <td>{item.classCode}</td>
                <td>{item.createdDate}</td>
                <td>{item.create_by}</td>
                <td>{item.duration}</td>
                <td>{item.status}</td>
                <td>{item.location}</td>
                <td>{item.fsu}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewClass;
