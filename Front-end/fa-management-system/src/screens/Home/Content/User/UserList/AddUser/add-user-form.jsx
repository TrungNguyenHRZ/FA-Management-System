import React, { useEffect, useState } from "react";
import "./add-user-form.css";
import { MdClose } from "react-icons/md";
import apiUserInstance from "../../../../../../service/api-user";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router";
import { Switch } from "@mui/material";

const AddUserForm = ({
  showForm,
  closeForm,
  updateForm,
  checkboxStates,
  setCheckboxStates,
}) => {
  const [list, setList] = useState([]);
  const [tmp, setTmp] = useState("");

  const navigate = useNavigate();
  useEffect(() => {
    apiUserInstance
      .get("/all")
      .then(async (response) => {
        await response.data.userResponseList.map((item, index) => {
          list.push(item.email);
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const SignupSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
    phone: Yup.string().min(9).max(15).required("Required"),
    email: Yup.string().required("Required").notOneOf(list, "Duplicated Email"),
    password: Yup.string()
      .min(3, "Too Short!")
      .max(50, "Too Long!")
      .required("Required")
      .oneOf([tmp], "Unmatched !!!"),
  });

  const handleCloseForm = (e) => {
    e.preventDefault();
    closeForm();
  };
  const handleOverlayClick = (e) => {
    if (e.target.classList.contains("user-form-popup-container")) {
      closeForm();
    }
  };

  const [Gender, setGender] = useState("true");
  const changeGender = (e) => {
    setGender(e.target.value);

    console.log(list);
  };

  const [Status, setStatus] = useState("IN_ACTIVE");
  const changeStatus = (e) => {
    if (Status === "ACTIVE") {
      setStatus("IN_ACTIVE");
    } else {
      setStatus("ACTIVE");
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
        console.log(tmp);
        console.log(list);
        if (values != null) {
          try {
            const response = await apiUserInstance.post(
              "/create-sp-admin",
              tmp
            );
            const newUserId = response.data.id;
            const updatedCheckboxStates = checkboxStates.slice();
            updatedCheckboxStates.push({
              id: newUserId,
              checked: Status === "ACTIVE",
            });
            setCheckboxStates(updatedCheckboxStates);
            updateForm();
          } catch (error) {
            console.error(error);
          }
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
                <div className="ip ip-phone-doba">
                  <div className="user-email">
                    <label htmlFor="email">Password</label>
                    <div className="input-form input-email">
                      <Field name="password" type="password" />
                      {errors.password && touched.password ? (
                        <div style={{ color: "red" }}>{errors.password}</div>
                      ) : null}
                    </div>
                  </div>
                  <div className="user-email">
                    <label htmlFor="email">Confirm Password</label>
                    <div className="input-form input-email">
                      <input
                        type="password"
                        required
                        onChange={(e) => {
                          setTmp(e.target.value);
                        }}
                      />
                    </div>
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
                  <label htmlFor="">Activate</label>
                  <Switch
                    type="checkbox"
                    value={"ACTIVE"}
                    checked={Status === "ACTIVE"}
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
