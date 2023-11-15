import React, { useEffect, useState } from "react";
import apiUserInstance from "../../../../../service/api-user";
import "./user-list.css";
import { BiPlusCircle } from "react-icons/bi";
import AddUserForm from "./AddUser/add-user-form";
import { IoPerson } from "react-icons/io5";
import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";
import { useNavigate } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import ReactPaginate from "react-paginate";

const UserList = () => {
  const [list, setList] = useState([]);
  const [showFormAddUser, setShowFormAddUser] = useState(false);
  const [TotalPage, setTotalPage] = useState(0);
  const [thisPage, setThisPage] = useState(0);
  const itemPerPage = 9;

  useEffect(() => {
    const token = Cookies.get("token");
    apiUserInstance.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${token}`;
  });

  useEffect(() => {
    apiUserInstance
      .get("/all")
      .then((response) => {
        setList(response.data.userResponseList);
        setTotalPage(
          Math.ceil(response.data.userResponseList.length / itemPerPage)
        );
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const openForm = () => {
    setShowFormAddUser(true);
  };

  const closeForm = () => {
    setShowFormAddUser(false);
  };

  const updateForm = () => {
    setShowFormAddUser(false);
    apiUserInstance
      .get("/all")
      .then((response) => {
        setList(response.data.userResponseList);
        setTotalPage(
          Math.ceil(response.data.userResponseList.length / itemPerPage)
        );
        console.log(response.data.userResponseList);
      })
      .catch((error) => {
        console.error(error);
      });
    toast.success("Add User successfully !!!");
  };

  const handlePageClick = (data) => {
    setThisPage(data.selected);
    console.log(data.selected);
  };

  const handleCheckBoxChange = async (item) => {
    let flag = "ACTIVE";
    // if (item.status == "ACTIVE") {
    //   flag = "";
    // } else {
    //   flag = "ACTIVE";
    // }

    console.log(item);

    await apiUserInstance
      .put(`/update/${item.id}`, {
        name: item.name,
        phone: item.phone,
        dob: item.dob,
        genderTrueMale: 1,
        status: flag,
      })
      .then(function (response) {
        console.log(response);
      })
      .catch((error) => {
        console.error(error);
      });

    apiUserInstance
      .get("/all")
      .then((response) => {
        setList(response.data.userResponseList);
        setTotalPage(
          Math.ceil(response.data.userResponseList.length / itemPerPage)
        );
        console.log(response.data.userResponseList);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return (
    <div className="view-syllbus-container">
      <h1>View Users</h1>
      <div className="add-user">
        <button className="btn-add-user" onClick={openForm}>
          <BiPlusCircle />
          Add user
        </button>
      </div>
      <div className="table-syllabus-container">
        {showFormAddUser && (
          <div className="user-form-popup-container">
            <div className="user-form">
              <AddUserForm
                openForm={openForm}
                closeForm={closeForm}
                updateForm={updateForm}
              />
            </div>
          </div>
        )}
        <table className="table-syllabus">
          <thead>
            <tr>
              <th>No.</th>
              <th>Full name</th>
              <th>Email</th>
              <th>Date of birth</th>
              <th className="th-user-list-gender">Gender</th>
              <th className="th-user-list-type">Type</th>
              <th className="th-user-list-status">Status</th>
            </tr>
          </thead>
          <tbody>
            {list.length !== 0 ? (
              list
                .slice(thisPage * itemPerPage, (thisPage + 1) * itemPerPage)
                .map((item, index) => (
                  <tr key={item.id}>
                    <td>{index + 1}</td>
                    <td>{item.name}</td>
                    <td>{item.email}</td>
                    <td>{item.dob}</td>
                    <td
                      className={
                        item.gender == "Male"
                          ? "td-gender-male"
                          : "td-gender-female"
                      }
                    >
                      <IoPerson />
                    </td>
                    <td className="td-user-list-status">
                      <div
                        className={
                          item.userType === "Admin"
                            ? "td-status-admin"
                            : item.userType === "Trainer"
                            ? "td-status-trainer"
                            : "td-status-superAdmin"
                        }
                      >
                        {item.userType}
                      </div>
                    </td>
                    <td className="cb-user-list-status">
                      <input
                        type="checkbox"
                        checked={item.status}
                        onChange={() => handleCheckBoxChange(item)}
                      />
                    </td>
                    <div>
                      <ToastContainer
                        position="top-center"
                        autoClose={5000}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                        theme="light"
                      />
                    </div>
                  </tr>
                ))
            ) : (
              <tr>
                <td style={{ textAlign: "center" }} colSpan={7}>
                  No result found
                </td>
              </tr>
            )}

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
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserList;
