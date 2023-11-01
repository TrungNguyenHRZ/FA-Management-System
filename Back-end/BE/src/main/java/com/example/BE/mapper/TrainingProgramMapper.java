package com.example.BE.mapper;

import com.example.BE.model.dto.response.TrainingProgramResponse;
import com.example.BE.model.entity.TrainingProgram;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.springframework.jmx.export.annotation.ManagedOperation;

import java.util.List;

@Mapper(componentModel = "spring")
public interface TrainingProgramMapper {
    @Mapping(source = "trainingProgram.training_code", target = "training_code")
    @Mapping(source = "trainingProgram.training_name", target = "training_name")
    @Mapping(source = "trainingProgram.training_topic_code", target = "training_topic_code")
    @Mapping(source = "trainingProgram.status", target = "status")
    @Mapping(source = "trainingProgram.start_time", target = "start_time")
    @Mapping(source = "trainingProgram.duration", target = "duration")
    @Mapping(source = "trainingProgram.create_by", target = "create_by")
    @Mapping(source = "trainingProgram.createdDate", target = "createdDate")
    @Mapping(source = "trainingProgram.modified_date", target = "modified_date")
    @Mapping(source = "trainingProgram.modified_by", target = "modified_by")
    @Mapping(source = "trainingProgram.generalInfo", target = "generalInfo")
    @Mapping(source = "trainingProgram.user_training", target = "user_training")
    @Mapping(source = "trainingProgram.syllabusProgram", target = "syllabus")
    List<TrainingProgramResponse> toTrainingProgramResponseList (List<TrainingProgram> trainingProgramList);
}
