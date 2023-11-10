import React, { useEffect, useState } from "react";
import { MdClose } from "react-icons/md";
import apiClassInstance from "../../../../../service/api-class";
import apiTrainingProgramInstance from "../../../../../service/ClassApi/api-trainingProgram";
import jwtDecode from "jwt-decode";
import Cookies from "js-cookie";

const UpdateClass = ({ showForm, closeForm, classId, updateForm }) => {
  const [thisClass, setThisClass] = useState({});
  const [listTrainingProgram, setListTrainingProgram] = useState([]);
  const [userInfo, setUserInfo] = useState(null);

  let tmp1 = 0;
  tmp1 = classId;

  useEffect(() => {
    apiTrainingProgramInstance
      .get("/all")
      .then((response) => {
        setListTrainingProgram(response.data.payload);
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

  useEffect(() => {
    apiClassInstance
      .get(`/${tmp1}`)
      .then((response) => {
        setThisClass(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleCloseForm = (e) => {
    e.preventDefault();
    closeForm();
  };

  const handleOverlayClick = (e) => {
    if (e.target.classList.contains("user-form-popup-container")) {
      closeForm();
    }
  };
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

  let classCreatedDate = null;
  const changeCreatedDate = (e) => {
    classCreatedDate = e.target.value;
  };

  let classModified_date = null;
  const changeModified_date = (e) => {
    classModified_date = e.target.value;
  };

  let classModified_by = null;
  const changeModified_by = (e) => {
    classModified_by = e.target.value;
  };

  let classTrainingProgram_id = null;
  const changeTrainingProgram_id = (e) => {
    classTrainingProgram_id = e.target.value;
  };

  const update = async (e) => {
    await apiClassInstance
      .put(`/UpdateClass/${tmp1}`, {
        className: className,
        classCode: classCode,
        duration: classDuration,
        status: classStatus,
        location: classLocation,
        fsu: classFsu,
        start_date: classStart_date,
        end_date: classEnd_date,
        create_by: classCreate_by,
        createdDate: classCreatedDate,
        modified_date: classModified_date,
        modified_by: classModified_by,
        trainingProgram_id: classTrainingProgram_id,
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
    updateForm();
  };

  return (
    <div className="user-form-popup-container" onClick={handleOverlayClick}>
      <div className="user-form">
        <div className="btn-close-form">
          <button onClick={handleCloseForm}>
            <MdClose />
          </button>
        </div>
        {/* <form action="" className="user-form-container"> */}
        <div className="user-form-container">
          <div className="ip ip-name-email">
            <div className="user-name">
              <label htmlFor="full-name">Class name</label>
              <div className="input-form input-name">
                <input
                  type="text"
                  defaultValue={thisClass.className}
                  onChange={changeName}
                />
              </div>
            </div>
            <div className="user-email">
              <label htmlFor="email">Class code</label>
              <div className="input-form input-email">
                <input
                  type="text"
                  defaultValue={thisClass.classCode}
                  onChange={changeCode}
                />
              </div>
            </div>
          </div>
          <div className="ip ip-phone-doba">
            <div className="user-phone">
              <label htmlFor="phone">Duration</label>
              <div className="input-form input-phone">
                <input
                  type="number"
                  defaultValue={thisClass.duration}
                  onChange={changeDuration}
                />
              </div>
            </div>
            <div className="user-phone">
              <label htmlFor="phone">Status: {thisClass.status}</label>

              <div className="input-form input-phone">
                <select
                  defaultValue={thisClass.status}
                  className="user-type-select"
                  onChange={changeStatus}
                >
                  <option value="">...</option>
                  <option value="Opening">Opening</option>
                  <option value="Planning">Planning</option>
                  <option value="Scheduled">Scheduled</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>
            </div>
          </div>

          <div className="ip ip-phone-doba">
            <div className="user-phone">
              <label htmlFor="phone">Location</label>
              <div className="input-form input-phone">
                <input
                  type="text"
                  defaultValue={thisClass.location}
                  onChange={changeLocation}
                />
              </div>
            </div>

            <div className="user-phone">
              <label htmlFor="phone">FSU</label>
              <div className="input-form input-phone">
                <input
                  type="text"
                  defaultValue={thisClass.fsu}
                  onChange={changeFsu}
                />
              </div>
            </div>
          </div>
          <div className="ip ip-phone-doba">
            <div className="user-phone">
              <label htmlFor="phone">Created by</label>
              <div className="input-form input-phone">
                <input
                  type="text"
                  defaultValue={thisClass.create_by}
                  onChange={changeCreate_by}
                  readOnly
                />
              </div>
            </div>

            <div className="user-phone">
              <label htmlFor="phone">Modified by</label>
              <div className="input-form input-phone">
                <input
                  type="text"
                  defaultValue={userInfo && userInfo.name}
                  onChange={changeModified_by}
                  readOnly
                />
              </div>
            </div>
          </div>
          <div className="ip ip-phone-doba">
            <div className="user-dob">
              <label htmlFor="">Start date</label>
              <div className="input-form input-dob">
                <input
                  type="date"
                  defaultValue={thisClass.start_date}
                  onChange={changeStart_date}
                />
              </div>
            </div>

            <div className="user-dob">
              <label htmlFor="">End date</label>
              <div className="input-form input-dob">
                <input
                  type="date"
                  defaultValue={thisClass.end_date}
                  onChange={changeEnd_date}
                />
              </div>
            </div>
          </div>

          <div className="ip ip-phone-doba">
            <div className="user-dob">
              <label htmlFor="">Created date</label>
              <div className="input-form input-dob">
                <input
                  type="date"
                  defaultValue={thisClass.createdDate}
                  onChange={changeCreatedDate}
                />
              </div>
            </div>

            <div className="user-dob">
              <label htmlFor="">Modified date</label>
              <div className="input-form input-dob">
                <input
                  type="date"
                  defaultValue={thisClass.modified_date}
                  onChange={changeModified_date}
                />
              </div>
            </div>
          </div>

          <div className="user-type">
            <label htmlFor="">Training program</label>
            <br />
            <select
              className="user-type-select"
              onChange={changeTrainingProgram_id}
            >
              <option value="">...</option>
              {listTrainingProgram?.map((item, index) => {
                return (
                  <option value={item.training_code} key={item.training_code}>
                    {item.training_name}
                  </option>
                );
              })}
            </select>
          </div>

          <div className="btn-action-form">
            <button className="btn-action-save" onClick={update}>
              Save
            </button>
          </div>
        </div>
        {/* </form> */}
      </div>
    </div>
  );
};

export default UpdateClass;
