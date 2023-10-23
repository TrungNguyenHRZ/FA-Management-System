package com.example.BE.model.dto.response;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LearningObjectiveResponse {
	
	private int learning_code;
	private String learning_name;
	private String learning_description;
	private String type;
	
}
