import React, { useEffect, useState } from "react";
import apiSyllabusInstance from "../../../../../service/api-syllabus";
import { SyncLoader } from "react-spinners";
import "./syllabusDetail.css";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {
  AiOutlineStar,
  AiOutlineUsergroupAdd,
  AiOutlineSetting,
} from "react-icons/ai";
import { BsShieldCheck, BsThreeDots, BsPencil } from "react-icons/bs";
import { TbSquareDot } from "react-icons/tb";
import {
  MdOutlineExpandCircleDown,
  MdOutlineSnippetFolder,
} from "react-icons/md";
import { HiOutlineDuplicate } from "react-icons/hi";
import { FiEyeOff } from "react-icons/fi";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

const SyllabusDetail = () => {
  const paramName = useParams();
  // console.log(paramName.id);
  const [syllabus, setSyllabus] = useState([]);
  const [duplicatedSyllabus, setDuplicatedSyllabus] = useState([]);
  const [page, setPage] = useState(1);
  const [openItems, setOpenItems] = useState([]);
  // setParams(paramName.id);
  const [option, setOption] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = React.useState(false);
  const handleOpened = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const navigate = useNavigate();

  useEffect(() => {
    apiSyllabusInstance
      .get(`/viewSyllabus/${paramName.id}`)
      .then((response) => {
        console.log(response.data.payload);
        setSyllabus(response.data.payload);
        // setUnit(syllabus.unitList);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  //   if (syllabus.learningList) {
  // 	console.log(syllabus.learningList);
  //   }

  let renderGeneral = () => {
    return (
      <div className="detail-body">
        <div className="detail-author">
          Modified on {syllabus.modified_date} by{" "}
          <strong>{syllabus.modified_by}</strong>
        </div>
        <div className="detail-general-header">
          <div className="general-left">
            <div className="general-level">
              <div className="level-icon">
                <div>
                  <AiOutlineStar />
                </div>
                <div>Level</div>
              </div>
              <div className="level-value">
                <div>{syllabus.level}</div>
              </div>
            </div>
            <div className="general-level">
              <div className="level-icon">
                <div>
                  <AiOutlineUsergroupAdd />
                </div>
                <div>Attendee Number</div>
              </div>
              <div className="level-value">
                <div>{syllabus.training_audience}</div>
              </div>
            </div>
            <div className="general-level">
              <div className="level-icon">
                <div>
                  <BsShieldCheck />
                </div>
                <div>Priority</div>
              </div>
              <div className="level-value">
                <div className="priority">{syllabus.priority}</div>
              </div>
            </div>
          </div>
          <div className="general-right">
            <div className="general-level">
              <div className="requirement">
                <div>
                  <AiOutlineSetting />
                </div>
                <div>Technical Requirement(s)</div>
              </div>
            </div>
            <div className="requirement-content">
              <div>PC need to install following softwares: </div>
              <ul>
                <li>{syllabus.technical_group}</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="course-objective">
          <div className="course-title">
            <div>
              <TbSquareDot />
            </div>
            <div>Course Objectives</div>
          </div>
          <div className="course-content">
            <div>
              This topic is introduced about {syllabus.topic_name}; adapt with
              skills, lessons and practice which is specifically used in Fsoft
              Projects.
              <br></br>
              In details, after complete the projects trainee will:
            </div>
            <div>
              {syllabus.learningList
                ? syllabus.learningList.map((item) => (
                    <div>
                      <li>{item.learningObjectList.learning_description}</li>
                    </div>
                  ))
                : null}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const toggleItem = (item) => {
    if (openItems.includes(item)) {
      setOpenItems(openItems.filter((openItem) => openItem !== item));
    } else {
      setOpenItems([...openItems, item]);
    }
  };

  const capitalizeFirstLetter = (text) => {
    return text.charAt(0).toUpperCase() + text.slice(1);
  };

  let groupedUnits = [];
  if (syllabus.unitList) {
    groupedUnits = syllabus.unitList.reduce((acc, unit) => {
      const { day_number, ...rest } = unit;
      if (!acc[day_number]) {
        acc[day_number] = { day_number, units: [] };
      }
      acc[day_number].units.push(rest);
      return acc;
    }, []);
  }
  console.log(groupedUnits);

  const [toggledItems, setToggledItems] = useState({});

  const handleToggle = (itemId) => {
    // Thực hiện toggle trạng thái của itemId
    setToggledItems((prevToggledItems) => ({
      ...prevToggledItems,
      [itemId]: !prevToggledItems[itemId],
    }));
  };

  let duration = (unit) => {
    let a = 0;
    unit.contentList.map((content) => (a += content.duration));
    console.log(a);
    return a;
  };

  let renderOutline = () => {
    return (
      <div>
        <div className="outline">
          {syllabus.unitList
            ? groupedUnits.map((item) => (
                <div className="syllabus-outline">
                  <div className="syllabus-day-number">
                    <div>Day {item.day_number}</div>
                    <div>
                      <MdOutlineExpandCircleDown
                        className="syllabus-expand-icon"
                        onClick={() => {
                          handleToggle(item.day_number);
                        }}
                      />
                    </div>
                  </div>
                  {toggledItems[item.day_number] &&
                    item.units.map((unit) => (
                      <div className="syllabus-content-container">
                        <div className="unit-content">
                          Unit {unit.unit_code}
                        </div>

                        {/* <div>{a} hrs</div>  */}
                        <div className="content-container-right">
                          <div className="content-name">{unit.unit_name}</div>
                          <div>{duration(unit)} hrs</div>
                          {
                            <div className="unit-content-container">
                              {unit.contentList
                                ? unit.contentList.map((content) => (
                                    <div className="syllabus-content-box">
                                      <div className="syllabus-content-name">
                                        {capitalizeFirstLetter(content.content)}
                                      </div>
                                      <div className="syllabus-content-box-right">
                                        <div className="syllabus-content-format">
                                          {content.deliveryType}
                                        </div>
                                        <div className="syllabus-content-box-duration">
                                          {content.duration} hrs
                                        </div>
                                        <div
                                          className={
                                            content.trainingFormat === "offline"
                                              ? "syllabus-content-format"
                                              : "syllabus-content-format-online"
                                          }
                                        >
                                          {content.trainingFormat}
                                        </div>
                                        <MdOutlineSnippetFolder className="material-upload" />
                                      </div>
                                    </div>
                                  ))
                                : null}
                            </div>
                          }
                        </div>
                      </div>
                    ))}
                </div>
              ))
            : null}
        </div>
      </div>
    );
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

  let handleOpen = () => setOption(!option);

  let duplicateSyllabus = () => {
    setIsLoading(true);
    apiSyllabusInstance
      .get(`/duplicateSyllabus/${paramName.id}`)
      .then((response) => {
        console.log(response.data.payload);
        setDuplicatedSyllabus(syllabus);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        handleClose();
        setIsLoading(false);
        if (duplicateSyllabus) {
          navigate("/view-syllabus");
        }
      });
  };

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

  return (
    <div className="detail-container">
      {isLoading && (
        <div className="loading-overlay">
          <div className="loading-container">
            <SyncLoader color="#2a00b7" />
          </div>
        </div>
      )}
      <div className="detail-header">
        <div className="header-left">
          <h2 className="detail-title">{syllabus.topic_name}</h2>
          <div className="detail-head-title">
            <h1 className="topic-name">{syllabus.topic_name}</h1>
            <div className="detail-status">{syllabus.publish_status}</div>
          </div>
          <div className="detail-title-foot">
            <div className="detail-code">Code: {syllabus.topic_code}</div>
            <div className="detail-version">Version: {syllabus.version}.0</div>
          </div>
        </div>
        <div className="header-right">
          <BsThreeDots
            className="three-dot-icon"
            onClick={() => handleOpen()}
          />
          {option && (
            <div className="option-edit">
              <div className="option-header">Manage</div>
              <hr></hr>
              <div className="option-pick">
                <BsPencil className="option-icon" /> Edit
              </div>
              <div className="option-pick" onClick={handleOpened}>
                <HiOutlineDuplicate className="option-icon" /> Duplicate
              </div>
              <div className="option-pick">
                <FiEyeOff className="option-icon" /> De-active syllabus
              </div>
              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={style}>
                  <Typography
                    id="modal-modal-title"
                    variant="h6"
                    component="h2"
                  >
                    Verify!
                  </Typography>
                  <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    Are you sure to duplicate the syllabus with code{" "}
                    {paramName.id}
                  </Typography>
                  <Button onClick={handleClose}>Cancel</Button>
                  <Button onClick={duplicateSyllabus}>Yes</Button>
                </Box>
              </Modal>
            </div>
          )}
        </div>
      </div>

      <hr></hr>
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

      {page === 1 ? renderGeneral() : page === 2 ? renderOutline() : null}
    </div>
  );
};

export default SyllabusDetail;
