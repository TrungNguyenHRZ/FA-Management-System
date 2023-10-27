package com.example.BE.mapper;

import java.util.List;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.example.BE.model.dto.response.SyllabusObjectResponse;
import com.example.BE.model.entity.SyllabusObject;

@Mapper(componentModel = "spring")
public interface SyllabusObjectMapper {
	@Mapping(source = "syObj.learning_code", target = "learningObjectList")

	SyllabusObjectResponse toResponse(SyllabusObject syObj);
	List<SyllabusObjectResponse> toSyObjectList(List<SyllabusObject> syObjectList);
}
