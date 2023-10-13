import React, { useEffect, useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { getListClass } from "../../../../../service/api-class";

let serSearchResult = null;

// await axios.get("http://localhost:8080/class/all").then((res) => {
//   serSearchResult = res.data.payload;
//   console.log(serSearchResult);
// });

const ViewClass = () => {
  //   const [list, setList] = useState([]);

  //   useEffect(() => {
  //     let mounted = true;
  //     getListClass().then((items) => {
  //       if (mounted) {
  //         setList(items);
  //       }
  //     });
  //     return () => (mounted = false);
  //   }, []);

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
            {serSearchResult.map((item, index) => (
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
