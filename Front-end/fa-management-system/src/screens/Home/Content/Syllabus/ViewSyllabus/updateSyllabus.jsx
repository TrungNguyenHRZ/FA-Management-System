import React, { useEffect, useState, useMemo } from "react";
import apiSyllabusInstance from "../../../../../service/api-syllabus";
import { useParams, Link } from "react-router-dom";
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

import { MdOutlineEdit } from "react-icons/md";
// import Button from "@mui/material/Button";
import jwtDecode from "jwt-decode";
import Cookies from "js-cookie";
import { CiCircleMinus, CiCirclePlus } from "react-icons/ci";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import TextField from "@mui/material/TextField";
import * as Yup from "yup";
import "./updateSyllabus.css";


const UpdateSyllabus = () => {
  const paramName = useParams();
  const [syllabus, setSyllabus] = useState({});
  const [page, setPage] = useState(1);
  const [groupedUnits, setGroupedUnits] = useState([]);
  const [expanded, setExpanded] = useState("panel1");
  console.log(paramName.id);
  const steps = ["General", "Outline", "Others", "Completed"];

  useEffect(() => {
    apiSyllabusInstance
      .get(`/viewSyllabus/${paramName.id}`)
      .then((response) => {
        console.log(response.data.payload);
        setSyllabus(response.data.payload);
        // setUnit(syllabus.unitList);

        const groupedUnits = response.data.payload.unitList.reduce(
          (acc, unit) => {
            const { day_number, ...rest } = unit;
            if (!acc[day_number]) {
              acc[day_number] = { day_number, units: [] };
            }
            acc[day_number].units.push(rest);
            return acc;
          },
          []
        );
        const unitsByDay = groupedUnits.filter((day) => day !== undefined);

        setGroupedUnits(unitsByDay);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const initialValues = {
    ...syllabus,
    groupedUnits,
  };

  console.log(initialValues);

  const formikRef = React.useRef(null);
  
  const removeDay = (indexToRemove, setValues) => {
    setValues((prevValues) => ({
      ...prevValues,
      dayNumber: prevValues.dayNumber.filter(
        (_, index) => index !== indexToRemove
      ),
      unitsByDay: prevValues.unitsByDay.filter(
        (_, index) => index !== indexToRemove
      ),
    }));
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

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  useEffect(() => {
    // Đặt giá trị ban đầu cho Formik khi syllabus đã được cập nhật
    if (Object.keys(syllabus).length > 0) {
      const initialValues = {
        ...syllabus,
        groupedUnits,
      };

      // Kiểm tra xem formikRef đã được khởi tạo chưa
      if (formikRef.current) {
        // Sử dụng setValues để cập nhật giá trị của Formik
        formikRef.current.setValues(initialValues);
      }
    }
  }, [syllabus, groupedUnits]);

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

  const convertToUnitList = (values) => {
    const unitList = values.groupedUnits.flatMap((day) =>
      day.units.map((unit) => ({
        unit_code: unit.unit_code,
        unit_name: unit.unit_name,
        day_number: day.day_number,
        contentList: unit.contentList,
      }))
    );

    const updatedUnitList = unitList.filter(unit => unit.unit_code !== undefined)
    return updatedUnitList;
  };

  const convertToNewUnitList = (values) => {
    const unitList = values.groupedUnits.flatMap((day) =>
      day.units.map((unit) => ({
        unit_code: unit.unit_code,
        unit_name: unit.unit_name,
        day_number: day.day_number,
        contentList: unit.contentList,
      }))
    );

    

    const updatedUnitList = unitList.filter(unit => unit.unit_code === undefined)
    return updatedUnitList;
  };

  const delivery = [
    "Assignment/Lab",
    "Concept/Lecture",
    "Guide/Review",
    "Test/Quiz",
    "Exam",
    "Seminar/Workshop",
  ];
  //   console.log(syllabus);

  const handleSubmit = (values) => {
    // apiSyllabusInstance.put(`/updateSyllabus/${syllabus.topic_code}`,values);
    const afterValue = convertToUnitList(values);
    const newUnits = convertToNewUnitList(values);

    const updatedValue = {
      ...values,
      unitList: afterValue,
      groupedUnits: null,
    };
    apiSyllabusInstance.put(
      `/updateSyllabus/${syllabus.topic_code}`,
      updatedValue
    );
    apiSyllabusInstance.post(`/saveUnit/${values.topic_code}`,newUnits)
    console.log(newUnits);
  };

  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", selectedFile);

      const response = await apiSyllabusInstance.post(
        `/uploadMaterials/${syllabus.topic_code}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("File uploaded successfully:", response.data);
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };


  const deleteUnit = async (unit_code) => {
    try {
      const response = await apiSyllabusInstance.delete(
        `/deleteUnit/${unit_code}`
      );
    } catch (e) {
      console.log(e);
    }
  };

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
      remove(index);
      event.preventDefault();
    }
  };
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
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          innerRef={formikRef}
        >
          {({  values,
              setFieldValue,
              errors,
              touched,
              setValues,
              isValidating,
              validateForm, }) => (
            <Form>
              {console.log(values)}
              {page === 1 ? (
                <div className="update-general">
                  <label>Syllabus Name: </label>
                  <Field type="text" name="topic_name" />
                  <label>Version: </label>
                  <Field type="text" name="version" />
                  <label>Training audience: </label>
                  <Field type="number" name="training_audience" />
                  <label>Technical requirements:</label>
                  <Field name="technical_group" as="textarea" />
                  <label>Course Objective(s)</label>
                  <FieldArray name="learningList">
                    {({ push, remove }) => (
                      <>
                        {values.learningList &&
                          values.learningList.map((a, lIndex) => (
                            <div key={lIndex}>
                              <Field
                                name={`learningList[${lIndex}].learningObjectList.learning_description`}
                                onKeyDown={(e) =>
                                  handleKeyPress(e, push, lIndex, remove)
                                }
                                type="text"
                              />
                            </div>
                          ))}
                      </>
                    )}
                  </FieldArray>
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
                    onChange={handleFileChange}
                  />
                  <div>
                    {selectedFile
                      ? selectedFile.name
                      : syllabus.training_materials}
                  </div>
                  <button onClick={handleUpload}>Upload</button>
                </div>
              ) : page === 2 ? (
                <div>
                    <div className="outline">
                      <FieldArray name="groupedUnits">
                        {({ push, remove }) => (
                          <div>
                            {values.groupedUnits.map((day, dayIndex) => (
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
                                      onClick={() =>
                                        removeDay(dayIndex, setValues)
                                      }
                                      className="minus-icon"
                                    />
                                  </div>
                                </AccordionSummary>

                                <AccordionDetails>
                                  <Typography>
                                    <div className="syllabus-content-container-c">
                                      <FieldArray
                                        name={`groupedUnits[${dayIndex}].units`}
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
                                                      id={`groupedUnits[${dayIndex}].units[${unitIndex}].unit_name`}
                                                      name={`groupedUnits[${dayIndex}].units[${unitIndex}].unit_name`}
                                                    />
                                                    <CiCircleMinus
                                                      className="minus-icon"
                                                      type="button"
                                                      onClick={() =>
                                                        remove(unitIndex)
                                                      }
                                                    />

                                                    <FieldArray
                                                      name={`groupedUnits[${dayIndex}].units[${unitIndex}].contentList`}
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
                                                                    name={`groupedUnits[${dayIndex}].units[${unitIndex}].contentList[${contentIndex}].content`}
                                                                    placeholder="Content"
                                                                    readOnly
                                                                    className="syllabus-content-name-c"
                                                                  />
                                                                </div>

                                                                <div className="syllabus-content-box-right-c">
                                                                  <Field
                                                                    type="text"
                                                                    name={`groupedUnits[${dayIndex}].units[${unitIndex}].contentList[${contentIndex}].deliveryType`}
                                                                    placeholder="DeliveryType"
                                                                    readOnly
                                                                    className="syllabus-content-format-c"
                                                                  />
                                                                  <Field
                                                                    type="number"
                                                                    name={`groupedUnits[${dayIndex}].units[${unitIndex}].contentList[${contentIndex}].duration`}
                                                                    placeholder="Duration"
                                                                    readOnly
                                                                    className="syllabus-content-name-c"
                                                                  />
                                                                  <Field
                                                                    type="text"
                                                                    name={`groupedUnits[${dayIndex}].units[${unitIndex}].contentList[${contentIndex}].trainingFormat`}
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
                                                                  onClose={
                                                                    handleCancel
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
                                                                        name={`groupedUnits[${
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
                                                                        name={`groupedUnits[${
                                                                          selectedContent.dayNumber -
                                                                          1
                                                                        }].units[${
                                                                          selectedContent.unitIndex
                                                                        }].contentList[${
                                                                          selectedContent.contentIndex
                                                                        }].content`}
                                                                      />

                                                                      <Field
                                                                        type="number"
                                                                        name={`groupedUnits[${
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

                                                                      <Field
                                                                        name={`groupedUnits[${
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
                                                                        name={`groupedUnits[${
                                                                          selectedContent.dayNumber -
                                                                          1
                                                                        }].units[${
                                                                          selectedContent.unitIndex
                                                                        }].contentList[${
                                                                          selectedContent.contentIndex
                                                                        }].deliveryType`}
                                                                      />
                                                                      <Field
                                                                        type="checkbox"
                                                                        className="modal-item"
                                                                        name={`groupedUnits[${
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
                                                                                    `groupedUnits[${
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
                                                                              if(error.groupedUnits !== undefined) {
                                                                                if (
                                                                                  error
                                                                                    .groupedUnits[
                                                                                    selectedContent.dayNumber -
                                                                                      1
                                                                                  ] !==
                                                                                  undefined
                                                                                ) {
                                                                                  console.log(
                                                                                    error
                                                                                  );
                                                                                  if (error.groupedUnits[selectedContent.dayNumber - 1]
                                                                                      .units[
                                                                                      selectedContent
                                                                                        .unitIndex
                                                                                    ] !==
                                                                                    undefined
                                                                                  ) {
                                                                                    if (error.groupedUnits[selectedContent.dayNumber - 1]
                                                                                        .units[
                                                                                        selectedContent
                                                                                          .unitIndex
                                                                                      ]
                                                                                        .contentList[
                                                                                        selectedContent
                                                                                          .contentIndex
                                                                                      ] !== undefined) {
                                                                                    } else {
                                                                                      handleCancel();
                                                                                    }
                                                                                    console.log(
                                                                                      error
                                                                                        .groupedUnits[
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
                                                                                        .groupedUnits[
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
                                                                                      .groupedUnits[
                                                                                      selectedContent.dayNumber -
                                                                                        1
                                                                                    ]
                                                                                  );
                                                                                  handleCancel();
                                                                                }
                                                                              }else{
                                                                                handleCancel()
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
                        className="btn-save-ouline-syllabus"
                        onClick={() => setPage(page + 1)}
                      >
                        Save
                      </button>
                      <button
                        className="btn-addnew-ouline-syllabus"
                        onClick={() => {
                          let lastDayNumber = Number(
                            values.dayNumber[
                              Number(values.dayNumber.length - 1)
                            ]
                          );

                          // Calculate the new day number
                          let newDayNumber = lastDayNumber + 1;
                          // console.log(Number(newDayNumber));
                          console.log(values.dayNumber[2]);
                          console.log(values.dayNumber.length);
                          console.log(
                            values.dayNumber[values.dayNumber.length - 1]
                          );
                          console.log(values.dayNumber);
                          // Use setValues to immediately update the state
                          setValues((prevValues) => ({
                            ...prevValues,
                            dayNumber: [...prevValues.dayNumber, newDayNumber],
                          }));
                          const updatedUnitsByDay = values.dayNumber.map(
                            (day) => ({
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
                            })
                          );
                          setFieldValue("unitsByDay", updatedUnitsByDay);
                        }}
                      >
                        Add day
                      </button>
                    </div>
                  </div>
              ) : null}
              <button type="submit">Update</button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default UpdateSyllabus;
