package com.example.BE.mapper;

import java.util.List;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.example.BE.model.dto.response.TrainingUnitResponse;
import com.example.BE.model.entity.TrainingUnit;

@Mapper(componentModel = "spring")
public interface TrainingUnitMapper {

	//Map entity to response
	@Mapping(source ="trainingUnit.unit_code", target="unit_code")
	@Mapping(source ="trainingUnit.unit_name",target="unit_name")
	@Mapping(source ="trainingUnit.day_number",target="day_number")
	// @Mapping(source ="unit_topic_code",target="syllabus")
	// @Mapping(source ="unit_topic_code.topic_code",target="topic_code")
	@Mapping(source = "training_content" ,target="contentList")
	
	TrainingUnitResponse toResponse(TrainingUnit trainingUnit);
	List<TrainingUnitResponse> toTrainingUnitResponseList(List<TrainingUnit> unitList);
}
