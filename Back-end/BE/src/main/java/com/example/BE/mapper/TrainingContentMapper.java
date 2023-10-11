package com.example.BE.mapper;

import java.util.List;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.example.BE.model.dto.response.TrainingContentResponse;
import com.example.BE.model.entity.TrainingContent;

@Mapper(componentModel = "spring")
public interface TrainingContentMapper {
	
	@Mapping(source = "trainingContent.contentId", target = "contentId")
	@Mapping(source = "trainingContent.content", target = "content")
	@Mapping(source = "trainingContent.learningObjective", target = "learningObjective")
	@Mapping(source = "trainingContent.deliveryType", target = "deliveryType")
	@Mapping(source = "trainingContent.duration", target = "duration")
	@Mapping(source = "trainingContent.trainingFormat", target = "trainingFormat")
	@Mapping(source = "trainingContent.note", target = "note")
	
	TrainingContentResponse toResponse(TrainingContent trainingContent);
	List<TrainingContentResponse> toListTrainingContentList(List<TrainingContent> trainingContentList);
}
