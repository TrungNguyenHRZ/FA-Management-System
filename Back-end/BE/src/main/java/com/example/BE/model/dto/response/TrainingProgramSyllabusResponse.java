package com.example.BE.model.dto.response;

import com.example.BE.model.entity.TrainingProgramSyllabus;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class TrainingProgramSyllabusResponse {
    protected int syllabus;
    protected int trainingProgram;
    protected String sequence;

    public TrainingProgramSyllabusResponse(){
    }

    public TrainingProgramSyllabusResponse(TrainingProgramSyllabus tps){
        this.syllabus = tps.getProgram_topic().getTopic_code();
        this.trainingProgram = tps.getProgram().getTraining_code();
        this.sequence = tps.getSequence();
    }
}
