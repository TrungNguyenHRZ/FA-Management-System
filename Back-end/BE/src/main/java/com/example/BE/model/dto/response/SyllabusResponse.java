package com.example.BE.model.dto.response;

import java.util.Date;
import java.util.List;

import com.example.BE.model.dto.request.TrainingUnit;

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
	List<TrainingUnit> unitList;
}
