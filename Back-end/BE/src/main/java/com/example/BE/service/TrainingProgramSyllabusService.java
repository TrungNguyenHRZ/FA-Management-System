package com.example.BE.service;

import com.example.BE.model.dto.response.TrainingProgramSyllabusResponse;
import com.example.BE.model.entity.TrainingProgramSyllabus;
import com.example.BE.model.entity.TrainingProgramSyllabusId;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface TrainingProgramSyllabusService {
    List<TrainingProgramSyllabus> findAllTPS();
    TrainingProgramSyllabus updateTPS(TrainingProgramSyllabus tps);
    TrainingProgramSyllabus saveTPS(TrainingProgramSyllabus TPS);
    TrainingProgramSyllabus convert(TrainingProgramSyllabusResponse tpsRes);
    int getSyllabusDuration(int code);
    void deleteTPS(int training_code, int topic_code);
}
