import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import "./detailClass.css";
import dayjs from "dayjs";
import { useParams, Link } from "react-router-dom";
import apiClassInstance from "../../../../../service/api-class";
import apiTrainingProgramInstance from "../../../../../service/ClassApi/api-trainingProgram";
import React, { useEffect, useState } from "react";

const DetailClass = () => {
  const [startDate, setStartDate] = useState(dayjs("2022-04-17"));
  const [endDate, setEndDate] = useState(dayjs("2023-09-30"));
  const [thisClass, setThisClass] = useState({});
  const [thisTrainingProgram, setThisTrainingProgram] = useState({});
  const [listAdmin, setListAdmin] = useState({});
  const [listTrainer, setListTrainer] = useState({});

  const paramName = useParams();

  useEffect(() => {
    apiClassInstance
      .get("/" + paramName.id)
      .then(async (response) => {
        setThisClass(response.data);
        console.log(response.data);

        apiTrainingProgramInstance
          .get(`/detail/${response.data.trainingProgram_id}`)
          .then((response) => {
            setThisTrainingProgram(response.data.payload);
            console.log(response.data.payload);
            apiClassInstance
              .get(`/getUserByClassId?classId=${paramName.id}`)
              .then((response2) => {
                for (const item of response2.data.payload) {
                  if (item.userType === "Admin") {
                    setListAdmin(item);
                    console.log(item);
                  } else {
                    setListTrainer(item);
                  }
                }
              })
              .catch((error) => {
                console.error(error);
              });
          })
          .catch((error) => {
            console.error(error);
          });
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  // const showStartDate = () => {
  //   const formattedStartDate = dayjs(startDate).format("DD/MM/YYYY");
  //   console.log("Selected Date:", formattedStartDate);
  //   return formattedStartDate;
  // };
  return (
    <div className="detail-class-container">
      <div className="detail-class-header">
        <h3>Class</h3>
        <div>
          <h1>{thisClass.className}</h1>
          <span>{thisClass.status}</span>
        </div>
        <h5>{thisClass.classCode}</h5>
      </div>
      <div className="detail-class-content">
        <div className="detail-class-form-container">
          <div className="detail-class-form">
            <Accordion defaultExpanded={true}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography>
                  <CalendarTodayIcon />
                  Genaral
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  <div className="detail-class-form-title">
                    <div className="detail-class-form-table">
                      <div className="detail-class-form-label">
                        <p>
                          <strong>Class time</strong>
                        </p>
                        <p>
                          <strong>Locate</strong>
                        </p>
                        <p>
                          <strong>Trainer</strong>
                        </p>
                        <p>
                          <strong>Admin</strong>
                        </p>
                        <p>
                          <strong>FSU</strong>
                        </p>
                      </div>
                      <div className="detail-class-form-input">
                        <p>10:00 - 11:00</p>
                        <p>{thisClass.location}</p>
                        {/* <p>{listTrainer.}</p>
                        <p>{listAdmin}</p> */}
                        <p>...</p>
                        <p>...</p>
                        <p>{thisClass.fsu}</p>
                      </div>
                    </div>
                  </div>
                </Typography>
              </AccordionDetails>
            </Accordion>
          </div>
          <div>
            <Accordion defaultExpanded={true}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography>
                  <CalendarTodayIcon />
                  Time frame
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  <div className="detail-class-calender">
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DateCalendar
                        value={startDate}
                        onChange={(newValue) => setStartDate(newValue)}
                      />
                    </LocalizationProvider>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DateCalendar
                        value={endDate}
                        onChange={(newValue) => setEndDate(newValue)}
                      />
                    </LocalizationProvider>
                  </div>
                </Typography>
              </AccordionDetails>
            </Accordion>
          </div>
        </div>
        <div className="detail-class-syllabus">
          <div className="detail-class-syllabus-title">
            <h1>{thisTrainingProgram.training_name}</h1>
            <div>
              <p>
                <i>
                  {thisTrainingProgram.duration} Days | Modified on{" "}
                  {thisTrainingProgram.modified_date} by{" "}
                  <strong>{thisTrainingProgram.modified_by}</strong>
                </i>
              </p>
            </div>
          </div>
          <div className="detail-class-syllabus-item-container">

            {thisTrainingProgram.syllabuses?.map((item, index) => (
              <div className="detail-class-syllabus-item">
                <div className="detail-class-syllabus-item-img">Hinh</div>
                <div className="detail-class-syllabus-item-info">
                  <div className="detail-class-syllabus-item-info-title">
                    <div>{item.topic_name}</div>
                    <div>{item.publish_status}</div>
                  </div>
                  <div className="detail-class-syllabus-item-info-detail">
                    Created on {item.createdDate} by {item.create_by}
                  </div>

                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailClass;
