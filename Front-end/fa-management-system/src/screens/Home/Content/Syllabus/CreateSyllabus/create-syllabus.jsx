import React, { useEffect, useState } from "react";
import apiSyllabusInstance from "../../../../../service/api-syllabus";
import { SyncLoader } from "react-spinners";
import {
  Formik,
  Field,
  Form,
  FieldArray,
  ErrorMessage,
  useFormikContext,
} from "formik";
import { TextareaAutosize } from "@mui/base/TextareaAutosize";
import {
  MdOutlineExpandCircleDown,
  MdOutlineSnippetFolder,
} from "react-icons/md";
import {
  Modal,
  Button,
  Box,
  Stepper,
  Step,
  StepLabel,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import { Navigate, useNavigate } from "react-router-dom";
import { MdOutlineEdit } from "react-icons/md";
// import Button from "@mui/material/Button";
import jwtDecode from "jwt-decode";
import Cookies from "js-cookie";
import { CiCircleMinus, CiCirclePlus } from "react-icons/ci";
import "./create-syllabus.css";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import { ToastContainer, toast } from "react-toastify";
import * as Yup from "yup";

const CreateSyllabus = () => {
  const [page, setPage] = useState(1);
  const [userInfo, setUserInfo] = useState(null);
  const [groupedUnits, setGroupedUnits] = useState([]);
  const [expanded, setExpanded] = useState("panel1");
  const [open, setOpen] = React.useState(false);
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
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      const decodedToken = jwtDecode(token);
      setUserInfo(decodedToken);
    }
  }, []);
  if (userInfo) {
    console.log(userInfo);
  }

  let changeGeneral = () => {
    setPage(1);
    console.log(page);
  };

  let changeOutline = () => {
    setPage(2);
    console.log(page);
  };

  let changeOthers = () => {
    setPage(3);
    console.log(page);
  };

  let levels = ["fresher", "junior", "senior"];

  const convertToUnitList = (values) => {
    const unitList = values.unitsByDay.flatMap((day) =>
      day.units.map((unit) => ({
        unit_name: unit.unit_name,
        day_number: day.day_number,
        contentList: unit.contentList,
      }))
    );

    return unitList;
  };
  let userID = 0;
  if (userInfo) {
    userID = userInfo.id;
  }
  const handleSubmit = (values) => {
    console.log(values);
    // Gửi dữ liệu lên máy chủ thông qua phương thức POST tại đây.
    const afterValue = convertToUnitList(values);
    const updatedValue = {
      ...values,
      unitList: afterValue,
      userId: userID,
      unitsByDay: null,
      dayNumber: null,
    };
    console.log("Dữ liệu đã gửi:", updatedValue);

    console.log(selectedFile);
    apiSyllabusInstance.post("/saveSyllabus", updatedValue).then((response) => {
      if (selectedFile !== null) {
        const formData = new FormData();
        formData.append("file", selectedFile);
        apiSyllabusInstance.post(
          `/uploadMaterials/${response.data.payload.topic_code}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
      }
      console.log(response.data);

      setTimeout(() => {
        const id = response.data.payload.topic_code; // Thay thế bằng id cụ thể bạn muốn navigate đến
        navigate(`/view-syllabus/${id}`);
      }, 2200);
    });
  };

  const [dayNumber, setDayNumber] = useState([1]);

  const handleKeyPress = (event, push, index, remove) => {
    // Kiểm tra xem người dùng có nhấn phím Enter không
    if (event.key === "Enter") {
      // Thêm một trường mới sử dụng hàm push từ FieldArray
      push({
        learningObjectList: {
          learning_name: "",
          learning_description: "",
          type: "",
        },
      });
      // Ngăn chặn sự kiện mặc định (ví dụ: ngăn chặn việc submit form)
      event.preventDefault();
    } else if (event.key === "Backspace" && event.target.value === "") {
      // Remove the field when Backspace is pressed and the field is empty
      if (index !== 0) {
        remove(index);
      }

      event.preventDefault();
    }
  };

  const removeDay = (indexToRemove, setValues) => {
    setValues((prevValues) => {
      const newDayNumber = prevValues.dayNumber.filter(
        (_, index) => index !== indexToRemove
      );

      return {
        ...prevValues,
        dayNumber: newDayNumber,
        unitsByDay: prevValues.unitsByDay.filter(
          (_, index) => index !== indexToRemove
        ),
      };
    });
  };

  const [isModalVisible, setIsModalVisible] = useState(false);

  // Tạo một state để lưu trữ thông tin của nội dung được chọn
  const [selectedContent, setSelectedContent] = useState({
    dayNumber: null,
    unitIndex: null,
    contentIndex: null,
  });

  // Tạo một state để lưu trữ giá trị đã nhập từ modal

  // Hàm mở modal khi nội dung được click
  const showModal = (dayNumber, unitIndex, contentIndex) => {
    setSelectedContent({
      dayNumber,
      unitIndex,
      contentIndex,
    });
    console.log(selectedContent);
    setIsModalVisible(true);
    console.log(isModalVisible);
  };

  // Hàm đóng modal
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const steps = ["General", "Outline", "Others", "Completed"];

  const Accordion = styled((props) => (
    <MuiAccordion disableGutters elevation={0} square {...props} />
  ))(({ theme }) => ({
    border: `1px solid ${theme.palette.divider}`,
    "&:not(:last-child)": {
      borderBottom: 0,
    },
    "&:before": {
      display: "none",
    },
    transition: "0.3s",
  }));
  const AccordionSummary = styled((props) => (
    <MuiAccordionSummary {...props} />
  ))(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#454545" : "#454545",
    flexDirection: "row",

    "& .MuiAccordionSummary-content": {
      marginLeft: theme.spacing(1),
    },
    color: "#ffff",
    transition: "0.3s",
  }));

  const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
    padding: theme.spacing(2),
    borderTop: "1px solid rgba(0, 0, 0, .125)",
    transition: "0.3s",
  }));

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const style1 = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
  };

  const switchPage = () => {
    if (page === 3) {
      handleOpen();
    } else {
      setPage(page + 1);
    }
  };

  const delivery = [
    "Assignment/Lab",
    "Concept/Lecture",
    "Guide/Review",
    "Test/Quiz",
    "Exam",
    "Seminar/Workshop",
  ];

  const validationSchema = Yup.object().shape({
    topic_name: Yup.string().required("Syllabus Name is required"),
    training_audience: Yup.number()
      .positive("Number of audience must be greater than 0")
      .required("Audience is required"),
    technical_group: Yup.string().required("Technical Requirement is required"),
    version: Yup.number()
      .positive("Version must be greater than 0")
      .required("Version is required"),
    level: Yup.string().required("Level is required").oneOf(
      levels, // Các giá trị cho phép
      "Invalid level"
    ),
    training_principles: Yup.string()
      .required("Training principles is required")
      .max(255, "Maximum 255 characters"),
    learningList: Yup.array().min(1, "Course Objective(s) is required"),
    unitsByDay: Yup.array().of(
      Yup.object().shape({
        units: Yup.array().of(
          Yup.object().shape({
            unit_name: Yup.string().required("Unit name is required"),
            contentList: Yup.array().of(
              Yup.object().shape({
                content: Yup.string().required("Content is required"),
                // Thêm các quy tắc khác nếu cần
                deliveryType: Yup.string()
                  .required("Delivery type is required")
                  .oneOf(
                    delivery, // Các giá trị cho phép
                    "Invalid delivery type"
                  ),
                duration: Yup.number()
                  .positive("Number must be greater than 0")
                  .required("Number is required"),
              })
            ),
          })
        ),
      })
    ),
  });

  const [selectedFile, setSelectedFile] = useState(null);
  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  return (
    <div className="create-syllabus-container">
      <div className="detail-header">
        <h2 className="detail-title">Syllabus</h2>
        <div className="progress-bar">
          <Box sx={{ width: "100%" }}>
            <Stepper activeStep={page} alternativeLabel>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
          </Box>
        </div>
      </div>
      <div className="step-bar">
        <div
          className={page === 1 ? "step-bar-item-choose" : "step-bar-item"}
          onClick={changeGeneral}
        >
          General
        </div>
        <div
          className={page === 2 ? "step-bar-item-choose" : "step-bar-item"}
          onClick={changeOutline}
        >
          Outline
        </div>
        <div
          className={page === 3 ? "step-bar-item-choose" : "step-bar-item"}
          onClick={changeOthers}
        >
          Others
        </div>
      </div>
      <div>
        <div>
          <Formik
            validationSchema={validationSchema}
            initialValues={{
              topic_name: "",
              technical_group: "",
              version: "",
              training_audience: "",
              topic_outline: "",
              training_materials: "",
              training_principles: "",
              priority: "",
              level: "",
              publish_status: "",
              create_by: "",
              modified_by: "",
              programDuration: 0,
              learningList: [
                {
                  learningObjectList: {
                    learning_name: "",
                    learning_description: "",
                    type: "",
                  },
                },
              ],
              unitsByDay: dayNumber.map((day) => ({
                day_number: day,
                units: [
                  {
                    unit_name: "",
                    contentList: [
                      {
                        content: "",
                        deliveryType: "",
                        duration: 0,
                        learningObjective: "",
                        note: "",
                        trainingFormat: "Offline",
                      },
                    ],
                  },
                ],
              })),
              dayNumber: [1],
            }}
            onSubmit={handleSubmit}
          >
            {({
              values,
              setFieldValue,
              errors,
              touched,
              setValues,
              isValidating,
              validateForm,
            }) => (
              <Form>
                {page === 1 ? (
                  <div className="scroll-container">
                    <div className="create-general">
                      <label>Syllabus Name:</label>
                      <Field type="text" name="topic_name" />
                      <ErrorMessage
                        name="topic_name"
                        component="div"
                        className="error-mess"
                      />
                      <label>Version: </label>
                      <Field type="text" name="version" />
                      <ErrorMessage
                        name="version"
                        component="div"
                        className="error-mess"
                      />
                      <label>Training audience: </label>
                      <Field type="number" name="training_audience" />
                      <ErrorMessage
                        name="training_audience"
                        component="div"
                        className="error-mess"
                      />
                      <label>Technical requirements:</label>
                      <Field name="technical_group" as="textarea" />
                      <ErrorMessage
                        name="technical_group"
                        component="div"
                        className="error-mess"
                      />
                      <label>Level</label>
                      <Field name="level" as="select">
                        <option>Select one</option>
                        {levels.map((level) => (
                          <option value={level}>{level}</option>
                        ))}
                      </Field>
                      <ErrorMessage
                        name="level"
                        component="div"
                        className="error-mess"
                      />
                      <label>Course Objective(s)</label>
                      <FieldArray name="learningList">
                        {({ push, remove }) => (
                          <div className="objective-wrapper">
                            {values.learningList.map((a, lIndex) => (
                              <div key={lIndex}>
                                <Field
                                  className="objective-field"
                                  name={`learningList[${lIndex}].learningObjectList.learning_description`}
                                  onKeyDown={(e) =>
                                    handleKeyPress(e, push, lIndex, remove)
                                  }
                                  type="text"
                                  autocomplete="off"
                                />
                              </div>
                            ))}
                          </div>
                        )}
                      </FieldArray>
                      <ErrorMessage
                        name="learningList"
                        component="div"
                        className="error-mess"
                      />
                      <div className="file-upload">
                        <label
                          htmlFor="fileInput"
                          className="custom-file-input-label"
                        >
                          Choose File
                        </label>
                        <input
                          type="file"
                          id="fileInput"
                          className="custom-file-input"
                          accept=".zip"
                          onChange={handleFileChange}
                        />
                        <div>{selectedFile ? selectedFile.name : null}</div>
                      </div>
                    </div>
                  </div>
                ) : page === 2 ? (
                  //Outlie Screen
                  <div>
                    <div className="outline">
                      <FieldArray name="unitsByDay">
                        {({ push, remove }) => (
                          <div>
                            {values.unitsByDay.map((day, dayIndex) => (
                              <Accordion
                                className={`create-outline-c ${
                                  expanded === `panel${dayIndex + 1}`
                                    ? "expanded"
                                    : ""
                                }`}
                                expanded={expanded === `panel${dayIndex + 1}`}
                                onChange={handleChange(`panel${dayIndex + 1}`)}
                                TransitionProps={{
                                  appear: isModalVisible ? false : true,
                                  // exit : isModalVisible ? false : true
                                  // mountOnEnter: isModalVisible
                                }}
                              >
                                <AccordionSummary
                                  className="item-create-outline-syllabus"
                                  expandIcon={
                                    <MdOutlineExpandCircleDown className="syllabus-expand-icon" />
                                  }
                                  aria-controls="panel1a-content"
                                  id="panel1a-header"
                                >
                                  <div className="day-panel-title">
                                    <Typography key={dayIndex}>
                                      Day {day.day_number}
                                    </Typography>
                                    <CiCircleMinus
                                      onClick={() => {
                                        removeDay(dayIndex, setValues);
                                        console.log(values.dayNumber);
                                      }}
                                      className="minus-icon"
                                    />
                                  </div>
                                </AccordionSummary>

                                <AccordionDetails>
                                  <Typography>
                                    <div className="syllabus-content-container-c">
                                      <FieldArray
                                        name={`unitsByDay[${dayIndex}].units`}
                                      >
                                        {({ push, remove }) => (
                                          <>
                                            {day.units.map(
                                              (unit, unitIndex) => (
                                                <div
                                                  key={unitIndex}
                                                  id={unitIndex}
                                                  className="content-container-right"
                                                >
                                                  <>
                                                    <Field
                                                      className="sy-name"
                                                      type="text"
                                                      placeholder="Unit Name:"
                                                      id={`unitsByDay[${dayIndex}].units[${unitIndex}].unit_name`}
                                                      name={`unitsByDay[${dayIndex}].units[${unitIndex}].unit_name`}
                                                    />
                                                    <CiCircleMinus
                                                      className="minus-icon"
                                                      type="button"
                                                      onClick={() =>
                                                        remove(unitIndex)
                                                      }
                                                    />
                                                    <ErrorMessage
                                                      name={`unitsByDay[${dayIndex}].units[${unitIndex}].unit_name`}
                                                      className="error-mess"
                                                      component="div"
                                                    />

                                                    <FieldArray
                                                      name={`unitsByDay[${dayIndex}].units[${unitIndex}].contentList`}
                                                    >
                                                      {({ push, remove }) => (
                                                        <div className="unit-content-container">
                                                          {unit.contentList.map(
                                                            (
                                                              content,
                                                              contentIndex
                                                            ) => (
                                                              <div
                                                                key={
                                                                  contentIndex
                                                                }
                                                                id={`${unitIndex}-${contentIndex}`}
                                                                className="syllabus-content-box"
                                                              >
                                                                <div className="syllabus-content-name">
                                                                  <Field
                                                                    type="text"
                                                                    name={`unitsByDay[${dayIndex}].units[${unitIndex}].contentList[${contentIndex}].content`}
                                                                    placeholder="Content"
                                                                    readOnly
                                                                    className="syllabus-content-name-c"
                                                                  />
                                                                </div>

                                                                <div className="syllabus-content-box-right-c">
                                                                  <Field
                                                                    type="text"
                                                                    name={`unitsByDay[${dayIndex}].units[${unitIndex}].contentList[${contentIndex}].deliveryType`}
                                                                    placeholder="DeliveryType"
                                                                    readOnly
                                                                    className="syllabus-content-format-c"
                                                                  />
                                                                  <Field
                                                                    type="number"
                                                                    name={`unitsByDay[${dayIndex}].units[${unitIndex}].contentList[${contentIndex}].duration`}
                                                                    placeholder="Duration"
                                                                    readOnly
                                                                    className="syllabus-content-name-c"
                                                                  />
                                                                  <Field
                                                                    type="text"
                                                                    name={`unitsByDay[${dayIndex}].units[${unitIndex}].contentList[${contentIndex}].trainingFormat`}
                                                                    placeholder="TrainingFormat"
                                                                    readOnly
                                                                    className="syllabus-content-format-c"
                                                                  />
                                                                </div>

                                                                <CiCircleMinus
                                                                  onClick={() =>
                                                                    remove(
                                                                      contentIndex
                                                                    )
                                                                  }
                                                                  className="minus-icon"
                                                                />

                                                                <MdOutlineEdit
                                                                  type="button"
                                                                  onClick={() =>
                                                                    showModal(
                                                                      day.day_number,
                                                                      unitIndex,
                                                                      contentIndex
                                                                    )
                                                                  }
                                                                  className="edit-icon"
                                                                />

                                                                <Modal
                                                                  title={`Edit Content - Day ${selectedContent.dayNumber}`}
                                                                  open={
                                                                    isModalVisible
                                                                  }
                                                                  name="modal-box"
                                                                  aria-labelledby="modal-modal-title"
                                                                  aria-describedby="modal-modal-description"
                                                                  className="modal-box"
                                                                >
                                                                  <Box
                                                                    className="modal-box-container"
                                                                    sx={style}
                                                                  >
                                                                    <p>
                                                                      Edit
                                                                      Content -
                                                                      Day{" "}
                                                                      {
                                                                        selectedContent.dayNumber
                                                                      }
                                                                    </p>
                                                                    <Form className="form-modal">
                                                                      <Field
                                                                        type="text"
                                                                        name={`unitsByDay[${
                                                                          selectedContent.dayNumber -
                                                                          1
                                                                        }].units[${
                                                                          selectedContent.unitIndex
                                                                        }].contentList[${
                                                                          selectedContent.contentIndex
                                                                        }].content`}
                                                                        placeholder="Content"
                                                                        className="modal-item"
                                                                      />
                                                                      <ErrorMessage
                                                                        name={`unitsByDay[${
                                                                          selectedContent.dayNumber -
                                                                          1
                                                                        }].units[${
                                                                          selectedContent.unitIndex
                                                                        }].contentList[${
                                                                          selectedContent.contentIndex
                                                                        }].content`}
                                                                        className="error-mess"
                                                                        component="div"
                                                                      />

                                                                      <Field
                                                                        type="number"
                                                                        name={`unitsByDay[${
                                                                          selectedContent.dayNumber -
                                                                          1
                                                                        }].units[${
                                                                          selectedContent.unitIndex
                                                                        }].contentList[${
                                                                          selectedContent.contentIndex
                                                                        }].duration`}
                                                                        className="modal-item"
                                                                        placeholder="Duration"
                                                                      />

                                                                      <ErrorMessage
                                                                        name={`unitsByDay[${
                                                                          selectedContent.dayNumber -
                                                                          1
                                                                        }].units[${
                                                                          selectedContent.unitIndex
                                                                        }].contentList[${
                                                                          selectedContent.contentIndex
                                                                        }].duration`}
                                                                        className="error-mess"
                                                                        component="div"
                                                                      />

                                                                      <Field
                                                                        name={`unitsByDay[${
                                                                          selectedContent.dayNumber -
                                                                          1
                                                                        }].units[${
                                                                          selectedContent.unitIndex
                                                                        }].contentList[${
                                                                          selectedContent.contentIndex
                                                                        }].deliveryType`}
                                                                        placeholder="DeliveryType"
                                                                        as="select"
                                                                        className="modal-item"
                                                                      >
                                                                        <option>
                                                                          Select
                                                                          one
                                                                        </option>
                                                                        {delivery.map(
                                                                          (
                                                                            a
                                                                          ) => (
                                                                            <option
                                                                              value={
                                                                                a
                                                                              }
                                                                            >
                                                                              {
                                                                                a
                                                                              }
                                                                            </option>
                                                                          )
                                                                        )}
                                                                      </Field>
                                                                      <ErrorMessage
                                                                        name={`unitsByDay[${
                                                                          selectedContent.dayNumber -
                                                                          1
                                                                        }].units[${
                                                                          selectedContent.unitIndex
                                                                        }].contentList[${
                                                                          selectedContent.contentIndex
                                                                        }].deliveryType`}
                                                                        className="error-mess"
                                                                        component="div"
                                                                      />
                                                                      <Field
                                                                        type="checkbox"
                                                                        className="modal-item"
                                                                        name={`unitsByDay[${
                                                                          selectedContent.dayNumber -
                                                                          1
                                                                        }].units[${
                                                                          selectedContent.unitIndex
                                                                        }].contentList[${
                                                                          selectedContent.contentIndex
                                                                        }].trainingFormat`}
                                                                        render={({
                                                                          field,
                                                                          form,
                                                                        }) => (
                                                                          <FormControlLabel
                                                                            control={
                                                                              <Switch
                                                                                {...field}
                                                                                checked={
                                                                                  field.value ===
                                                                                  "Online"
                                                                                }
                                                                                onChange={(
                                                                                  e
                                                                                ) => {
                                                                                  form.setFieldValue(
                                                                                    `unitsByDay[${
                                                                                      selectedContent.dayNumber -
                                                                                      1
                                                                                    }].units[${
                                                                                      selectedContent.unitIndex
                                                                                    }].contentList[${
                                                                                      selectedContent.contentIndex
                                                                                    }].trainingFormat`,
                                                                                    e
                                                                                      .target
                                                                                      .checked
                                                                                      ? "Online"
                                                                                      : "Offline"
                                                                                  );
                                                                                }}
                                                                              />
                                                                            }
                                                                            label={
                                                                              field.value ===
                                                                              "Online"
                                                                                ? "Online"
                                                                                : "Offline"
                                                                            }
                                                                          />
                                                                        )}
                                                                      />
                                                                      <Button
                                                                        key="submit"
                                                                        type="primary"
                                                                        onClick={() =>
                                                                          validateForm().then(
                                                                            (
                                                                              error
                                                                            ) => {
                                                                              if (
                                                                                error.unitsByDay !==
                                                                                undefined
                                                                              ) {
                                                                                if (
                                                                                  error
                                                                                    .unitsByDay[
                                                                                    selectedContent.dayNumber -
                                                                                      1
                                                                                  ] !==
                                                                                  undefined
                                                                                ) {
                                                                                  console.log(
                                                                                    error
                                                                                  );
                                                                                  if (
                                                                                    error
                                                                                      .unitsByDay[
                                                                                      selectedContent.dayNumber -
                                                                                        1
                                                                                    ]
                                                                                      .units[
                                                                                      selectedContent
                                                                                        .unitIndex
                                                                                    ] !==
                                                                                    undefined
                                                                                  ) {
                                                                                    if (
                                                                                      error
                                                                                        .unitsByDay[
                                                                                        selectedContent.dayNumber -
                                                                                          1
                                                                                      ]
                                                                                        .units[
                                                                                        selectedContent
                                                                                          .unitIndex
                                                                                      ]
                                                                                        .contentList !==
                                                                                      undefined
                                                                                    ) {
                                                                                      if (
                                                                                        error
                                                                                          .unitsByDay[
                                                                                          selectedContent.dayNumber -
                                                                                            1
                                                                                        ]
                                                                                          .units[
                                                                                          selectedContent
                                                                                            .unitIndex
                                                                                        ]
                                                                                          .contentList[
                                                                                          selectedContent
                                                                                            .contentIndex
                                                                                        ] !==
                                                                                        undefined
                                                                                      ) {
                                                                                      } else {
                                                                                        handleCancel();
                                                                                      }
                                                                                    } else {
                                                                                      handleCancel();
                                                                                    }

                                                                                    console.log(
                                                                                      error
                                                                                        .unitsByDay[
                                                                                        selectedContent.dayNumber -
                                                                                          1
                                                                                      ]
                                                                                        .units[
                                                                                        selectedContent
                                                                                          .unitIndex
                                                                                      ]
                                                                                    );
                                                                                  } else {
                                                                                    console.log(
                                                                                      error
                                                                                        .unitsByDay[
                                                                                        selectedContent.dayNumber -
                                                                                          1
                                                                                      ]
                                                                                        .units[
                                                                                        selectedContent
                                                                                          .unitIndex
                                                                                      ]
                                                                                    );
                                                                                    handleCancel();
                                                                                  }
                                                                                } else {
                                                                                  console.log(
                                                                                    error
                                                                                      .unitsByDay[
                                                                                      selectedContent.dayNumber -
                                                                                        1
                                                                                    ]
                                                                                  );
                                                                                  handleCancel();
                                                                                }
                                                                              } else {
                                                                                handleCancel();
                                                                              }
                                                                            }
                                                                          )
                                                                        }
                                                                      >
                                                                        Submit
                                                                      </Button>
                                                                    </Form>
                                                                  </Box>
                                                                </Modal>
                                                              </div>
                                                            )
                                                          )}
                                                          <CiCirclePlus
                                                            className="plus-icon"
                                                            onClick={() =>
                                                              push({
                                                                content: "",
                                                                deliveryType:
                                                                  "",
                                                                duration: 0,
                                                                learningObjective:
                                                                  "",
                                                                note: "",
                                                                trainingFormat:
                                                                  "",
                                                              })
                                                            }
                                                          />
                                                        </div>
                                                      )}
                                                    </FieldArray>
                                                  </>
                                                </div>
                                              )
                                            )}
                                            <Button
                                              type="button"
                                              className="unit-add"
                                              onClick={() =>
                                                push({
                                                  unit_name: "",
                                                  contentList: [
                                                    {
                                                      content: "",
                                                      deliveryType: "",
                                                      duration: 0,
                                                      learningObjective: "",
                                                      note: "",
                                                      trainingFormat: "",
                                                    },
                                                  ],
                                                })
                                              }
                                            >
                                              <CiCirclePlus className="add-icon-unit" />
                                              Create
                                            </Button>
                                          </>
                                        )}
                                      </FieldArray>
                                    </div>
                                  </Typography>
                                </AccordionDetails>
                              </Accordion>
                            ))}
                          </div>
                        )}
                      </FieldArray>
                    </div>
                    <div className="btn-action-outline-syllabus">
                      <button
                        className="btn-previous-ouline-syllabus"
                        onClick={() => setPage(page - 1)}
                      >
                        Previous
                      </button>
                      <button
                        className="btn-addnew-ouline-syllabus"
                        onClick={() => {
                          let lastDayNumber = 0;

                          {
                            values.dayNumber.length !== 0
                              ? (lastDayNumber = Number(
                                  values.dayNumber[
                                    Number(values.dayNumber.length - 1)
                                  ]
                                ))
                              : (lastDayNumber = 0);
                          }
                          console.log(lastDayNumber);
                          // Calculate the new day number
                          let newDayNumber = lastDayNumber + 1;
                          // console.log(Number(newDayNumber));
                          console.log(values.unitsByDay);
                          // Use setValues to immediately update the state
                          setValues((prevValues) => {
                            const newDayNumber = lastDayNumber + 1;

                            const updatedDayNumber = [
                              ...prevValues.dayNumber,
                              newDayNumber,
                            ];

                            const updatedUnitsByDay = updatedDayNumber.map(
                              (day) => {
                                const existingDay = prevValues.unitsByDay.find(
                                  (d) => d.day_number === day
                                );
                                if (existingDay) {
                                  return existingDay;
                                } else {
                                  return {
                                    day_number: day,
                                    units: [
                                      {
                                        unit_name: "",
                                        contentList: [
                                          {
                                            content: "",
                                            deliveryType: "",
                                            duration: 0,
                                            learningObjective: "",
                                            note: "",
                                            trainingFormat: "",
                                          },
                                        ],
                                      },
                                    ],
                                  };
                                }
                              }
                            );

                            return {
                              ...prevValues,
                              dayNumber: updatedDayNumber,
                              unitsByDay: updatedUnitsByDay,
                            };
                          });
                        }}
                      >
                        Add day
                      </button>
                    </div>
                  </div>
                ) : (
                  //END OUTLINE
                  <div>
                    <label>Training Principles: </label>
                    <Field
                      as="textarea"
                      name="training_principles"
                      type="text"
                      className="principles"
                    />
                    <div className="btn-action-outline-syllabus">
                      <button
                        className="btn-previous-ouline-syllabus"
                        onClick={() => setPage(page - 1)}
                      >
                        Previous
                      </button>
                    </div>
                  </div>
                )}
                <div className="form-create-syllabus-action">
                  <Button
                    className="form-create-syllabus-draft"
                    type="button"
                    onClick={() => {
                      setFieldValue("publish_status", "Draft");
                      console.log(values.publish_status);
                    }}
                  >
                    Save as Draft
                  </Button>
                  <Button
                    className="form-create-syllabus-submit"
                    type="submit"
                    onClick={() => {
                      switchPage();
                      setFieldValue("publish_status", "Active");
                    }}
                  >
                    Save
                  </Button>
                  <ToastContainer
                    position="top-center"
                    autoClose={2000}
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
                <Modal
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="child-modal-title"
                  aria-describedby="child-modal-description"
                >
                  <Box sx={{ ...style1, width: 400 }}>
                    <h4 id="child-modal-title">
                      Are you sure you want to create this Syllabus ?
                    </h4>

                    <Button type="button" onClick={handleClose}>
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      onClick={() => {
                        validateForm().then((errors) => {
                          if (
                            errors.topic_name !== undefined ||
                            errors.version !== undefined ||
                            errors.training_audience !== undefined ||
                            errors.level !== undefined ||
                            errors.technical_group !== undefined ||
                            errors.learningList !== undefined
                          ) {
                            toast.error(
                              errors.topic_name ||
                                errors.version ||
                                errors.training_audience ||
                                errors.technical_group ||
                                errors.level ||
                                errors.learningList,
                              {
                                position: "top-center",
                                autoClose: 2000,
                                hideProgressBar: false,
                                closeOnClick: true,
                                pauseOnHover: true,
                                draggable: true,
                                progress: undefined,
                                theme: "light",
                              }
                            );
                            console.log(errors);
                          } else if (errors.unitsByDay !== undefined) {
                            toast.error("Check your Outline Screen !", {
                              position: "top-center",
                              autoClose: 2000,
                              hideProgressBar: false,
                              closeOnClick: true,
                              pauseOnHover: true,
                              draggable: true,
                              progress: undefined,
                              theme: "light",
                            });
                          } else if (errors.training_principles !== undefined) {
                            toast.error(errors.training_principles, {
                              position: "top-center",
                              autoClose: 2000,
                              hideProgressBar: false,
                              closeOnClick: true,
                              pauseOnHover: true,
                              draggable: true,
                              progress: undefined,
                              theme: "light",
                            });
                          } else {
                            toast.success("Create Successfully!", {
                              position: "top-center",
                              autoClose: 2000,
                              hideProgressBar: false,
                              closeOnClick: true,
                              pauseOnHover: true,
                              draggable: true,
                              progress: undefined,
                              theme: "light",
                            });
                          }
                        });
                        console.log(values.publish_status);
                        handleClose();
                      }}
                    >
                      Save
                    </Button>
                  </Box>
                </Modal>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default CreateSyllabus;
