package com.example.BE.model.dto.response;

import com.example.BE.model.entity.TrainingProgram;
import com.example.BE.model.entity.TrainingProgramSyllabus;
import lombok.Getter;
import lombok.Setter;

import java.util.Collections;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Getter
@Setter
public class TrainingProgramResponse {
    protected int training_code;
    protected String training_name;
    protected String start_time;
    protected int duration;
    protected String training_topic_code;
    protected String status;
    protected String create_by;
    protected Date createdDate;
    protected Date modified_date;
    protected String modified_by;
    protected String generalInfo;
    protected List<Integer> syllabusIds;
//    protected List<Integer> newSyllabusIds;
//    protected Map<Integer, String> sequence;
//    protected int user_training;

    public TrainingProgramResponse(TrainingProgram trainingProgram){
        this.training_code = trainingProgram.getTraining_code();
        this.training_name = trainingProgram.getTraining_name();
        this.training_topic_code = trainingProgram.getTraining_topic_code();
        this.status = trainingProgram.getStatus();
        this.start_time = trainingProgram.getStart_time();
        this.duration = trainingProgram.getDuration();
        this.create_by = trainingProgram.getCreate_by();
        this.createdDate = trainingProgram.getCreatedDate();
        this.modified_date = trainingProgram.getModified_date();
        this.modified_by = trainingProgram.getModified_by();
//        this.generalInfo = trainingProgram.getGeneralInfo();
        this.syllabusIds = trainingProgram.getSyllabus()
                .stream()
                .map(s -> s.getProgram_topic().getTopic_code())
                .collect(Collectors.toList());
//        if(!trainingProgram.getSyllabus().isEmpty()) {
//            this.syllabusIds = Collections.singletonList(trainingProgram.getSyllabus().iterator().next().getProgram_topic().getTopic_code());
//        }
//        TrainingProgramSyllabus syllabusProgram;
//        this.user_training = trainingProgram.getUser_training().getUserId();
    }

    public TrainingProgramResponse() {

    }
}
