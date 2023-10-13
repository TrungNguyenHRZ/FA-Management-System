import React, { useEffect, useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { getListSyllabus } from "../../../../../service/api-syllabus";
import {
  FaSearch,
  FaRegCalendar,
  FaUpload,
  FaPlusCircle,
} from "react-icons/fa";
import "./syllabus.css";

let serSearchResult = null;

await axios.get("http://localhost:8080/syllabus/view").then((res) => {
  serSearchResult = res.data;
  console.log(serSearchResult);
});

const Syllabus = () => {
  //   const [list, setList] = useState([]);

  //   useEffect(() => {
  //     let mounted = true;
  //     getListSyllabus().then((items) => {
  //       if (mounted) {
  //         setList(items);
  //       }
  //     });
  //     return () => (mounted = false);
  //   }, []);

  return (
    <div className="view-syllbus-container">
      <h1>Syllabus</h1>
      <div className="head-syllabus-container">
        <div className="search-syllabus-container">
          <form action="" className="form-container">
            <div className="search-text">
              <FaSearch />
              <input type="text" className="search-input-text" />
            </div>
            <div className="search-date">
              <FaRegCalendar />
              <input type="date" className="search-input-date" />
            </div>
          </form>
        </div>
        <div className="action-syllabus-container">
          <div className="action-import">
            <button className="button-import-syllabus">
              <FaUpload />
              Import
            </button>
          </div>
          <div className="add-import">
            <button className="button-add-syllabus">
              <FaPlusCircle />
              Add syllabus
            </button>
          </div>
        </div>
      </div>
      <div className="table-syllabus-container">
        <table className="table-syllabus">
          <thead>
            <tr>
              <th>Syllabus</th>
              <th>Code</th>
              <th>Create on</th>
              <th>Create by</th>
              <th>Duration</th>
              <th>Output standard</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {serSearchResult.map((item, index) => (
              <tr key={index}>
                <td>{item.topic_name}</td>
                <td>{item.topic_code}</td>
                <td>{item.createdDate}</td>

                <td>{item.create_by}</td>
                <td>NULL</td>
                <td>NULL</td>
                <td>{item.publish_status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Syllabus;
