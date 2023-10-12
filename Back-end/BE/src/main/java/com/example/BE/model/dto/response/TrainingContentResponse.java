package com.example.BE.model.dto.response;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class TrainingContentResponse {
	
	private String contentId;
	private String content;
	private String learningObjective;
	private String deliveryType;
	private int duration;
	private String trainingFormat;
	private String note;
	
}
