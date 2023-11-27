import React, { useEffect, useState } from "react";
import apiClassInstance from "../../../../../service/api-class";
import apiTrainingProgramInstance from "../../../../../service/ClassApi/api-trainingProgram";
import "./create-class.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import jwtDecode from "jwt-decode";
import Cookies from "js-cookie";
import CreateMultipleSchedules from "../../Schedule/create-schedule";
import PickTrainer from "./pick-trainer";
import { useNavigate } from "react-router";

const SignupSchema = Yup.object().shape({
  className: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  location: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
});

const CreateClass = () => {
  const [listTrainingProgram, setListTrainingProgram] = useState([]);
  const [TrainingProgram, setTrainingProgram] = useState(0);
  const [addTrainingProgram, setAddTrainingProgram] = useState({});
  const [status, setStatus] = useState("Planning");
  const [userInfo, setUserInfo] = useState(null);
  const [showFormAddSchedule, setShowFormAddSchedule] = useState(false);
  const [showFormAddTrainer, setShowFormAddTrainer] = useState(false);
  const [Item, setItem] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const token = Cookies.get("token");
    const decodedToken = jwtDecode(token);

    if (
      decodedToken.userInfo[0] !== "Supper_Admin" &&
      decodedToken.userInfo[0] !== "Admin"
    ) {
      navigate("/overview");
    }
  }, []);
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
      console.log(decodedToken);
    }
  }, []);
  const closeForm2 = () => {
    setShowFormAddSchedule(false);
  };

  const closeForm1 = () => {
    setShowFormAddTrainer(false);
  };

  const openForm2 = (e) => {
    setShowFormAddSchedule(true);
  };

  const openForm1 = (e) => {
    setShowFormAddTrainer(true);
  };

  const updateForm2 = () => {};

  const updateForm1 = () => {
    setShowFormAddTrainer(false);
    setShowFormAddSchedule(true);
  };
  // console.log(userInfo.id);

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
        tmp.duration = addTrainingProgram.duration;
        tmp.start_date = addTrainingProgram.start_time;

        if (values != null) {
          apiClassInstance.post("/CreateClass", tmp).then((response) => {
            console.log(response.data);
            setItem(response.data.payload.classId);
          });
          toast.success("Add class successfully !!!");
          openForm1();
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
            {showFormAddSchedule && (
              <div className="user-form-popup-container">
                <div className="user-form">
                  <CreateMultipleSchedules
                    openForm={openForm2}
                    closeForm={closeForm2}
                    classId={Item}
                    updateForm={updateForm2}
                  />
                </div>
              </div>
            )}

            {showFormAddTrainer && (
              <div className="user-form-popup-container">
                <div className="user-form">
                  <PickTrainer
                    openForm={openForm1}
                    closeForm={closeForm1}
                    classId={Item}
                    updateForm={updateForm1}
                  />
                </div>
              </div>
            )}

            <Form>
              <div className="table-class-container">
                <div className="table-class-left">
                  {" "}
                  <div className="input-class input-name">
                    <label>Class name</label>
                    <Field name="className" defaultValue={"test"} />

                    {errors.className && touched.className ? (
                      <div style={{ color: "red" }}>{errors.className}</div>
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

                    {listTrainingProgram && listTrainingProgram.length > 0 ? (
                      <select
                        className="select-create-class"
                        name="trainingProgram_id"
                        id=""
                        onChange={(e) => {
                          console.log(e.target.value);
                          setTrainingProgram(e.target.value);
                          setAddTrainingProgram(
                            listTrainingProgram.filter(
                              (item) => item.training_code == e.target.value
                            )[0]
                          );
                        }}
                      >
                        <option value="" key="">
                          ...
                        </option>
                        {listTrainingProgram.map((item, index) => {
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
                    ) : (
                      <p>Loading training programs...</p>
                    )}
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
