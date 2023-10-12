import React from "react";
import PropTypes from "prop-types";

let search = "";

let tmp1 = (e) => {
  search = e.target.value;
  console.log(search);
};
const SearchSyllabus = (props) => {
  const todo = props.todoProps;
  const searchSyllabus = props.searchSyllabusFunction;

  return (
    <div className="class-container ">
      <h1>View Syllabus</h1>
      <input type="text" onChange={tmp1} />
      <button type="" onClick={() => searchSyllabus(search)}>
        submit
      </button>
      <table>
        <thead>
          <tr>
            <td>Syllabus</td>
            <td>Code</td>
            <td>Created on</td>
            <td>Created by</td>
            <td>Duration</td>
            <td>Output Standard</td>
            <td>Status</td>
          </tr>
        </thead>
        <tbody>
          {todo.map((item, index) => (
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
  );
};

export default SearchSyllabus;
