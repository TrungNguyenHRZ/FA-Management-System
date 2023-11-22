package com.example.BE.mapper;

import com.example.BE.model.dto.response.SyllabusResponse;
import com.example.BE.model.dto.response.TrainingUnitResponse;
import com.example.BE.model.entity.Syllabus;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import com.example.BE.model.entity.TrainingUnit;

import java.util.List;

@Mapper(componentModel = "spring")

public interface SyllabusMapper {

	@Mapping(source = "syllabus.topic_code",target = "topic_code")
	@Mapping(source = "syllabus.topic_name",target = "topic_name")
	@Mapping(source = "syllabus.technical_group",target = "technical_group")
	@Mapping(source = "syllabus.version",target = "version")
	@Mapping(source = "syllabus.training_audience",target = "training_audience")
	@Mapping(source = "syllabus.topic_outline",target = "topic_outline")
	@Mapping(source = "syllabus.training_materials",target = "training_materials")
	@Mapping(source = "syllabus.training_principles",target = "training_principles")
	@Mapping(source = "syllabus.priority",target ="priority")
	@Mapping(source = "syllabus.level",target = "level")
	@Mapping(source = "syllabus.publish_status",target = "publish_status")
	@Mapping(source = "syllabus.create_by",target = "create_by")
	@Mapping(source = "syllabus.createdDate",target = "createdDate")
	@Mapping(source = "syllabus.modified_date",target = "modified_date")
	@Mapping(source = "syllabus.modified_by",target = "modified_by")
	// @Mapping(source = "user_syllabus",target = "user")
	@Mapping(source = "user_syllabus.userId",target = "userId")
	@Mapping(source = "user_syllabus.name",target = "userName")
	// @Mapping(source = "syllabus.data", target = "data")
	@Mapping(source = "syllabus_unit",target = "unitList")
	@Mapping(source = "syllabus_object" ,target = "learningList")
	@Mapping(source = "syllabus.download_url", target = "downloadUrl")
	// @Mapping(source = "syllabus_unit.training_content",target = "unitList.contentList")

	SyllabusResponse toResponse(Syllabus syllabus);
	// TrainingUnitResponse unitResponse(TrainingUnit trainingUnit);
	List<SyllabusResponse> toSyllabusResponseList(List<Syllabus> syllabusList);
}
