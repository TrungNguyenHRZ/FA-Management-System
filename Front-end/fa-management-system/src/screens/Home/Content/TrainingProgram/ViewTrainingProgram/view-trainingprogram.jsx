import React, { useEffect, useState } from "react";
import apiTrainingProgramInstance from "../../../../../service/ClassApi/api-trainingProgram";
import TrainingProgramDetail from "../TrainingProgramDetails/detail-trainingprogram";
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
  const [showFormAddUser, setShowFormAddUser] = useState(false);
  const [Item, setItem] = useState(1);
  // const [showFormAddUser, setShowFormAddUser] = useState(false);
  // const [Item, setItem] = useState(1);

  const itemPerPage = 9;

  useEffect(() => {
    apiTrainingProgramInstance
      .get("/all")
      .then((response) => {
        setList(response.data.payload);
        setTotalPage(Math.ceil(response.data.payload.length / itemPerPage));

        console.log(response.data.payload);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const OpenForm = (e) => {
    setItem(e.target.value);
    setShowFormAddUser(true);
  };

  let renderData = () => {
    if (list && list.length > 0) {
      return list
        .slice(thisPage * itemPerPage, (thisPage + 1) * itemPerPage)
        .map((item, index) => (
          <tr key={item.training_code}>
            <td>{index + 1 + thisPage * itemPerPage}</td>
            <td>
              <button
                className="btn-view-training-program"
                value={item.training_code}
                onClick={OpenForm}
              >
                {item.training_name}
              </button>
            </td>
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
      .get("/search-TP-by-keyword?key=" + id)
      .then((response) => {
        setList(response.data.payload);
        console.log(list);
        setTotalPage(Math.ceil(response.data.payload.length / itemPerPage));
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const change = (e) => {
    setId(e.target.value);
    console.log(id);
  };

  const openForm = (e) => {
    setShowFormAddUser(true);
  };

  const closeForm = () => {
    setShowFormAddUser(false);
  };

  const updateForm = () => {
    setShowFormAddUser(false);
    apiTrainingProgramInstance
      .get("/all")
      .then((response) => {
        setList(response.data.payload);
        setTotalPage(Math.ceil(response.data.payload.length / itemPerPage));

        console.log(response.data.payload);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="view-syllbus-container">
      <h1>View Training Program</h1>
      {showFormAddUser && (
        <div className="user-form-popup-container">
          <div className="user-form">
            <TrainingProgramDetail
              openForm={openForm}
              closeForm={closeForm}
              trainingProgramId={Item}
              updateForm={updateForm}
            />
          </div>
        </div>
      )}

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
          <tbody>{renderData()}</tbody>
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
