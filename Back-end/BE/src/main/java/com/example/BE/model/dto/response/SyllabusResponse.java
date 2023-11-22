package com.example.BE.model.dto.response;

import com.example.BE.model.entity.Syllabus;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;
import java.util.List;
import java.util.Set;

import com.example.BE.model.dto.request.TrainingUnitRequest;
import com.example.BE.model.entity.SyllabusObject;
import com.example.BE.model.entity.User;

import lombok.Getter;
import lombok.Setter;


@Setter
@Getter
public class SyllabusResponse {


	private int topic_code;
	private String topic_name;
	private String technical_group;
	private String version;
	private String training_audience;
	private String topic_outline;
	private String training_materials;
	private String training_principles;
	private String priority;
	private String level;
	private String publish_status;
	private String create_by;
	private Date createdDate;
	private Date modified_date;
	private String modified_by;
	private int userId;
	private String userName;
	private int programDuration;
	private String downloadUrl;
	// private User user;
	private List<SyllabusObjectResponse> learningList;
	List<TrainingUnitResponse> unitList;

	public SyllabusResponse(Syllabus syllabus){
		this.topic_code = syllabus.getTopic_code();
		this.topic_name = syllabus.getTopic_name();
		this.technical_group = syllabus.getTechnical_group();
		this.version = syllabus.getVersion();
		this.training_audience = syllabus.getTraining_audience();
		this.topic_outline = syllabus.getTopic_outline();
		this.training_materials = syllabus.getTraining_materials();
		this.training_principles = syllabus.getTraining_principles();
		this.priority = syllabus.getPriority();
		this.level = syllabus.getLevel();
		this.publish_status = syllabus.getPublish_status();
		this.create_by = syllabus.getCreate_by();
		this.createdDate = syllabus.getCreatedDate();
		this.modified_date = syllabus.getModified_date();
		this.modified_by = syllabus.getModified_by();
	}

	public SyllabusResponse() {

	}
}
