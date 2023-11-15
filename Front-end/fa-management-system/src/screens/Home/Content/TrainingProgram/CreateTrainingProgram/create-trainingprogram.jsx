import React, { useEffect, useState } from "react";
import { Formik, Field, Form } from "formik";
import apiTrainingProgramInstance from "../../../../../service/ClassApi/api-trainingProgram";
import { ToastContainer, toast } from "react-toastify";

import * as Yup from "yup";
import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";

const SignupSchema = Yup.object().shape({
  training_name: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
});

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
    <div className="user-form-popup-container" onClick={handleOverlayClick}>
      <div className="user-form">
        <div className="btn-close-form"></div>
        <div>Are you sure to submit</div>
        <div className="create-training-action">
          <button onClick={handleNo}>no</button>
          <button onClick={handleYes}>yes</button>
        </div>
      </div>
    </div>
  );
};

const CreateTrainingProgram = () => {
  const [userInfo, setUserInfo] = useState();
  const [showFormAddUser, setShowFormAddUser] = useState(false);
  const [TrainingProgram, setTrainingProgram] = useState({});

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

  const closeForm = () => {
    setShowFormAddUser(false);
  };

  const saveTrainingProgram = () => {
    apiTrainingProgramInstance.post(
      "/create-training-program",
      TrainingProgram
    );
    toast.success("Add training program successfully !!!");
    closeForm();
  };

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
          createdDate: "",
          modified_date: "",
          modified_by: "",
          generalInfo: "",
        }}
        validationSchema={SignupSchema}
        onSubmit={async (values) => {
          // same shape as initial values

          const today = new Date();

          const tmp = values;
          const formattedDate = `${today.getFullYear()}-${
            today.getMonth() + 1
          }-${today.getDate()}`;
          tmp.status = Status;
          tmp.create_by = userInfo.name;
          tmp.createdDate = formattedDate;
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
                      <input type="text" value={userInfo?.name} readOnly />
                    </div>
                    <div className="input-class input-status">
                      <label>Modified by</label>
                      <Field name="modified_by" />
                      {errors.modified_by && touched.modified_by ? (
                        <div style={{ color: "red" }}>{errors.modified_by}</div>
                      ) : null}
                    </div>
                    <div className="input-class input-location">
                      <label>Info</label>
                      <Field name="generalInfo" />
                      {errors.generalInfo && touched.generalInfo ? (
                        <div style={{ color: "red" }}>{errors.generalInfo}</div>
                      ) : null}
                    </div>
                  </div>
                  <div className="table-class-right">
                    <div className="input-class-date input-start-end">
                      <div className=" input-start-date">
                        <label>Start date</label>
                        <Field name="start_time" type="date" />
                        {errors.start_time && touched.start_time ? (
                          <div style={{ color: "red" }}>
                            {errors.start_time}
                          </div>
                        ) : null}
                      </div>
                      <div className=" input-end-date">
                        <label>Modified date</label>
                        <Field name="modified_date" type="date" />
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
