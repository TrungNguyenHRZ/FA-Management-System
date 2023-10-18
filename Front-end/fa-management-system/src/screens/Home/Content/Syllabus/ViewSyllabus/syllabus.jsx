import React, { useEffect, useState } from "react";
import apiSyllabusInstance from "../../../../../service/api-syllabus";
import ReactPaginate from "react-paginate";
import {
  FaSearch,
  FaRegCalendar,
  FaUpload,
  FaPlusCircle,
} from "react-icons/fa";
import { SyncLoader } from "react-spinners";
import "./syllabus.css";

import { Link } from "react-router-dom";

import { number } from "yup";

const Syllabus = () => {
  const [list, setList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [syllabus, setSyllabus] = useState({});
  const [code, setCode] = useState(0);

  const [TotalPage, setTotalPage] = useState(0);
  const [thisPage, setThisPage] = useState(0);

  useEffect(() => {
    apiSyllabusInstance
      .get("/view")
      .then((response) => {
        console.log(response.data);
        setList(response.data);
        setTotalPage(Math.ceil(response.data.length / 9));
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
        setTotalPage(Math.ceil(response.data.length / 9));
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => setIsLoading(false));
  };

  //--------------Test view syllabus by code---------------
  // let topic_code = "";
  // const viewSyllabus = (topic_code) => {
  // //   setIsLoading(true);
  //   apiSyllabusInstance
  //     .get(`/viewSyllabus/${topic_code}`)
  //     .then((response) => {
  //       setSyllabus(response.data);
  //       console.log(response.data);
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     })
  // //     .finally(() => setIsLoading(false));
  //   console.log("abc");
  // }

  // const getCode = (code) =>{
  //   console.log(code);
  // }

  const handlePageClick = (data) => {
    setThisPage(data.selected);
    console.log(data.selected);
  };

  let renderData = () => {
    return list.slice(thisPage * 9, (thisPage + 1) * 9).map((item) => (
      <tr key={item.topic_code}>
        <td>{item.topic_name}</td>
        <td>{item.topic_code}</td>
        <td>{item.createdDate}</td>

        <td>{item.create_by}</td>
        <td>NULL</td>
        <td>NULL</td>
        <td>{item.publish_status}</td>
      </tr>
    ));
  };

  return (
    <div className="view-syllbus-container">
      <h1>Syllabus</h1>
      <div className="head-syllabus-container">
        <div className="search-syllabus-container">
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
          <div className="search-date">
            <FaRegCalendar />
            <input type="date" className="search-input-date" />
          </div>
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
              <tr key={item.topic_code}>
                <td>
                  <Link
                    style={{ textDecoration: "none", color: "inherit" }}
                    to={`/syllabus-detail/${item.topic_code}`}
                  >
                    {item.topic_name}
                  </Link>
                </td>
                <td>{item.topic_code}</td>
                <td>{item.createdDate}</td>
                <td>{item.create_by}</td>
                <td>NULL</td>
                <td>NULL</td>
                <td>{item.publish_status}</td>
              </tr>
            ))}

            {renderData()}
          </tbody>
        </table>
        <ReactPaginate
          breakLabel="..."
          nextLabel="next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={2}
          //marginPagesDisplayed={3}
          pageCount={TotalPage}
          previousLabel="< previous"
          containerClassName={"pagination"}
          pageClassName={"page-item"}
          pageLinkClassName={"page-link"}
          previousClassName="page-item"
          previousLinkClassName="page-link"
          nextClassName="page-item"
          nextLinkClassName="page-link"
          breakClassName="page-item"
          breakLinkClassName="page-link"
          activeClassName="active"
        />
      </div>
    </div>
  );
};

export default Syllabus;
