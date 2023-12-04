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
import { Avatar } from "@mui/material";
import "./view-class.css";
//import { Await } from "react-router";

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

  const openForm = (e) => {
    setItem(e.target.value);
    setShowFormAddUser(true);
    console.log(e.target.value);
  };

  const openForm1 = (e) => {
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
        console.log(response.data.payload);
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
  function stringToColor(string) {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = "#";

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
  }

  function stringAvatar(name) {
    return {
      sx: {
        bgcolor: stringToColor(name),
      },
      children: `${name.split(" ")[0][0]}`,
    };
  }
  let renderData = () => {
    if (list && list.length > 0) {
      return list
        .slice(thisPage * itemPerPage, (thisPage + 1) * itemPerPage)
        .map((item, index) => (
          <tr key={item.topic_code}>
            <td>{index + 1 + thisPage * itemPerPage}</td>
            <td>{item.className}</td>
            <td>{item.classCode}</td>
            <td>{item.createdDate}</td>
            <td className="td-user-list-name">
              <Avatar
                className="avatar-img"
                {...stringAvatar(`${item.create_by}`)}
                sx={{
                  width: 35,
                  height: 35,
                  bgcolor: stringToColor(`${item.create_by}`),
                }}
                style={{ fontSize: "15px" }}
              />
              {item.create_by}
            </td>
            <td>{item.duration} days</td>
            <td>
              <div
                className={
                  item.status === "Planning"
                    ? "td-status td-status-planning"
                    : item.status === "Opening"
                    ? "td-status td-status-opening"
                    : item.status === "Scheduled"
                    ? "td-status-scheduled"
                    : item.status === "Completed"
                    ? "td-status-completed"
                    : ""
                }
              >
                {item.status}
              </div>
            </td>

            <td>{item.location}</td>
            <td>{item.fsu}</td>
            <td>
              <div className="edit-class">
                <button
                  value={item.classId}
                  className="btn-edit-class"
                  onClick={openForm}
                >
                  ...
                </button>
              </div>
            </td>
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

  return (
    <div className="view-syllbus-container">
      <h1>View Class</h1>
      {showFormAddUser && (
        <div className="user-form-popup-container">
          <div className="user-form">
            <UpdateClass
              openForm={openForm1}
              closeForm={closeForm}
              classId={Item}
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
              <th>Class</th>
              <th>Class code</th>
              <th>Created on</th>
              <th>Created by</th>
              <th>Duration</th>
              <th className="th-view-class">Status</th>
              <th>Location</th>
              <th>FSU</th>
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

export default ViewClass;
