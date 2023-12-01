import React, { useEffect, useState } from "react";
import { Formik, Field, Form } from "formik";
import apiTrainingProgramInstance from "../../../../../service/ClassApi/api-trainingProgram";
import apiSyllabusInstance from "../../../../../service/api-syllabus";
import { ToastContainer, toast } from "react-toastify";
import * as Yup from "yup";
import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";
import "./create-trainingprogram.css";

const SignupSchema = Yup.object().shape({
  training_name: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
});

const ChooseSyllabus = ({ saveSyllabus, closeForm3, trainingProgramID }) => {
  const [allSyllabus, setAllSyllabus] = useState([]);
  const [addNewSyllabus, setAddNewSyllabus] = useState([]);

  useEffect(() => {
    apiSyllabusInstance
      .get("/view")
      .then((response) => {
        console.log(response.data);
        setAllSyllabus(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const addToList = (e, item1) => {
    console.log(item1);
    setAddNewSyllabus([...addNewSyllabus, item1]);

    const new_arr = allSyllabus.filter((item) => item !== item1);
    setAllSyllabus(new_arr);
  };

  const addToList2 = (e, item2) => {
    console.log(item2);
    setAllSyllabus([...allSyllabus, item2]);
    const new_arr = addNewSyllabus.filter((item) => item !== item2);
    setAddNewSyllabus(new_arr);
  };

  const closePick = (e) => {
    closeForm3();
  };

  const saveAll = (e) => {
    if (addNewSyllabus != "") {
      let tmp = [];
      for (const item of addNewSyllabus) {
        tmp.push({
          syllabus: item.topic_code,
          trainingProgram: trainingProgramID,
          sequence: "",
        });
      }
      apiTrainingProgramInstance
        .post("/create-training-program-syllabus", tmp)
        .then((response) => {
          console.log(response.data.payload);
        });

      toast.success("Add All Syllabus successfully !!!");
      closeForm3();
    } else {
      toast.error("Please add least one syllabus !!!");
    }
  };

  let renderData = () => {
    return (
      // if (allSyllabus && allSyllabus.length > 0) {
      // allSyllabus.map(

      <div className="choose-syllabus-container">
        <div className="form-choose-syllabus-training">
          <div className="training-program-content-main">
            {allSyllabus?.map((item, index) => (
              <>
                <div
                  className="training-program-content"
                  onClick={(e) => addToList(e, item)}
                >
                  <div className="training-program-content-title">
                    <div>
                      <h2>{item.topic_name}</h2>
                    </div>
                    <div>{item.publish_status}</div>
                  </div>
                  <div className="training-program-detail">
                    <div>
                      Modified on {item.modified_date} by {item.modified_by}
                    </div>
                  </div>
                </div>
                <br />
              </>
            ))}
          </div>
          <div className="training-program-main">
            <div className="training-program-content-main">
              {addNewSyllabus.map((item2, index) => (
                <>
                  <div className="training-program-content">
                    <div className="training-program-content-title">
                      <div>
                        <h2>{item2.topic_name}</h2>
                      </div>
                      <div>{item2.publish_status}</div>
                    </div>

                    <div className="training-program-detail">
                      <div>
                        Modified on {item2.modified_date} by {item2.modified_by}
                      </div>
                    </div>
                    <div className="btn-delete-choosed-container">
                      <button
                        className="btn-delete-choosed-syllabus"
                        onClick={(e) => addToList2(e, item2)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                  <br />
                </>
              ))}
            </div>
          </div>
        </div>
        <div className="training-program-main">
          <div className="training-program-content-main-2">
            <button onClick={(e) => closePick(e)}>Cancel</button>
            <button onClick={(e) => saveAll(e)}>Save</button>
          </div>
        </div>
      </div>

      // );
      // }
    );
  };

  return (
    <div
      className="user-form-popup-container"
      // onClick={handleOverlayClick}
    >
      <div className="choose-syllabus-training-form">
        <div className="btn-close-form"></div>
        <div className="choose-syllabus-training-title">
          Choose one or more syllabus on the left !!!
        </div>
        <div className="create-training-action"></div>
        <div>{renderData()}</div>
      </div>
    </div>
  );
};

///////=======================================================================================

const Confirm = ({ saveTrainingProgram, closeForm }) => {
  const handleOverlayClick = (e) => {
    if (e.target.classList.contains("user-form-popup-container")) {
      closeForm();
    }
  };
  const handleYes = (e) => {
    e.preventDefault();
    saveTrainingProgram();
  };

  const handleNo = (e) => {
    e.preventDefault();
    closeForm();
  };

  return (
    <div
      className="user-form-popup-container popup-confirm-training-container"
      onClick={handleOverlayClick}
    >
      <div className="user-form popup-confirm-training">
        <div>Are you sure to submit ?</div>
        <div className="create-training-action">
          <button onClick={handleNo}>No</button>
          <button onClick={handleYes}>Yes</button>
        </div>
      </div>
    </div>
  );
};

//=============================================================================================================

const CreateTrainingProgram = () => {
  const [userInfo, setUserInfo] = useState();
  const [showFormAddUser, setShowFormAddUser] = useState(false);
  const [TrainingProgram, setTrainingProgram] = useState({});
  const [showFormChooseSyllabus, setShowFormChooseSyllabus] = useState(false);
  const [trainingProgramID, setTrainingProgramID] = useState(0);

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      const decodedToken = jwtDecode(token);
      setUserInfo(decodedToken);
    }
  }, []);

  const openForm1 = (e) => {
    setShowFormAddUser(true);
  };

  const openForm2 = (e) => {
    setShowFormChooseSyllabus(true);
  };

  const closeForm = () => {
    setShowFormAddUser(false);
  };

  const closeForm2 = () => {
    setShowFormChooseSyllabus(false);
  };

  const saveTrainingProgram = () => {
    apiTrainingProgramInstance
      .post("/create-training-program", TrainingProgram)
      .then((response) => {
        console.log(response.data.payload.training_code);
        setTrainingProgramID(response.data.payload.training_code);
      });
    toast.success("Add training program successfully !!!");
    closeForm();
    openForm2();
  };

  const saveSyllabus = () => {};

  let Status = "Active";
  const changeStatus = (e) => {
    Status = e.target.value;
  };

  return (
    <div className="view-training-program-container">
      <Formik
        initialValues={{
          training_name: "",
          start_time: "",
          duration: 0,
          status: "",
          create_by: "",
          modified_by: "",
          generalInfo: "",
        }}
        validationSchema={SignupSchema}
        onSubmit={async (values) => {
          // same shape as initial values

          const today = new Date();

          const tmp = values;
          tmp.status = Status;
          tmp.create_by = userInfo.name;
          tmp.modified_by = userInfo.name;
          console.log(tmp);
          setTrainingProgram(tmp);

          openForm1();
          // if (values != null) {
          //   apiTrainingProgramInstance.post("/create-training-program", tmp);
          //   toast.success("Add training program successfully !!!");
          // }
        }}
      >
        {({ errors, touched }) => (
          <div>
            <div className="create-class-container">
              <div className={"toast-container"}></div>
              <div className="title-class">
                <h1>Add new training program</h1>
              </div>
              {showFormAddUser && (
                <div className="user-form-popup-container">
                  <div className="user-form">
                    <Confirm
                      openForm={openForm1}
                      closeForm={closeForm}
                      saveTrainingProgram={saveTrainingProgram}
                    />
                  </div>
                </div>
              )}

              {showFormChooseSyllabus && (
                <div className="user-form-popup-container">
                  <div className="user-form">
                    <ChooseSyllabus
                      openForm={openForm2}
                      closeForm3={closeForm2}
                      trainingProgramID={trainingProgramID}
                      saveSyllabus={saveSyllabus}
                    />
                  </div>
                </div>
              )}

              <Form>
                <div className="table-class-container">
                  <div className="table-class-left">
                    {" "}
                    <div className="input-class input-name">
                      <label>Training name</label>
                      <Field name="training_name" />
                      {errors.training_name && touched.training_name ? (
                        <div style={{ color: "red" }}>
                          {errors.training_name}
                        </div>
                      ) : null}
                    </div>
                    <div className="input-class input-code">
                      <label>Create by </label>
                      <input
                        type="text"
                        value={userInfo?.name}
                        disabled
                        style={{ color: "#2a00b7" }}
                      />
                    </div>
                    <div className="input-class input-status">
                      <label>Modified by</label>
                      <input
                        type="text"
                        value={userInfo?.name}
                        disabled
                        style={{ color: "#2a00b7" }}
                      />
                    </div>
                    <div className="input-class input-location">
                      <label>Info</label>
                      <Field
                        name="generalInfo"
                        as="textarea"
                        placeholder="Enter general information here..."
                      />
                      {errors.generalInfo && touched.generalInfo ? (
                        <div style={{ color: "red" }}>{errors.generalInfo}</div>
                      ) : null}
                    </div>
                  </div>
                  <div className="table-class-right">
                    <div className="input-class-date input-start-end">
                      <div className=" input-start-date">
                        <label>Start date</label>
                        <Field name="start_time" type="date" required />
                        {errors.start_time && touched.start_time ? (
                          <div style={{ color: "red" }}>
                            {errors.start_time}
                          </div>
                        ) : null}
                      </div>
                      <div className=" input-end-date">
                        <label>Modified date</label>
                        <Field name="modified_date" type="date" required />
                        {errors.modified_date && touched.modified_date ? (
                          <div style={{ color: "red" }}>
                            {errors.modified_date}
                          </div>
                        ) : null}
                      </div>
                    </div>

                    <div className="input-class input-training-program">
                      <label>Status </label>
                      <select
                        defaultValue="Active"
                        className="user-type-select"
                        onChange={changeStatus}
                      >
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                        <option value="Drafting">Drafting</option>
                      </select>
                    </div>
                    <button type="submit" className="btn-class-create">
                      Add new
                    </button>
                  </div>
                </div>
              </Form>
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
          </div>
        )}
      </Formik>
    </div>
  );
};

export default CreateTrainingProgram;
