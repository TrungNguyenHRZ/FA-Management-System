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
import Authorization from "../../../../Authentication/Auth";
import { FormControlLabel, Switch, styled } from "@mui/material";

const UserList = () => {
  const [list, setList] = useState([]);
  const [showFormAddUser, setShowFormAddUser] = useState(false);
  const [TotalPage, setTotalPage] = useState(0);
  const [thisPage, setThisPage] = useState(0);
  const [checkboxStates, setCheckboxStates] = useState([]);
  const navigate = useNavigate();
  const itemPerPage = 9;

  useEffect(() => {
    Authorization();
  }, []);

  useEffect(() => {
    const token = Cookies.get("token");
    const decodedToken = jwtDecode(token);

    if (decodedToken.userInfo[0] !== "Supper_Admin") {
      navigate("/overview");
    }
  }, []);

  useEffect(() => {
    apiUserInstance
      .get("/all")
      .then((response) => {
        setList(response.data.userResponseList);
        setTotalPage(
          Math.ceil(response.data.userResponseList.length / itemPerPage)
        );
        const initialState = response.data.userResponseList.map((item) => ({
          id: item.id,
          checked: item.status === "ACTIVE",
        }));
        setCheckboxStates(initialState);
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
    const updatedCheckboxStates = checkboxStates.map((state) => {
      if (state.id === item.id) {
        return {
          ...state,
          checked: !state.checked,
        };
      }
      return state;
    });

    setCheckboxStates(updatedCheckboxStates);
    let flag = updatedCheckboxStates.find((state) => state.id === item.id)
      .checked
      ? "ACTIVE"
      : "IN_ACTIVE";

    // console.log(flag);

    let gender = item.gender;
    await apiUserInstance
      .put(`/update/${item.id}`, {
        name: item.name,
        phone: item.phone,
        dob: item.dob,
        genderTrueMale: gender === "Male" ? 1 : 0,
        status: flag,
      })
      .then(function (response) {
        // console.log("role updated: " + response);
        if (flag === "ACTIVE") {
          toast.success(
            <div>
              <strong style={{ fontWeight: "bold", color: "green" }}>
                ACTIVATE
              </strong>{" "}
              <br />
              <strong>{item.email}</strong> successfully !!!
            </div>
          );
        } else {
          toast.success(
            <div>
              <strong style={{ fontWeight: "bold", color: "red" }}>
                DEACTIVATE
              </strong>{" "}
              <br />
              <strong>{item.email}</strong> successfully !!!
            </div>
          );
        }
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
        // console.log(response.data.userResponseList);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const ChangeStatus = async (e, item) => {
    let tmp = e.target.value.toUpperCase();
    if (tmp == "SUPPER_ADMIN") {
      tmp = "SUPER_ADMIN";
    }

    await apiUserInstance
      .put(`/gant-permission/${item}`, {
        newPermission: tmp,
      })
      .then((response) => {
        console.log(response.data);
      });

    await apiUserInstance
      .get("/all")
      .then((response) => {
        setList(response.data.userResponseList);
        setTotalPage(
          Math.ceil(response.data.userResponseList.length / itemPerPage)
        );
        const initialState = response.data.userResponseList.map((item) => ({
          id: item.id,
          checked: item.status === "ACTIVE",
        }));
        setCheckboxStates(initialState);
      })
      .catch((error) => {
        console.error(error);
      });
    toast.success("Change User Permission successfully !!!");
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
                checkboxStates={checkboxStates}
                setCheckboxStates={setCheckboxStates}
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
              <th className="th-user-list-status">Activate</th>
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

                    <td>
                      <select
                        className={
                          item.userType === "Admin"
                            ? "td-status-admin"
                            : item.userType === "Trainer"
                            ? "td-status-trainer"
                            : "td-status-superAdmin"
                        }
                        onChange={(e) => ChangeStatus(e, item.id)}
                      >
                        <option
                          value="Admin"
                          selected={item.userType == "Admin"}
                          className="td-status-admin"
                        >
                          Admin
                        </option>
                        <option
                          value="Trainer"
                          selected={item.userType == "Trainer"}
                          className="td-status-trainer"
                        >
                          Trainer
                        </option>
                        <option
                          value="Supper_Admin"
                          selected={item.userType == "Supper_Admin"}
                          className="td-status-superAdmin"
                        >
                          Supper_Admin
                        </option>
                      </select>
                    </td>
                    <td className="cb-user-list-status">
                      <Switch
                        type="checkbox"
                        checked={
                          (
                            checkboxStates.find(
                              (state) => state.id === item.id
                            ) || {}
                          ).checked || false
                        }
                        onChange={() => handleCheckBoxChange(item)}
                      />
                    </td>
                    <div>
                      <ToastContainer
                        position="top-center"
                        // position="top-right"
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
          </tbody>
        </table>
        <div className="view-user-pagination">
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

export default UserList;
