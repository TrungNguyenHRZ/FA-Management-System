import React, { useEffect, useState } from "react";
import apiTrainingProgramInstance from "../../../../../service/ClassApi/api-trainingProgram";
import ReactPaginate from "react-paginate";
import "./view-trainingprogram.css";
import {
  FaSearch,
  // FaRegCalendar,
  // FaUpload,
  // FaPlusCircle,
} from "react-icons/fa";
const ViewTrainingProgram = () => {
  const [id, setId] = useState("");
  const [list, setList] = useState([]);
  const [TotalPage, setTotalPage] = useState(0);
  const [thisPage, setThisPage] = useState(0);
  // const [showFormAddUser, setShowFormAddUser] = useState(false);
  // const [Item, setItem] = useState(1);

  const itemPerPage = 9;

  useEffect(() => {
    apiTrainingProgramInstance
      .get("/all")
      .then((response) => {
        setList(response.data);
        setTotalPage(Math.ceil(response.data.length / itemPerPage));
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  let renderData = () => {
    if (list && list.length > 0) {
      return list
        .slice(thisPage * itemPerPage, (thisPage + 1) * itemPerPage)
        .map((item, index) => (
          <tr key={item.training_code}>
            <td>{index + 1 + thisPage * itemPerPage}</td>
            <td>{item.training_name}</td>
            <td>{item.createdDate}</td>
            <td>{item.create_by}</td>
            <td>{item.duration} days</td>
            <td>
              <div
                className={
                  item.status === "Active"
                    ? "td-status-active"
                    : item.status === "Inactive"
                    ? "td-status-inactive"
                    : item.status === "Drafting"
                    ? "td-status-drafting"
                    : ""
                }
              >
                {item.status}
              </div>
            </td>
            <td>...</td>
          </tr>
        ));
    } else {
      return (
        <tr>
          <td colSpan="8">No data available</td>
        </tr>
      );
    }
  };
  const handlePageClick = (data) => {
    setThisPage(data.selected);
    console.log(data.selected);
  };

  const submit = (e) => {
    apiTrainingProgramInstance
      .get(`/${id}`)
      .then((response) => {
        setList(response.data);
        console.log(list);
        setTotalPage(Math.ceil(response.data.length / itemPerPage));
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const change = (e) => {
    setId(e.target.value);
    console.log(id);
  };

  return (
    <div className="view-syllbus-container">
      <h1>View Training Program</h1>
      {/* {showFormAddUser && (
        <div className="user-form-popup-container">
          <div className="user-form">
            <UpdateClass
              openForm={openForm}
              closeForm={closeForm}
              classId={Item}
              updateForm={updateForm}
            />
          </div>
        </div>
      )} */}
      <div className="search-text">
        <input
          type="text"
          className="search-input-text"
          onChange={change}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              submit();
            }
          }}
        />

        <button className="btn-search-class" onClick={submit}>
          <FaSearch />
        </button>
      </div>
      <div className="table-syllabus-container">
        <table className="table-syllabus">
          <thead>
            <tr>
              <th>No.</th>
              <th>Program name</th>
              <th>Created on</th>
              <th>Created by</th>
              <th>Duration</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {/* {
            list
              .slice(thisPage * itemPerPage, (thisPage + 1) * itemPerPage)
              .map((item) => (
                <tr key={item.classId}>
                  <td>{item.className}</td>
                  <td>{item.classCode}</td>
                  <td>{item.createdDate}</td>
                  <td>{item.create_by}</td>
                  <td>{item.duration}</td>
                  <td>{item.status}</td>
                  <td>{item.location}</td>
                  <td>{item.fsu}</td>
                  <td>
                    <div className="add-user">
                      <button
                        value={item.classId}
                        className="btn-add-user"
                        onClick={openForm}
                      >
                        Update Class
                      </button>
                    </div>
                  </td>
                </tr>
              ))} */}
            {renderData()}
          </tbody>
        </table>
        <div className="view-class-pagination">
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

export default ViewTrainingProgram;
