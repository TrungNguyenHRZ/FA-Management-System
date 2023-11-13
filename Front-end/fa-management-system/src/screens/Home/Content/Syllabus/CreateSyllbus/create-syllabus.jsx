import React, { useEffect, useState } from "react";
import apiSyllabusInstance from "../../../../../service/api-syllabus";
import { SyncLoader } from "react-spinners";
import { Formik, Field, Form, FieldArray, useFormikContext } from "formik";
import { TextareaAutosize } from "@mui/base/TextareaAutosize";
import Button from "@mui/material/Button";
import jwtDecode from "jwt-decode";
import Cookies from "js-cookie";
import "./create-syllabus.css";

const CreateSyllabus = () => {
  const [page, setPage] = useState(1);
  const [units, setUnits] = useState([]);
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      const decodedToken = jwtDecode(token);
      setUserInfo(decodedToken);
    }
  }, []);
  if(userInfo){
  console.log(userInfo.id);

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
  // let formikProps = useFormik();
  // console.log(formikProps);
  let createGeneral = () => {
    return (
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
        {/* <Field as="textarea" name="">

        </Field> */}
      </div>
    );
  };

  let createOutline = (values, setFieldValue) => {
    // return (
    //   <div>
    //      <label htmlFor="unitField">Topic Outline: </label>
    //       <>{values}</>
    //   </div>
    // )
    // console.log(unitList);
  };

  const convertToUnitList = (values) => {
    const a = [];
    const unitList = values.unitsByDay.flatMap((day) =>
      day.units.map((unit) => ({
        unit_name: unit.unit_name,
        day_number: day.day_number,
        contentList: unit.contentList
      }))
    );

    return unitList;
  };
  let userID = 0;
  if(userInfo){
  userID = userInfo.id;
  }
  const handleSubmit = (values) => {
    // Gửi dữ liệu lên máy chủ thông qua phương thức POST tại đây.
    const afterValue = convertToUnitList(values);
    const updatedValue = {
      ...values,
      unitList: afterValue,
      userId: userID,
      unitsByDay: null
    }
    console.log("Dữ liệu đã gửi:", updatedValue);
    apiSyllabusInstance.post("/saveSyllabus", updatedValue)
  };

  const unit = {
    unit_name: "",
    day_number: 0,
  };

  const dayNumber = [1, 2, 3, 4, 5, 6, 7];
 
  const handleKeyPress = (event, push, index, remove) => {
    // Kiểm tra xem người dùng có nhấn phím Enter không
    if (event.key === 'Enter') {
      // Thêm một trường mới sử dụng hàm push từ FieldArray
      push(
        { 
          learningObjectList: {
            learning_name: "",
            learning_description: "",
            type: ""
          } 
        }
        );
      // Ngăn chặn sự kiện mặc định (ví dụ: ngăn chặn việc submit form)
      event.preventDefault();
    }else if (event.key === 'Backspace' && event.target.value === '') {
      // Remove the field when Backspace is pressed and the field is empty
      remove(index);
      event.preventDefault();
    }
  };


  return (
    <div className="create-syllabus-container">
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
                    type: ""
                  }
                }
              ],
              unitsByDay: dayNumber.map((day) => ({
                day_number: day,
                units: [{ 
                  unit_name: '',
                  contentList : [
                    {
                      content : "",
                      deliveryType: "",
                      duration : 0,
                      learningObjective: "",
                      note: "",
                      trainingFormat : ""
                    }
                  ]
                }],
              })),
            }}
            onSubmit={handleSubmit}
          >
            {({ values, setFieldValue, errors, touched }) => (
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
                    {values.learningList.map((a,lIndex) => (
                      <div key={lIndex}>
                        <Field name={`learningList[${lIndex}].learningObjectList.learning_description`}
                         onKeyDown={(e) => handleKeyPress(e, push,lIndex,remove)}
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
                    {values.unitsByDay.map((day, dayIndex) => (
            <div key={dayIndex}>
              <button
                type="button"
                onClick={() => setFieldValue(`unitsByDay[${dayIndex}].showFields`, 
                !values.unitsByDay[dayIndex].showFields)}
              >
                Day {day.day_number}
              </button>
              {day.showFields && (
                <FieldArray name={`unitsByDay[${dayIndex}].units`}>
                  {({ push, remove }) => (
                    <>
                      {day.units.map((unit, unitIndex) => (
                        <div key={unitIndex} id={unitIndex}>
                          <label htmlFor={`unitsByDay[${dayIndex}].units[${unitIndex}].unit_name`}>
                            Unit Name:
                          </label>
                          <Field
                            type="text"
                            id={`unitsByDay[${dayIndex}].units[${unitIndex}].unit_name`}
                            name={`unitsByDay[${dayIndex}].units[${unitIndex}].unit_name`}
                          />
                          <button type="button" onClick={() => remove(unitIndex)}>
                            -
                          </button>
                          <FieldArray name={`unitsByDay[${dayIndex}].units[${unitIndex}].contentList`}>
                          {({ push, remove }) => (
                            <>
                            {unit.contentList.map((content,contentIndex) => (
                            <div key = {contentIndex} id={`${unitIndex}-${contentIndex}`}>
                              <label>Content</label>
                              <Field
                                type="text"
                                name={`unitsByDay[${dayIndex}].units[${unitIndex}].contentList[${contentIndex}].content`}
                                placeholder="Content"
                              />
                              <Field
                                type="text"
                                name={`unitsByDay[${dayIndex}].units[${unitIndex}].contentList[${contentIndex}].trainingFormat`}
                                placeholder="Content"
                              />
                              <Field
                                type="text"
                                name={`unitsByDay[${dayIndex}].units[${unitIndex}].contentList[${contentIndex}].duration`}
                                placeholder="Content"
                              />
                              <Field
                                type="text"
                                name={`unitsByDay[${dayIndex}].units[${unitIndex}].contentList[${contentIndex}].deliveryType`}
                                placeholder="Content"
                              />
                              <button type="button" onClick={() => remove(contentIndex)}>
                                -
                              </button>
                            </div>
                          ))}
                          <button
                            type="button"
                            onClick={() => push(
                             { 
                              content : "",
                             deliveryType: "",
                             duration : 0,
                             learningObjective: "",
                             note: "",
                             trainingFormat : ""
                              }
                        )}
                      >
                        Add Content
                      </button>
                            </>
                          )}
                          </FieldArray>
                          
                        </div>
                      ))}
                      <button
                        type="button"
                        onClick={() => push(
                          { 
                            unit_name: '',
                            contentList : [
                              {
                                content : "",
                                deliveryType: "",
                                duration : 0,
                                learningObjective: "",
                                note: "",
                                trainingFormat : ""
                              }
                            ] 
                          }
                          )}
                      >
                        Create
                      </button>
                    </>
                  )}
                </FieldArray>
              )}
            </div>
          ))}
                 <button onClick={() => setPage(page + 1)}>Save</button>
                 <button onClick={() => setPage(page - 1)}>Previous</button>
                  </div>
                ) : //END OUTLINE
                <div>
                  <Field
                  as="textarea"
                  name="training_principles"
                  type="text"
                  />
                </div>}
                <Button type="submit">Submit</Button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default CreateSyllabus;
