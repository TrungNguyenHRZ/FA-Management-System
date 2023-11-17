import React, { useEffect, useState } from "react";
import apiSyllabusInstance from "../../../../../service/api-syllabus";
import { SyncLoader } from "react-spinners";
import { Formik, Field, Form, FieldArray } from "formik";
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
// import Button from "@mui/material/Button";
import jwtDecode from "jwt-decode";
import Cookies from "js-cookie";
import { CiCircleMinus } from "react-icons/ci";
import "./create-syllabus.css";

const CreateSyllabus = () => {
  const [page, setPage] = useState(1);
  const [units, setUnits] = useState([]);
  const [userInfo, setUserInfo] = useState(null);
  const [groupedUnits, setGroupedUnits] = useState([]);
  // useEffect(() => {
  //   const token = Cookies.get("token");
  //   if (token) {
  //     const decodedToken = jwtDecode(token);
  //     setUserInfo(decodedToken);
  //   }
  // }, []);
  // if (userInfo) {
  //   console.log(userInfo.id);
  // }

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
    const a = [];
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
    apiSyllabusInstance.post("/saveSyllabus", updatedValue);
  };

  const unit = {
    unit_name: "",
    day_number: 0,
  };

  const [dayNumber, setDayNumber] = useState([1, 2, 3, 4, 5, 6, 7]);

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

  const addDay = () => {
    const newDayNumber = dayNumber[dayNumber.length - 1] + 1;

    // Use setDayNumber to update the state
    setDayNumber([...dayNumber, newDayNumber]);
    console.log(dayNumber);
  };

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

  // Hàm xử lý khi modal được submit
  const handleModalSubmit = () => {
    // Đóng modal
    setIsModalVisible(false);
  };

  const steps = ["General", "Outline", "Others"];

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
  }));

  const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
    padding: theme.spacing(2),
    borderTop: "1px solid rgba(0, 0, 0, .125)",
  }));

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
                        trainingFormat: "",
                      },
                    ],
                  },
                ],
              })),
              dayNumber: [1, 2, 3, 4, 5, 6, 7],
            }}
            onSubmit={handleSubmit}
          >
            {({ values, setFieldValue, errors, touched, setValues }) => (
              <Form>
                {page === 1 ? (
                  <div className="create-general">
                    <label>Syllabus Name: </label>
                    <Field type="text" name="topic_name" />
                    <label>Version: </label>
                    <Field type="text" name="version" />
                    <label>Training audience: </label>
                    <Field type="number" name="training_audience" />
                    <label>Technical requirements:</label>
                    <Field name="technical_group" as="textarea" />
                    <label>Level</label>
                    <Field name="level" as="select">
                      {levels.map((level) => (
                        <option value={level}>{level}</option>
                      ))}
                    </Field>
                    <label>Course Objective(s)</label>
                    <FieldArray name="learningList">
                      {({ push, remove }) => (
                        <>
                          {values.learningList.map((a, lIndex) => (
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
                    <button onClick={() => setPage(page + 1)}>Save</button>
                  </div>
                ) : page === 2 ? (
                  //Outlie Screen
                  <div>
                  <div className="outline">
                    <FieldArray name="unitsByDay">
                      {({ push, remove }) => (
                        <div>
                          {values.unitsByDay.map((day, dayIndex) => (
                            <Accordion className="create-outline">
                              <AccordionSummary
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
                                  onClick={() => removeDay(dayIndex, setValues)}
                                  className = "minus-icon"
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
                                          {day.units.map((unit, unitIndex) => (
                                            <div key={unitIndex} id={unitIndex} className="content-container-right">
                                              <>
                                              <label
                                                htmlFor={`unitsByDay[${dayIndex}].units[${unitIndex}].unit_name`}
                                              >
                                                Unit Name:
                                              </label>
                                              <Field
                                                type="text"
                                                id={`unitsByDay[${dayIndex}].units[${unitIndex}].unit_name`}
                                                name={`unitsByDay[${dayIndex}].units[${unitIndex}].unit_name`}
                                              />
                                              <button
                                                type="button"
                                                onClick={() =>
                                                  remove(unitIndex)
                                                }
                                              >
                                                -
                                              </button>

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
                                                          key={contentIndex}
                                                          id={`${unitIndex}-${contentIndex}`}
                                                          className="syllabus-content-box"
                                                        >
                                                          <label>Content</label>
                                                          <Field
                                                            type="text"
                                                            name={`unitsByDay[${dayIndex}].units[${unitIndex}].contentList[${contentIndex}].content`}
                                                            placeholder="Content"
                                                            readOnly
                                                          />
                                                          <Field
                                                            type="text"
                                                            name={`unitsByDay[${dayIndex}].units[${unitIndex}].contentList[${contentIndex}].trainingFormat`}
                                                            placeholder="TrainingFormat"
                                                            readOnly
                                                          />
                                                          <Field
                                                            type="number"
                                                            name={`unitsByDay[${dayIndex}].units[${unitIndex}].contentList[${contentIndex}].duration`}
                                                            placeholder="Duration"
                                                            readOnly
                                                          />
                                                          <Field
                                                            type="text"
                                                            name={`unitsByDay[${dayIndex}].units[${unitIndex}].contentList[${contentIndex}].deliveryType`}
                                                            placeholder="DeliveryType"
                                                            readOnly
                                                          />
                                                          <button
                                                            type="button"
                                                            onClick={() =>
                                                              remove(
                                                                contentIndex
                                                              )
                                                            }
                                                          >
                                                            -
                                                          </button>
                                                          <Button
                                                            type="button"
                                                            onClick={() =>
                                                              showModal(
                                                                day.day_number,
                                                                unitIndex,
                                                                contentIndex
                                                              )
                                                            }
                                                          >
                                                            Edit Content
                                                          </Button>
                                                          <Modal
                                                            // title={`Edit Content - Day ${selectedContent.dayNumber}`}
                                                            open={
                                                              isModalVisible
                                                            }
                                                            onClose={
                                                              handleCancel
                                                            }
                                                            aria-labelledby="modal-modal-title"
                                                            aria-describedby="modal-modal-description"
                                                          >
                                                            <Box>
                                                              <Field
                                                                type="text"
                                                                name={`unitsByDay[${dayIndex}].units[${unitIndex}].contentList[${contentIndex}].content`}
                                                                placeholder="Content"
                                                              />
                                                              <Field
                                                                type="text"
                                                                name={`unitsByDay[${dayIndex}].units[${unitIndex}].contentList[${contentIndex}].trainingFormat`}
                                                                placeholder="TrainingFormat"
                                                              />
                                                              <Field
                                                                type="number"
                                                                name={`unitsByDay[${dayIndex}].units[${unitIndex}].contentList[${contentIndex}].duration`}
                                                                placeholder="Duration"
                                                              />
                                                              <Field
                                                                type="text"
                                                                name={`unitsByDay[${dayIndex}].units[${unitIndex}].contentList[${contentIndex}].deliveryType`}
                                                                placeholder="DeliveryType"
                                                              />
                                                              <Button
                                                                key="cancel"
                                                                onClick={
                                                                  handleCancel
                                                                }
                                                              >
                                                                Cancel
                                                              </Button>

                                                              <Button
                                                                key="submit"
                                                                type="primary"
                                                                onClick={
                                                                  handleModalSubmit
                                                                }
                                                              >
                                                                Submit
                                                              </Button>
                                                            </Box>
                                                          </Modal>
                                                        </div>
                                                      )
                                                    )}
                                                    <button
                                                      type="button"
                                                      onClick={() =>
                                                        push({
                                                          content: "",
                                                          deliveryType: "",
                                                          duration: 0,
                                                          learningObjective: "",
                                                          note: "",
                                                          trainingFormat: "",
                                                        })
                                                      }
                                                    >
                                                      Add Content
                                                    </button>
                                                  </div>
                                                )}
                                              </FieldArray>
                                              </>
                                              
                                              
                                            </div>
                                          ))}
                                          <button
                                            type="button"
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
                                            Create
                                          </button>
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
                  <button onClick={() => setPage(page + 1)}>Save</button>
                    <button onClick={() => setPage(page - 1)}>Previous</button>
                    <button
                      onClick={() => {
                        let lastDayNumber = Number(
                          values.dayNumber[Number(values.dayNumber.length - 1)]
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
                ) : (
                  //END OUTLINE
                  <div>
                    <Field
                      as="textarea"
                      name="training_principles"
                      type="text"
                    />
                  </div>
                )}
                <Button
                  type="submit"
                  onClick={() => {
                    setFieldValue("publish_status", "Active");
                    console.log(values.publish_status);
                  }}
                >
                  Submit
                </Button>

                <Button
                  type="submit"
                  onClick={() => {
                    setFieldValue("publish_status", "Draft");
                    console.log(values.publish_status);
                  }}
                >
                  Save as Draft
                </Button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default CreateSyllabus;
