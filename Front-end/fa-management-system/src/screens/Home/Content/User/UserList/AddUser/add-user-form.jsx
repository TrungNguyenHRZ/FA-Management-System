import React from "react";
import "./add-user-form.css";
import { MdClose } from "react-icons/md";
import apiUserInstance from "../../../../../../service/api-user";
import { Formik, Field, Form } from "formik";
import { ToastContainer, toast } from "react-toastify";
import * as Yup from "yup";

const SignupSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  phone: Yup.string().min(9).max(15).required("Required"),
  password: Yup.string()
    .min(3, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
});

const AddUserForm = ({ showForm, closeForm, updateForm }) => {
  const handleCloseForm = (e) => {
    e.preventDefault();
    closeForm();
  };
  const handleOverlayClick = (e) => {
    if (e.target.classList.contains("user-form-popup-container")) {
      closeForm();
    }
  };

  let Gender = "true";
  const changeGender = (e) => {
    Gender = e.target.value;
    console.log(Gender);
  };

  let Status = "IN_ACTIVE";
  const changeStatus = (e) => {
    if (Status === "ACTIVE") {
      Status = "IN_ACTIVE";
    } else {
      Status = "ACTIVE";
    }
  };

  return (
    <Formik
      initialValues={{
        name: "",
        email: "",
        phone: "",
        dob: "",
        genderTrueMale: "",
        status: "",
        password: "",
      }}
      validationSchema={SignupSchema}
      onSubmit={async (values) => {
        const tmp = values;
        tmp.status = Status;
        tmp.genderTrueMale = Gender;

        if (values != null) {
          await apiUserInstance.post("/create-sp-admin", tmp);

          updateForm();
        }
      }}
    >
      {({ errors, touched }) => (
        <div className="user-form-popup-container" onClick={handleOverlayClick}>
          <div className="user-form">
            <div className="btn-close-form">
              <button onClick={handleCloseForm}>
                <MdClose />
              </button>
            </div>
            {/* <form action="" className="user-form-container"> */}
            <Form>
              <div className="user-form-container">
                <div className="ip ip-name-email">
                  {" "}
                  <div className="user-name">
                    <label htmlFor="full-name">Full name</label>
                    <div className="input-form input-name">
                      <Field name="name" />
                      {errors.name && touched.name ? (
                        <div style={{ color: "red" }}>{errors.name}</div>
                      ) : null}
                    </div>
                  </div>
                  <div className="user-email">
                    <label htmlFor="email">Email</label>
                    <div className="input-form input-email">
                      <Field name="email" type="email" />
                      {errors.email && touched.email ? (
                        <div style={{ color: "red" }}>{errors.email}</div>
                      ) : null}
                    </div>
                  </div>
                </div>
                <div className="ip ip-phone-doba">
                  <div className="user-phone">
                    <label htmlFor="phone">Phone</label>
                    <div className="input-form input-phone">
                      <Field name="phone" type="number" />
                      {errors.phone && touched.phone ? (
                        <div style={{ color: "red" }}>{errors.phone}</div>
                      ) : null}
                    </div>
                  </div>
                  <div className="user-dob">
                    {" "}
                    <label htmlFor="">Birthday</label>
                    <div className="input-form input-dob">
                      <Field name="dob" type="date" required />
                      {errors.dob && touched.dob ? (
                        <div style={{ color: "red" }}>{errors.dob}</div>
                      ) : null}
                    </div>
                  </div>
                </div>
                <div className="user-email">
                  <label htmlFor="email">Password</label>
                  <div className="input-form input-email">
                    <Field name="password" />
                    {errors.password && touched.password ? (
                      <div style={{ color: "red" }}>{errors.password}</div>
                    ) : null}
                  </div>
                </div>

                <div className="user-gender">
                  <label>Gender:</label>
                  <div className="user-gender-choice" onChange={changeGender}>
                    <div className="gender-male">
                      <label htmlFor="male">Male</label>
                      <input type="radio" name="gender" value="true" />
                    </div>
                    <div className="gender-female">
                      <label htmlFor="female">Female</label>
                      <input
                        type="radio"
                        name="gender"
                        value="false"
                        id="female"
                      />
                    </div>
                  </div>
                </div>

                <div className="user-isActive">
                  <label htmlFor="">Active</label>
                  <input
                    type="checkbox"
                    value={"ACTIVE"}
                    onChange={changeStatus}
                  />
                </div>

                <div className="btn-action-form">
                  <button className="btn-action-save" type="submit reset">
                    Save
                  </button>
                </div>
              </div>
            </Form>
          </div>
        </div>
      )}
    </Formik>
  );
};

export default AddUserForm;
