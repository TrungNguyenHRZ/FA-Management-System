package com.example.BE.model.dto.response;

import com.example.BE.model.entity.Class;
import com.example.BE.model.entity.TrainingProgram;
import com.example.BE.model.entity.TrainingProgramSyllabus;
import lombok.Getter;
import lombok.Setter;

import java.util.Collections;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Getter
@Setter
public class TrainingProgramDetailResponse {
    private String training_name;
    private int duration;
    private String status;
    protected Date modified_date;
    protected String modified_by;
    protected String generalInfo;
    private List<Integer> syllabuses;
    private List<Integer> classes;

    public TrainingProgramDetailResponse(TrainingProgram trainingProgram){
        this.training_name = trainingProgram.getTraining_name();
        this.duration = trainingProgram.getDuration();
        this.status = trainingProgram.getStatus();
        this.modified_date = trainingProgram.getModified_date();
        this.modified_by = trainingProgram.getModified_by();
        this.generalInfo = trainingProgram.getGeneralInfo();
        this.syllabuses = trainingProgram.getSyllabus()
                .stream()
                .map(s -> s.getProgram_topic().getTopic_code())
                .collect(Collectors.toList());

        this.classes = trainingProgram.getTraining_class()
                .stream()
                .map(c -> c.getClassId())
                .collect(Collectors.toList());
    }

    public TrainingProgramDetailResponse(){

    }
}
