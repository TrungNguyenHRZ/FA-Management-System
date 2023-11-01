import React, { useEffect, useState } from "react";
import apiClassInstance from "../../../../../service/api-class";
import apiTrainingProgramInstance from "../../../../../service/ClassApi/api-trainingProgram";
import "./create-class.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import jwtDecode from "jwt-decode";
import Cookies from "js-cookie";
const CreateClass = () => {
  const [listTrainingProgram, setListTrainingProgram] = useState([]);
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    apiTrainingProgramInstance
      .get("/all")
      .then((response) => {
        setListTrainingProgram(response.data);
      })
      .catch((error) => {
        console.error(error);
      });

    const token = Cookies.get("token");
    if (token) {
      const decodedToken = jwtDecode(token);
      setUserInfo(decodedToken);
    }
  }, []);

  let className = null;
  const changeName = (e) => {
    className = e.target.value;
    console.log(className);
  };

  let classCode = null;
  const changeCode = (e) => {
    classCode = e.target.value;
  };

  let classDuration = null;
  const changeDuration = (e) => {
    classDuration = e.target.value;
  };

  let classLocation = null;
  const changeLocation = (e) => {
    classLocation = e.target.value;
  };

  let classFsu = null;
  const changeFsu = (e) => {
    classFsu = e.target.value;
  };

  let classStart_date = null;
  const changeStart_date = (e) => {
    classStart_date = e.target.value;
  };

  let classStatus = null;
  const changeStatus = (e) => {
    classStatus = e.target.value;
  };

  let classEnd_date = null;
  const changeEnd_date = (e) => {
    classEnd_date = e.target.value;
  };

  let classCreate_by = null;
  const changeCreate_by = (e) => {
    classCreate_by = e.target.value;
  };

  let classTrainingProgram_id = null;
  const changeTrainingProgram_id = (e) => {
    classTrainingProgram_id = e.target.value;
  };

  const add = (e) => {
    apiClassInstance
      .post("/CreateClass", {
        className: className,
        classCode: classCode,
        duration: classDuration,
        status: classStatus,
        location: classLocation,
        fsu: classFsu,
        start_date: classStart_date,
        end_date: classEnd_date,
        create_by: classCreate_by,
        trainingProgram_id: classTrainingProgram_id,
      })
      .then(function (response) {
        console.log(response);
        if (response.data.message === null) {
          toast.success("Add class successfully !!!");
        } else {
          toast.error(
            "Add class failed !!! " + response.data.message.className
          );
        }
      })
      .catch(function (error) {
        console.log(error);
        toast.error("Add class failed !!!");
      });
  };
  return (
    <div className="create-class-container">
      <div className={"toast-container"}></div>
      <div className="title-class">
        <h1>Add new class</h1>
      </div>
      <div className="table-class-container">
        <div className="table-class-left">
          {" "}
          <div className="input-class input-name">
            <label>Class name</label>
            <input type="text" onChange={changeName} />
          </div>
          <div className="input-class input-code">
            <label>Class code</label>
            <input type="text" onChange={changeCode} />
          </div>
          <div className="input-class input-duration">
            <label>Duration</label>
            <input type="text" onChange={changeDuration} />
          </div>
          <div className="input-class input-status">
            <label>Status</label>
            <input type="text" onChange={changeStatus} />
          </div>
          <div className="input-class input-location">
            <label>Location</label>
            <input type="text" onChange={changeLocation} />
          </div>
          <div className="input-class input-fsu">
            <label>FSU</label>
            <input type="text" onChange={changeFsu} />
          </div>
        </div>
        <div className="table-class-right">
          <div className="input-class-date input-start-end">
            <div className=" input-start-date">
              <label>Start date</label>
              <input type="date" onChange={changeStart_date} />
            </div>
            <div className=" input-end-date">
              <label>End date</label>
              <input type="date" onChange={changeEnd_date} />
            </div>
          </div>
          <div className="input-class input-create-by">
            <label>Create by</label>
            <input
              type="text"
              onChange={changeCreate_by}
              value={userInfo && userInfo.name}
              readOnly
            />
          </div>
          <div className="input-class input-training-program">
            <label>Training Program </label>
            <select
              className="select-training-program"
              onChange={changeTrainingProgram_id}
            >
              {listTrainingProgram?.map((item, index) => {
                return (
                  <option value={item.training_code} key={item.training_code}>
                    {item.training_name}
                  </option>
                );
              })}
            </select>
          </div>
          <button className="btn-class-create" onClick={add}>
            Add new
          </button>
        </div>
      </div>
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
    </div>
  );
};

export default CreateClass;
