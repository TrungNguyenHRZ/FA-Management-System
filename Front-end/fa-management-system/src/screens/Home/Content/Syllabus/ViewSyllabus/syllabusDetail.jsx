import React, { useEffect, useState } from "react";
import apiSyllabusInstance from "../../../../../service/api-syllabus";
import { SyncLoader } from "react-spinners";
import "./syllabusDetail.css";
import { useParams, Link } from "react-router-dom";
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
import { FiEyeOff, FiEye } from "react-icons/fi";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { styled } from "@mui/material/styles";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import { Stepper, Step, StepLabel } from "@mui/material";

import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { FaCloudDownloadAlt } from "react-icons/fa";
import { Doughnut } from "react-chartjs-2";

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
  const [activated, setActivated] = useState(false);
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

  const steps = ["General", "Outline", "Others", "Completed"];

  const delivery = [
    "Assignment/Lab",
    "Concept/Lecture",
    "Guide/Review",
    "Test/Quiz",
    "Exam",
    "Seminar/Workshop",
  ];

  
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
                <Accordion className="syllabus-outline">
                  <AccordionSummary
                    expandIcon={
                      <MdOutlineExpandCircleDown className="syllabus-expand-icon" />
                    }
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography>Day {item.day_number}</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>
                      {item.units.map((unit) => (
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
                                          {capitalizeFirstLetter(
                                            content.content
                                          )}
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
                                              content.trainingFormat ===
                                              "offline"
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
                    </Typography>
                  </AccordionDetails>
                </Accordion>
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

  let handleDeactivated = () => {
    setIsLoading(true);
    apiSyllabusInstance
      .get(`/deactivate/${paramName.id}`)
      .then((response) => {
        console.log(response.data.payload);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        handleClose();
        setIsLoading(false);
        navigate(`/view-syllabus/${paramName.id}`);
      });
  };

  let handleActivated = () => {
    setIsLoading(true);
    apiSyllabusInstance
      .get(`/activate/${paramName.id}`)
      .then((response) => {
        console.log(response.data.payload);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        handleClose();
        setIsLoading(false);
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

  let downloadMaterial = async () => {
    try {
      // Gửi yêu cầu để lấy dữ liệu của tệp.
      const response = await apiSyllabusInstance.get(
        `/downloadMaterials/${syllabus.topic_code}`,
        {
          responseType: "blob", // Yêu cầu kiểu dữ liệu là blob.
        }
      );

      // Tạo một đường link ẩn để tải xuống tệp.
      const link = document.createElement("a");
      link.href = URL.createObjectURL(new Blob([response.data]));

      // Đặt tên tệp cho liên kết tải xuống.
      const fileName = syllabus.training_materials;
      link.download = fileName;

      // Thêm liên kết vào trang và kích hoạt nó.
      document.body.appendChild(link);
      link.click();

      // Xóa liên kết sau khi tải xong.
      document.body.removeChild(link);
    } catch (error) {
      console.error("Download failed:", error);
    }
  };

  const data = 
    {labels : [
      "Assignment/Lab",
      "Concept/Lecture",
      "Guide/Review",
      "Test/Quiz",
      "Exam",
      "Seminar/Workshop",
    ],
    datasets: [{
      data : checkData().datasets,
      
    }],
    
  }
  ;

  console.log(data)

  function checkData() {
    const result = 
      {label : [
        "Assignment/Lab",
        "Concept/Lecture",
        "Guide/Review",
        "Test/Quiz",
        "Exam",
        "Seminar/Workshop",
      ],
      datasets:[]
    };
  
    if (syllabus.unitList) {
      const labelCountMap = {};
  
      syllabus.unitList.forEach((unit) => {
        unit.contentList.forEach((content) => {
          const deliveryType = content.deliveryType;
  
          // Check if the deliveryType is in the label array
          if (result.label.includes(deliveryType)) {
            labelCountMap[deliveryType] = (labelCountMap[deliveryType] || 0) + 1;
          }
        });
      });
  
      // Populate the datasets array based on the labelCountMap
      result.label.forEach((label) => {
        result.datasets.push(labelCountMap[label] || 0);
      });
    }
  
    return result;
  }

  console.log(checkData());


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
          <h2 className="detail-title">Syllabus</h2>
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
              <Link
                to={`/update-syllabus/${syllabus.topic_code}`}
                className="link-update"
              >
                <div className="option-pick">
                  <BsPencil className="option-icon" /> Edit
                </div>
              </Link>
              <div className="option-pick" onClick={handleOpened}>
                <HiOutlineDuplicate className="option-icon" /> Duplicate
              </div>
              <div className="option-pick" onClick={syllabus && syllabus.publish_status === "Active" ? handleDeactivated : handleActivated}>
              {syllabus && syllabus.publish_status  === "Active" ? <FiEyeOff className="option-icon" /> 
              : <FiEye className="option-icon" />}  
              {syllabus && syllabus.publish_status  === "Active" ? "De-activate syllabus" 
              : "Activate syllabus"}
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
        {syllabus.downloadUrl && (
          <div className="download-container">
            <Tooltip title="Download Material(s)">
              <IconButton>
                <FaCloudDownloadAlt
                  className="download-icon"
                  onClick={downloadMaterial}
                />
              </IconButton>
            </Tooltip>
          </div>
        )}
      </div>

      {page === 1 ? (
        renderGeneral()
      ) : page === 2 ? (
        renderOutline()
      ) : (
        <div className="other-container">
          <div className="other-text">
          <label>Training Principles: </label>
          <textarea
            name="training_principles"
            type="text"
            className="principles"
            readOnly
          >
            {syllabus.training_principles}
          </textarea>
          </div>
          
          <div className="other-chart">
          <Doughnut data={data} 
            options={{
            legend: { 
              display: true,
              position: 'right',
            },
            title: {
              display: true,
            }
          }}/>
          </div>
          
        </div>
      )}
      {/* <image src={`data:image/png;base64,${syllabus.data1}`} /> */}
    </div>
  );
};

export default SyllabusDetail;
