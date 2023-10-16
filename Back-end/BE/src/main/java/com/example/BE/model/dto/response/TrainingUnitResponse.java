package com.example.BE.model.dto.response;

import java.util.List;

import com.example.BE.model.entity.Syllabus;
import com.example.BE.model.entity.TrainingContent;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class TrainingUnitResponse {
	
	private int unit_code;
	private String unit_name;
	private int day_number;
	private int topic_code;
	// private Syllabus syllabus;
	private List<TrainingContentResponse> contentList;
	
	
}
