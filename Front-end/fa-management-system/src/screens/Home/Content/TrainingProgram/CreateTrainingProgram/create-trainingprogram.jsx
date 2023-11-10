import React, { useEffect, useState } from "react";
import { Formik, Field, Form } from "formik";
import apiClassInstance from "../../../../../service/api-class";
import apiTrainingProgramInstance from "../../../../../service/ClassApi/api-trainingProgram";
import { ToastContainer, toast } from "react-toastify";

import * as Yup from "yup";
import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";

const SignupSchema = Yup.object().shape({
  className: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  duration: Yup.number().required("Required"),
  location: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
});

const CreateTrainingProgram = () => {
  const [listTrainingProgram, setListTrainingProgram] = useState([]);
  const [userInfo, setUserInfo] = useState();
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

  return (
    <div className="view-training-program-container">
      <Formik
        initialValues={{
          className: "",
          classCode: "",
          duration: "",
          status: "",
          location: "",
          fsu: "",
          start_date: "",
          end_date: "",
          create_by: "",
          createdDate: "",
          modified_date: "",
          modified_by: "",
          trainingProgram_id: "",
        }}
        validationSchema={SignupSchema}
        onSubmit={(values) => {
          // same shape as initial values
          if (values != null) {
            apiClassInstance.post("/CreateClass", values);
            toast.success("Add class successfully !!!");
          }
          console.log(values);
        }}
      >
        {({ errors, touched }) => (
          <div>
            <div className="create-class-container">
              <div className={"toast-container"}></div>
              <div className="title-class">
                <h1>Add new training program</h1>
              </div>
              <Form>
                <div className="table-class-container">
                  <div className="table-class-left">
                    {" "}
                    <div className="input-class input-name">
                      <label>Training name</label>
                      <Field name="className" />
                      {errors.className && touched.className ? (
                        <div style={{ color: "red" }}>{errors.className}</div>
                      ) : null}
                    </div>
                    <div className="input-class input-code">
                      <label>Training code</label>
                      <Field type="date" name="duration" />
                    </div>
                    <div className="input-class input-duration">
                      <label>Duration</label>
                      <Field name="duration" />
                      {errors.duration && touched.duration ? (
                        <div style={{ color: "red" }}>{errors.duration}</div>
                      ) : null}
                    </div>
                    <div className="input-class input-status">
                      <label>Status</label>
                      <input type="text" />
                    </div>
                    <div className="input-class input-location">
                      <label>Location</label>
                      <Field name="location" />
                      {errors.location && touched.location ? (
                        <div style={{ color: "red" }}>{errors.location}</div>
                      ) : null}
                    </div>
                  </div>
                  <div className="table-class-right">
                    <div className="input-class-date input-start-end">
                      <div className=" input-start-date">
                        <label>Start date</label>
                        <input type="date" />
                      </div>
                      <div className=" input-end-date">
                        <label>End date</label>
                        <input type="date" />
                      </div>
                    </div>
                    <div className="input-class input-create-by">
                      <label>Create by</label>
                      <input type="text" value={userInfo?.name} readOnly />
                    </div>
                    <div className="input-class input-fsu">
                      <label>FSU</label>
                      <input type="text" />
                    </div>
                    <div className="input-class input-training-program">
                      <label>Training Program </label>
                      <select>
                        {listTrainingProgram?.map((item, index) => {
                          return (
                            <option
                              value={item.training_code}
                              key={item.training_code}
                            >
                              {item.training_name}
                            </option>
                          );
                        })}
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
