import React, { useEffect, useState } from 'react'
import apiSyllabusInstance from "../../../../../service/api-syllabus";
import "./syllabusDetail.css";
import { useParams } from 'react-router-dom';
const SyllabusDetail = () => {
	const  paramName  = useParams();
	console.log(paramName.id);
	const [syllabus,setSyllabus] = useState([]);
	
	useEffect(() => {
		apiSyllabusInstance
		  .get(`/viewSyllabus/${paramName.id}`)
		  .then((response) => {
			console.log(response.data);
			setSyllabus(response.data);
		  })
		  .catch((error) => {
			console.error(error);
		  });
	  }, []);
	  console.log(syllabus);

  return (
	<div>
		<div className="detail-header">
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
		<hr></hr>
		<div className="detail-body">
			<div className="detail-author">
				Modified on {syllabus.modified_date} by <strong>{syllabus.modified_by}</strong> 
			</div>
		</div>
	</div>
  )
}

export default SyllabusDetail