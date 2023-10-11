import React from "react";
import {
  FaSearch,
  FaRegCalendar,
  FaUpload,
  FaPlusCircle,
} from "react-icons/fa";
import "./syllabus.css";

const Syllabus = () => {
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
            <tr>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Syllabus;
