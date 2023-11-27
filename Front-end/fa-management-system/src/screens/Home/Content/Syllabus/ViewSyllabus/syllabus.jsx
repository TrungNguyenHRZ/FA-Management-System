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
import { Outlet, useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { Avatar } from "@mui/material";
const Syllabus = () => {
  const [list, setList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [TotalPage, setTotalPage] = useState(0);
  const [thisPage, setThisPage] = useState(0);
  const [keyword, setKeyword] = useState("");
  const itemPerPage = 9;
  const navigate = useNavigate();

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
    apiSyllabusInstance
      .get(`search/${e.target.value}`)
      .then((response) => {
        setList(response.data);
        setTotalPage(Math.ceil(response.data.length / itemPerPage));
      })
      .catch((error) => {
        console.error(error);
      });
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
    return list.length !== 0 ? (
      list.slice(thisPage * 9, (thisPage + 1) * 9).map((item, index) => (
        <tr key={item.topic_code}>
          <td>{index + 1 + thisPage * itemPerPage}</td>
          <td className="link-item-syllabus">
            <Link to={`/view-syllabus/${item.topic_code}`}>
              {item.topic_name}
            </Link>
          </td>
          <td>{item.topic_code}</td>
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
          <td>{Math.ceil(item.programDuration / 24)} days</td>
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
          <div
            className="add-import"
            onClick={() => navigate("/create-syllabus")}
          >
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
