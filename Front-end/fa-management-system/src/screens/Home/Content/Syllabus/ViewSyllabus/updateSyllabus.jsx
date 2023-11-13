import React, { useEffect, useState, useMemo } from "react";
import apiSyllabusInstance from "../../../../../service/api-syllabus";
import { useParams, Link } from "react-router-dom";
import "./updateSyllabus.css";
import { Formik, Field, Form, FieldArray } from "formik";

const UpdateSyllabus = () => {
  const paramName = useParams();
  const [syllabus, setSyllabus] = useState({});
  const [page, setPage] = useState(1);
  const [groupedUnits, setGroupedUnits] = useState([]);
  console.log(paramName.id);

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

  const formikRef = React.useRef(null);

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
    const a = [];
    const unitList = values.groupedUnits.flatMap((day) =>
      day.units.map((unit) => ({
        unit_name: unit.unit_name,
        day_number: day.day_number,
        contentList: unit.contentList
      }))
    );

    return unitList;
  };

//   console.log(syllabus);
  

  
  const handleSubmit = (values) => {
    // apiSyllabusInstance.put(`/updateSyllabus/${syllabus.topic_code}`,values);
    const afterValue = convertToUnitList(values);
    const updatedValue = {
      ...values,
      unitList: afterValue,
      groupedUnits: null
    }
	console.log(updatedValue);
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

  const [showDayFields, setShowDayFields] = useState({});

  const handleToggleDayFields = (dayIndex) => {
    setShowDayFields((prevShowDayFields) => ({
      ...prevShowDayFields,
      [dayIndex]: !prevShowDayFields[dayIndex] || false,
    }));
  };

  return (
    <div>
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
          {({ values, setFieldValue, errors, touched }) => (
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
                <>
                  <div>
                    {values.groupedUnits.map((day, dayIndex) => (
                      <div key={dayIndex}>
                        <button
                          type="button"
                        //   onClick={() => handleToggleDayFields(dayIndex)}
                        >
                          Day 
                        </button>
                        {true && (
                          <FieldArray name={`groupedUnits[${dayIndex}].units`}>
                            {({ push, remove }) => (
                              <div>
                                {day.units.map((unit, unitIndex) => (
                                  <div key={unitIndex} id={unitIndex}>
                                    <Field
                                      type="text"
                                      id={`groupedUnits[${dayIndex}].units[${unitIndex}].unit_name`}
                                      name={`groupedUnits[${dayIndex}].units[${unitIndex}].unit_name`}
                                    />
                                    <button
                                      type="button"
                                      onClick={() => remove(unitIndex)}
                                    >
                                      -
                                    </button>
                                    <FieldArray
                                      name={`groupedUnits[${dayIndex}].units[${unitIndex}].contentList`}
                                    >
                                      <div>
                                        {unit.contentList.map(
                                          (content, contentIndex) => (
                                            <div key = {contentIndex}>
                                              <Field
                                                type="text"
                                                name={`groupedUnits[${dayIndex}].units[${unitIndex}].contentList[${contentIndex}].content`}
                                                placeholder="Content"
                                              />
                                              <Field
                                                type="text"
                                                name={`groupedUnits[${dayIndex}].units[${unitIndex}].contentList[${contentIndex}].trainingFormat`}
                                                placeholder="Content"
                                              />
                                              <Field
                                                type="text"
                                                name={`groupedUnits[${dayIndex}].units[${unitIndex}].contentList[${contentIndex}].duration`}
                                                placeholder="Content"
                                              />
                                              <Field
                                                type="text"
                                                name={`groupedUnits[${dayIndex}].units[${unitIndex}].contentList[${contentIndex}].deliveryType`}
                                                placeholder="Content"
                                              />
                                            </div>
                                          )
                                        )}
                                      </div>
                                    </FieldArray>
                                  </div>
                                ))}
                              </div>
                            )}
                          </FieldArray>
                        )}
                      </div>
                    ))}
                  </div>
                </>
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
