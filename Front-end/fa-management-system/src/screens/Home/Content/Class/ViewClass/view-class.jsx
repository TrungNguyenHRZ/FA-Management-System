import React, { useEffect, useState } from "react";
import apiClassInstance from "../../../../../service/api-class";
import ReactPaginate from "react-paginate";
import UpdateClass from "../UpdateClass/update-class";
import {
  FaSearch,
  // FaRegCalendar,
  // FaUpload,
  // FaPlusCircle,
} from "react-icons/fa";
import "./view-class.css";

const ViewClass = () => {
  const [id, setId] = useState("");
  const [list, setList] = useState([]);
  const [TotalPage, setTotalPage] = useState(0);
  const [thisPage, setThisPage] = useState(0);
  const [showFormAddUser, setShowFormAddUser] = useState(false);
  const [Item, setItem] = useState(1);

  const itemPerPage = 9;

  useEffect(() => {
    apiClassInstance
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

  // if (showFormAddUser == false) {
  //   apiClassInstance
  //     .get("/all")
  //     .then((response) => {
  //       setList(response.data.payload);
  //       setTotalPage(Math.ceil(response.data.payload.length / itemPerPage));
  //       console.log(list);
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });
  // }

  const openForm = (e) => {
    setItem(e.target.value);
    setShowFormAddUser(true);
  };

  const closeForm = () => {
    setShowFormAddUser(false);
  };

  const updateForm = () => {
    setShowFormAddUser(false);
    apiClassInstance
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

  const change = (e) => {
    setId(e.target.value);
    console.log(id);
  };

  const submit = (e) => {
    apiClassInstance
      .get(`/searchClassByKeyword?key=${id}`)
      .then((response) => {
        setList(response.data.payload);
        console.log(list);
        setTotalPage(Math.ceil(response.data.payload.length / itemPerPage));
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handlePageClick = (data) => {
    setThisPage(data.selected);
    console.log(data.selected);
  };

  return (
    <div className="view-syllbus-container">
      <h1>View Class</h1>
      {showFormAddUser && (
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
      )}
      <div className="search-text">
        <input type="text" className="search-input-text" onChange={change} />
        <button className="btn-search-class" onClick={submit}>
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
              <th>...</th>
            </tr>
          </thead>
          <tbody>
            {list
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
              ))}
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

export default ViewClass;
