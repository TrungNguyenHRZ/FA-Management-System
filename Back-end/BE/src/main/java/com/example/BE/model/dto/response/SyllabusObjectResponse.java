package com.example.BE.model.dto.response;

import java.util.List;

import com.example.BE.model.entity.LearningObject;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SyllabusObjectResponse {
	
	// private List<SyllabusResponse> syllabusList;
	private LearningObjectiveResponse learningObjectList;

}
