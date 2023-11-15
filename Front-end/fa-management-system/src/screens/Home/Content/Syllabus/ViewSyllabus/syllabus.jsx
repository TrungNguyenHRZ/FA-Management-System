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

const Syllabus = () => {
  const [list, setList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [TotalPage, setTotalPage] = useState(0);
  const [thisPage, setThisPage] = useState(0);
  const [keyword, setKeyword] = useState("");
  const itemPerPage = 9;

  useEffect(() => {
    apiSyllabusInstance
      .get("/view")
      .then((response) => {
        console.log(response.data);
        setList(response.data);
        setTotalPage(Math.ceil(response.data.length / itemPerPage));
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const change = (e) => {
    setKeyword(e.target.value);
    console.log(keyword);
  };

  const submit = (e) => {
    setIsLoading(true);
    apiSyllabusInstance
      .get(`search?keyword=${keyword}`)
      .then((response) => {
        setList(response.data);
        console.log(list);
        setTotalPage(Math.ceil(response.data.length / itemPerPage));
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => setIsLoading(false));
  };

  const handlePageClick = (data) => {
    setThisPage(data.selected);
    console.log(data.selected);
  };

  let renderData = () => {
    return list.length !== 0 ? (
      list.slice(thisPage * 9, (thisPage + 1) * 9).map((item, index) => (
        <tr key={item.topic_code}>
          <td>{index + 1 + thisPage * itemPerPage}</td>
          <td>
            <Link
              style={{ textDecoration: "none", color: "#d97bc5" }}
              to={`/view-syllabus/${item.topic_code}`}
            >
              {item.topic_name}
            </Link>
          </td>
          <td>{item.topic_code}</td>
          <td>{item.createdDate}</td>
          <td>{item.create_by}</td>
          <td>NULL</td>
          <td>NULL</td>
          <td className="td-syllabus-status">
            <div
              className={
                item && item.publish_status === "active"
                  ? "td-status-active"
                  : item.publish_status === "inactive"
                  ? "td-status-inactive"
                  : item.publish_status === "draft"
                  ? "td-status-drafting"
                  : ""
              }
            >
              {item.publish_status}
            </div>
          </td>
        </tr>
      ))
    ) : (
      <tr>
        <td style={{ textAlign: "center" }} colSpan={7}>
          <div className="loading-overlay">
            <div className="loading-container">
              <SyncLoader color="#2a00b7" />
            </div>
          </div>
        </td>
      </tr>
    );
  };

  return (
    <div className="view-syllbus-container">
      <h1>Syllabus</h1>
      <div className="head-syllabus-container">
        <div className="search-syllabus-container">
          <div className="search-text-syllabus">
            <input
              type="text"
              className="search-input-text-syllabus"
              onChange={change}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  submit();
                }
              }}
            />
            <button className="btn-search-syllabus" onClick={submit}>
              <FaSearch />
            </button>
          </div>
          <div className="search-date">
            <FaRegCalendar />
            <input
              type="date"
              className="search-input-date"
              onChange={change}
            />
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
              <th>No.</th>
              <th>Syllabus</th>
              <th>Code</th>
              <th>Create on</th>
              <th>Create by</th>
              <th>Duration</th>
              <th>Output standard</th>
              <th className="th-syllabus-status">Status</th>
            </tr>
          </thead>

          <tbody>{renderData()}</tbody>
        </table>
        <div className="syllabus-pagination">
          <ReactPaginate
            breakLabel="..."
            nextLabel=">"
            onPageChange={handlePageClick}
            pageRangeDisplayed={2}
            //marginPagesDisplayed={3}
            pageCount={TotalPage}
            previousLabel="<"
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
    </div>
  );
};

export default Syllabus;
