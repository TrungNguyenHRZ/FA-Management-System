package com.example.BE.mapper;

import java.util.List;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.example.BE.model.dto.response.LearningObjectiveResponse;
import com.example.BE.model.entity.LearningObject;

@Mapper(componentModel = "spring")
public interface LearningObjectiveMapper {

	@Mapping(source = "learningObject.code", target="learning_code")
	@Mapping(source = "learningObject.learning_name", target="learning_name")
	@Mapping(source = "learningObject.type" , target="type")
	@Mapping(source = "learningObject.learning_description", target = "learning_description")
	
	LearningObjectiveResponse toResponse(LearningObject learningObject);
	List<LearningObjectiveResponse> toLearningObjectList(List<LearningObject> learningObjects);
}
