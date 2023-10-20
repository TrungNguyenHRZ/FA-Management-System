import React, { useEffect, useState } from "react";
import apiClassInstance from "../../../../../service/api-class";
import ReactPaginate from "react-paginate";
import {
  FaSearch,
  // FaRegCalendar,
  // FaUpload,
  // FaPlusCircle,
} from "react-icons/fa";
import "./view-class.css";

const ViewClass = () => {
  const [list, setList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [TotalPage, setTotalPage] = useState(0);
  const [thisPage, setThisPage] = useState(0);
  const itemPerPage = 9;

  useEffect(() => {
    apiClassInstance
      .get("/all")
      .then((response) => {
        setList(response.data.payload);
        setTotalPage(Math.ceil(response.data.payload.length / itemPerPage));
        console.log(list);
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

  // const submit = (e) => {
  //   setIsLoading(true);
  //   apiSyllabusInstance
  //     .get(`/view/${id}`)
  //     .then((response) => {
  //       setList(response.data);
  //       setTotalPage(Math.ceil(response.data.length / itemPerPage));
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     })
  //     .finally(() => setIsLoading(false));
  // };

  const handlePageClick = (data) => {
    setThisPage(data.selected);
    console.log(data.selected);
  };

  let renderData = () => {
    return list
      .slice(thisPage * itemPerPage, (thisPage + 1) * itemPerPage)
      .map((item) => (
        <tr key={item.topic_code}>
          <td>{item.className}</td>
          <td>{item.classCode}</td>
          <td>{item.createdDate}</td>
          <td>{item.create_by}</td>
          <td>{item.duration}</td>
          <td>{item.status}</td>
          <td>{item.location}</td>
          <td>{item.fsu}</td>
        </tr>
      ));
  };

  return (
    <div className="view-syllbus-container">
      <h1>View Class</h1>
      <div className="search-text">
        <input type="text" className="search-input-text" onChange={change} />
        <button
          className="btn-search-class"
          // onClick={submit}
        >
          <FaSearch />
          Search
        </button>
      </div>
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
          <tbody>{renderData()}</tbody>
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

export default ViewClass;
