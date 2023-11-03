import React, { useEffect, useState } from "react";
import apiClassInstance from "../../../../../service/api-class";
import apiTrainingProgramInstance from "../../../../../service/ClassApi/api-trainingProgram";
import "./create-class.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";
import Cookies from "js-cookie";

const SignupSchema = Yup.object().shape({
  className: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  duration: Yup.number().min(1).required("Required"),
  location: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
});

const CreateClass = () => {
  const [listTrainingProgram, setListTrainingProgram] = useState([]);
  const [TrainingProgram, setTrainingProgram] = useState(0);
  const [status, setStatus] = useState("Planning");
  const [newTrainingProgram, setNewTrainingProgram] = useState({});
  const navigate = useNavigate();

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

  return (
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
        const tmp = values;
        tmp.trainingProgram_id = TrainingProgram;
        tmp.status = status;
        tmp.create_by = userInfo.name;

        if (values != null) {
          apiClassInstance.post("/CreateClass", tmp);
          toast.success("Add class successfully !!!");
        }
      }}
    >
      {({ errors, touched }) => (
        <div>
          <div className="create-class-container">
            <div className={"toast-container"}></div>
            <div className="title-class">
              <h1>Add new class</h1>
            </div>
            <Form>
              <div className="table-class-container">
                <div className="table-class-left">
                  {" "}
                  <div className="input-class input-name">
                    <label>Class name</label>
                    <Field name="className" />
                    {errors.className && touched.className ? (
                      <div style={{ color: "red" }}>{errors.className}</div>
                    ) : null}
                  </div>
                  <div className="input-class input-duration">
                    <label>Duration</label>
                    <Field type="number" name="duration" />
                    {errors.duration && touched.duration ? (
                      <div style={{ color: "red" }}>{errors.duration}</div>
                    ) : null}
                  </div>
                  <div className="input-class input-status">
                    <label>Status</label>
                    <select
                      className="select-create-class"
                      defaultValue={"Planning"}
                      onChange={(e) => {
                        setStatus(e.target.value);
                      }}
                    >
                      <option value="Opening">Opening</option>
                      <option value="Planning">Planning</option>
                      <option value="Scheduled">Scheduled</option>
                      <option value="Completed">Completed</option>
                    </select>
                  </div>
                  <div className="input-class input-location">
                    <label>Location</label>
                    <Field name="location" />
                    {errors.location && touched.location ? (
                      <div style={{ color: "red" }}>{errors.location}</div>
                    ) : null}
                  </div>
                  <div className="input-class input-fsu">
                    <label>FSU</label>
                    <Field type="text" name="fsu" />
                  </div>
                </div>
                <div className="table-class-right">
                  <div className="input-class-date input-start-end">
                    <div className=" input-start-date">
                      <label>Start date</label>
                      <Field type="date" name="start_date" />
                    </div>
                    <div className=" input-end-date">
                      <label>End date</label>
                      <Field type="date" name="end_date" />
                    </div>
                  </div>
                  <div className="input-class input-create-by">
                    <label>Create by</label>
                    <Field
                      type="text"
                      name="create_by"
                      disabled
                      placeholder={userInfo && userInfo.name}
                    />
                  </div>
                  <div className="input-class input-training-program">
                    <label>Training Program </label>

                    <select
                      className="select-create-class"
                      name="trainingProgram_id"
                      id=""
                      onChange={(e) => {
                        console.log(e.target.value);
                        setTrainingProgram(e.target.value);
                      }}
                    >
                      <option value="" key="">
                        ...
                      </option>
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
                  <button type="submit reset" className="btn-class-create">
                    {/* <button type="submit" className="btn-class-create"> */}
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
  );
};

export default CreateClass;
