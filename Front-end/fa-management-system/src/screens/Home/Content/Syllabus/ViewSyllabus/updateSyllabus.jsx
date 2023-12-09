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
import {useNavigate } from "react-router";
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
import { FaCloudUploadAlt } from "react-icons/fa";
import { MdClose } from "react-icons/md";
import Snackbar from '@mui/material/Snackbar';
import { ToastContainer, toast } from 'react-toastify';
import "./updateSyllabus.css";


const UpdateSyllabus = () => {
  const paramName = useParams();
  const [syllabus, setSyllabus] = useState({});
  const [page, setPage] = useState(1);
  const [groupedUnits, setGroupedUnits] = useState([]);
  const [expanded, setExpanded] = useState("panel1");
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState(null);
  const [permission,setPermission] = useState("");
  const [openDraft,setOpenDraft] = useState(false);

  const handleOpenDraft = () => {
    setOpenDraft(true);
  }

  const handleCloseDraft = () => {
    setOpenDraft(false);
  }
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const switchPage = () => {
    if (page === 3) {
      handleOpen();
    } else {
      setPage(page + 1);
    }
  };
  
  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      const decodedToken = jwtDecode(token);
      setUserInfo(decodedToken);
      
    }
  }, []);
  console.log(paramName.id);
  const steps = ["General", "Outline", "Others", "Completed"];
  let a
  if(userInfo){
    a = userInfo.permission;
  }

  console.log(userInfo)

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
      
  }, [paramName.id]);

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

 

  const formikRef = React.useRef(null);

  const initialValues = {
    ...syllabus,
    groupedUnits,
  };
  
  const removeDay = (indexToRemove, setValues) => {
    console.log(indexToRemove);
    setValues((prevValues) => {
      const updatedGroupedUnits = [...prevValues.groupedUnits];
      const indexInGroupedUnits = initialValues.groupedUnits.findIndex(
        (day) => day.day_number === indexToRemove + 1
      );
      console.log(initialValues.groupedUnits[indexInGroupedUnits]);
      if(indexInGroupedUnits !== -1){
        initialValues.groupedUnits[indexInGroupedUnits].units.map((unit) => {
          deleteUnit(unit.unit_code);
        })
      }
      updatedGroupedUnits.splice(indexToRemove, 1);
      console.log(updatedGroupedUnits);
      return {
        ...prevValues,
        groupedUnits: updatedGroupedUnits,
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
  const [validContent,setValidContent] = useState({
    content:null,
    deliveryType:null,
    duration:0
  })

  const getValidContent = (content,deliveryType, duration) =>{
    setValidContent({
      content : content,
      deliveryType : deliveryType,
      duration : duration
    })
  }

  // Hàm đóng modal
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };



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
        contentList: unit.contentList.map((content) => ({
          contentId : content.contentId !== 0 ? content.contentId : 0,
          ...content
        })),
      }))
    );

    const updatedUnitList = unitList.filter(unit => unit.unit_code !== 0)
    return updatedUnitList;
  };

  const convertToNewUnitList = (values) => {
    const unitList = values.groupedUnits.flatMap((day) =>
      day.units.map((unit) => ({
        unit_code: unit.unit_code,
        unit_name: unit.unit_name,
        day_number: day.day_number,
        contentList: unit.contentList.map((content) => ({
          contentId : content.contentId !== 0 ||  content.contentId === undefined 
          ? content.contentId : 0,
          ...content
        })),
      }))
    );
    const updatedUnitList = unitList.filter(unit => unit.unit_code === 0)
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
    console.log(updatedValue);
    apiSyllabusInstance.put(
      `/updateSyllabus/${syllabus.topic_code}`,
      updatedValue
    ).then(response => {
      if(selectedFile !== null){
        const formData = new FormData();
        formData.append("file", selectedFile);
        apiSyllabusInstance.post(`/uploadMaterials/${response.data.payload.topic_code}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
      }
      
    });

    apiSyllabusInstance.post(`/saveUnit/${values.topic_code}`,newUnits)
    console.log(newUnits);

    // setTimeout(() => {
    //   const id = values.topic_code; // Thay thế bằng id cụ thể bạn muốn navigate đến
    //   navigate(`/view-syllabus/${id}`)
    // }, 2200);
  };

  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
    
  };

  console.log(selectedFile)
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


  const deleteUnit =  async (unit_code) => {
    try {
      console.log(unit_code);
      const response = await apiSyllabusInstance.delete(
        `/deleteUnit/${unit_code}`
      );
    } catch (e) {
      console.log(e);
    }
  };

  const deleteContent =  async (content_id) => {
    try {
      console.log(content_id);
      const response = await apiSyllabusInstance.delete(
        `/deleteContent/${content_id}`
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
      event.preventDefault();
    } else if (event.key === "Backspace" && event.target.value === "") {
      // Remove the field when Backspace is pressed and the field is empty
      if(index !== 0 ){
        remove(index);
        console.log(index);
      }
     
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

  const addDay = (setValues) => {
    setValues((prevValues) => {
      const maxDayNumber = prevValues.groupedUnits.reduce(
        (max, day) => Math.max(max, day.day_number),
        0
      );
  
      const newDayNumber = maxDayNumber + 1;
      const newDay = { day_number: newDayNumber, units: [] };
  
      return {
        ...prevValues,
        groupedUnits: [...prevValues.groupedUnits, newDay],
      };
    });
  };

  let levels = ["fresher", "junior", "senior"];

  const validationSchema = Yup.object().shape({
    topic_name: Yup.string().required("Syllabus Name is required"),
    training_audience: Yup.number()
      .positive("Number must be greater than 0")
      .required("Number is required"),
    technical_group:Yup.string().required("Technical Requirement is required"),
    level:Yup.string()
    .required("Level is required")
    .oneOf(
      levels, // Các giá trị cho phép
      "Invalid level"
    ),
    training_principles:Yup.string().required("Training principles is required")
    .max(255, "Maximum 255 characters"),
    learningList:Yup.array().min(1, "Course Objective(s) is required"),
    groupedUnits: Yup.array().of(
      Yup.object().shape({
        units: Yup.array().of(
          Yup.object().shape({
            unit_name : Yup.string().required("Unit name is required"),
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
let check = false;


  return (
  a === "Super admin" || a === "Admin" || a === "Trainer" ? <div className="create-syllabus-container">
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
          validationSchema={validationSchema}
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
              {/* {console.log(values)} */}
              {page === 1 ? (
                <div className="update-general">
                  <label>Syllabus Name: </label>
                  <Field type="text" name="topic_name" />
                  <ErrorMessage name="topic_name" component="div" className="error-mess"/>
                  <label>Version: </label>
                  <Field type="text" name="version" />
                  <ErrorMessage name="version" component="div" className="error-mess"/>
                  <label>Training audience: </label>
                  <Field type="number" name="training_audience" />
                  <ErrorMessage name="training_audience" component="div" className="error-mess"/>
                  <label>Technical requirements:</label>
                  <Field name="technical_group" as="textarea" />
                  <ErrorMessage name="technical_group" component="div" className="error-mess"/>
                  <label>Level</label>
                  <Field name="level" as="select">
                      <option>Select one</option>
                      {levels.map((level) => (
                        <option value={level}>{level}</option>
                      ))}
                    </Field>
                  <ErrorMessage name="level" component="div" className="error-mess"/>
                  <label>Course Objective(s)</label> 
                  
                  <FieldArray name="learningList">
                    {({ push, remove }) => (
                      <>
                      <CiCirclePlus className="plus-icon-course" onClick={() => {
                         push({
                          learningObjectList: {
                          learning_name: "",
                          learning_description: "",
                          type: "",
                          },
                        });
                      }}/>
                        {values.learningList &&
                          values.learningList.map((a, lIndex) => (
                            <div key={lIndex}>
                              <Field
                              className="objective-field"
                                name={`learningList[${lIndex}].learningObjectList.learning_description`}
                                onKeyDown={(e) => {
                                  handleKeyPress(e, push, lIndex, remove)
                                }
                                }
                                type="text"
                              />
                            </div>
                          ))}
                      </>
                    )}
                  </FieldArray>
                  <ErrorMessage name="learningList" component="div" className="error-mess"/>
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
                  <div>
                    {selectedFile
                      ? selectedFile.name
                      : syllabus.training_materials}
                  </div>
              
                  </div>
                  
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
                                                    <ErrorMessage
                                                    name={`groupedUnits[${dayIndex}].units[${unitIndex}].unit_name`}
                                                    className="error-mess"
                                                    />
                                                    <CiCircleMinus
                                                      className="minus-icon"
                                                      type="button"
                                                      onClick={() => {
                                                        if(values.groupedUnits[dayIndex].units[unitIndex].unit_code !== 0) {
                                                          deleteUnit(values.groupedUnits[dayIndex].units[unitIndex].unit_code)
                                                          remove(unitIndex);
                                                        } else {
                                                          remove(unitIndex)
                                                        }
                                                        console.log(values.groupedUnits[dayIndex].units[unitIndex].unit_code)
                                                      }                                                      
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
                                                              {/* {setValidContent({
                                                                content: groupedUnits[dayIndex].units[unitIndex].contentList[contentIndex].content,
                                                                deliveryType: groupedUnits[dayIndex].units[unitIndex].contentList[contentIndex].deliveryType,
                                                                duration: groupedUnits[dayIndex].units[unitIndex].contentList[contentIndex].duration
                                                              })} */}
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
                                                                  onClick={() =>{
                                                                    if(values.groupedUnits[dayIndex].units[unitIndex].contentList[contentIndex].contentId !== 0){
                                                                      deleteContent(values.groupedUnits[dayIndex].units[unitIndex].contentList[contentIndex].contentId)
                                                                      remove(
                                                                        contentIndex
                                                                      )
                                                                    }else{
                                                                      remove(
                                                                        contentIndex
                                                                      )
                                                                    }                                                      
                                                                  }
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
                                                                    errors === undefined ?
                                                                    handleCancel : null
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
                                                                    <div className="modal-title">
                                                                    <p>
                                                                      Edit
                                                                      Content -
                                                                      Day{" "}s
                                                                      {
                                                                        selectedContent.dayNumber
                                                                      }
                                                                    </p>
                                                                  
                                                                    </div>
                                                                    
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
                                                                        className="error-mess"
                                                                        component="div"
                                                                      />

                                                                      <Field
                                                                        type="number"
                                                                        min="0"
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
                                                                      <ErrorMessage
                                                                        name={`groupedUnits[${
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
                                                                        className="error-mess"
                                                                        component="div"
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
                                                                        type="button"
                                                                        onClick={() =>{
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
                                                                                  console.log(values.groupedUnits)
                                                                                }
                                                                              }else{
                                                                                handleCancel();
                                                                                console.log(values.groupedUnits)
                                                                              }
                                                                              
                                                                            }
                                                                          )
                                                                        }  } 
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
                                                                contentId:0,
                                                                content: "",
                                                                deliveryType:
                                                                  "",
                                                                duration: 0,
                                                                learningObjective:
                                                                  "",
                                                                note: "",
                                                                trainingFormat:
                                                                  "Offline",
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
                                              onClick={() => {
                                                push({
                                                  unit_code : 0,
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
                                                })
                                                console.log(values.groupedUnits)
                                              }

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
                          addDay(setValues)
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
                    type="submit"
                    onClick={() => {
                      toast.success('Save as Draft Successfully!', {
                        position: "top-center",
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                        });
                      handleOpenDraft();
                      setFieldValue("publish_status", "Draft");
                      console.log(values.publish_status);
                    }}
                  >
                    Save as Draft
                  </Button>
                  <Button
                    className="form-create-syllabus-submit"
                    type="button"
                    onClick={() => {
                      handleOpen();
                    }
                      
                    }
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
                      Are you sure you want to update this Syllabus ?
                    </h4>

                    <Button type="button" onClick={handleClose}>
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      onClick={() => {
                        validateForm().then((errors) => {
                          if(
                            errors.topic_name !== undefined || 
                            errors.version !== undefined ||
                            errors.training_audience !== undefined ||
                            errors.level !== undefined ||
                            errors.technical_group !== undefined||
                            errors.learningList !== undefined 
                            )
                          {
                            toast.error( errors.topic_name || 
                              errors.version ||
                              errors.training_audience ||
                              errors.technical_group ||
                              errors.level ||
                              errors.learningList  , {
                              position: "top-center",
                              autoClose: 2000,
                              hideProgressBar: false,
                              closeOnClick: true,
                              pauseOnHover: true,
                              draggable: true,
                              progress: undefined,
                              theme: "light",
                              });
                              console.log(errors)
                          } else if(errors.groupedUnits !== undefined) {
                            toast.error( "Check your Outline Screen !", {
                              position: "top-center",
                              autoClose: 2000,
                              hideProgressBar: false,
                              closeOnClick: true,
                              pauseOnHover: true,
                              draggable: true,
                              progress: undefined,
                              theme: "light",
                              });
                          } else if(errors.training_principles !== undefined) {
                            toast.error( errors.training_principles, {
                              position: "top-center",
                              autoClose: 2000,
                              hideProgressBar: false,
                              closeOnClick: true,
                              pauseOnHover: true,
                              draggable: true,
                              progress: undefined,
                              theme: "light",
                              });
                          } else{
                            toast.success('Update Successfully!', {
                              position: "top-center",
                              autoClose: 2000,
                              hideProgressBar: false,
                              closeOnClick: true,
                              pauseOnHover: true,
                              draggable: true,
                              progress: undefined,
                              theme: "light",
                              });
                              console.log(errors)
                              
                              handleSubmit(values);
                              check = true;
                            setTimeout(() => {
                              const id = paramName.id; // Thay thế bằng id cụ thể bạn muốn navigate đến
                              navigate(`/view-syllabus/${id}`)
                            }, 2200);
                          }
                          handleClose();
                        })
                        console.log(values.publish_status);
                        

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
  : <div>Access Denied</div> ) ;
};

export default UpdateSyllabus;
