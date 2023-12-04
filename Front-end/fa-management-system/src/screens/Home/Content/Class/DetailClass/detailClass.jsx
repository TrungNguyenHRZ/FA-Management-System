import { React, useState } from "react";
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

const DetailClass = () => {
  const [startDate, setStartDate] = useState(dayjs("2022-04-17"));
  const [endDate, setEndDate] = useState(dayjs("2023-09-30"));
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
          <h1>FRESHER DEVELOP OPERATION</h1>
          <span>Planing</span>
        </div>
        <h5>HCM23_CPL_JAVA_13</h5>
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
                        <p>Ho Chi Minh</p>
                        <p>TruongTT9</p>
                        <p>NganDDT</p>
                        <p>FUM</p>
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
            <h1>DevOps Foundation</h1>
            <div>
              <p>
                <i>
                  31 Days (97 hours) | Modified on 23/07/2022 by{" "}
                  <strong>Warrior</strong>
                </i>
              </p>
            </div>
          </div>
          <div className="detail-class-syllabus-item-container">
            <div className="detail-class-syllabus-item">
              <div className="detail-class-syllabus-item-img">Hinh</div>
              <div className="detail-class-syllabus-item-info">
                <div className="detail-class-syllabus-item-info-title">
                  <div>LINUX</div>
                  <div>Avtive</div>
                </div>
                <div className="detail-class-syllabus-item-info-detail">
                  LIN v2.0 | 4 days (12 hours) | on 23/07/2022 by Johny Deep
                </div>
              </div>
            </div>
            <div className="detail-class-syllabus-item">
              <div className="detail-class-syllabus-item-img">Hinh</div>
              <div className="detail-class-syllabus-item-info">
                <div className="detail-class-syllabus-item-info-title">
                  <div>LINUX</div>
                  <div>Avtive</div>
                </div>
                <div className="detail-class-syllabus-item-info-detail">
                  LIN v2.0 | 4 days (12 hours) | on 23/07/2022 by Johny Deep
                </div>
              </div>
            </div>
            <div className="detail-class-syllabus-item">
              <div className="detail-class-syllabus-item-img">Hinh</div>
              <div className="detail-class-syllabus-item-info">
                <div className="detail-class-syllabus-item-info-title">
                  <div>LINUX</div>
                  <div>Avtive</div>
                </div>
                <div className="detail-class-syllabus-item-info-detail">
                  LIN v2.0 | 4 days (12 hours) | on 23/07/2022 by Johny Deep
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailClass;
