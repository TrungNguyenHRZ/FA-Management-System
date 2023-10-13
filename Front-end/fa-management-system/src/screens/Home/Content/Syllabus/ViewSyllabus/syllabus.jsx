import React, { useEffect, useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import apiSyllabusInstance from "../../../../../service/api-syllabus";
import {
  FaSearch,
  FaRegCalendar,
  FaUpload,
  FaPlusCircle,
} from "react-icons/fa";
import { SyncLoader } from "react-spinners";
import "./syllabus.css";

const Syllabus = () => {
  const [list, setList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    apiSyllabusInstance
      .get("/view")
      .then((response) => {
        setList(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  let id = "";
  const change = (e) => {
    id = e.target.value;
    console.log(id);
  };

  const submit = (e) => {
    setIsLoading(true);
    apiSyllabusInstance
      .get(`/view/${id}`)
      .then((response) => {
        setList(response.data);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <div className="view-syllbus-container">
      <h1>Syllabus</h1>
      <div className="head-syllabus-container">
        <div className="search-syllabus-container">
          <div className="form-container"></div>
          <div className="search-text">
            <input
              type="text"
              className="search-input-text"
              onChange={change}
            />
            <button className="btn-search" onClick={submit}>
              <FaSearch />
              Search
            </button>
          </div>
          {/* <div className="search-date">
              <FaRegCalendar />
              <input type="date" className="search-input-date" />
            </div> */}
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
      <div className="table-syllabus-container loading-container">
        {isLoading && (
          <div className="loading-overlay">
            <div className="loading-container">
              <SyncLoader color="#2a00b7" />
            </div>
          </div>
        )}
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
            {list.map((item, index) => (
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
