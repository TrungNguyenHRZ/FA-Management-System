package com.example.BE.service;

import com.example.BE.model.dto.response.TrainingProgramSyllabusResponse;
import com.example.BE.model.entity.TrainingProgramSyllabus;
import com.example.BE.model.entity.TrainingProgramSyllabusId;

import java.util.List;

public interface TrainingProgramSyllabusService {
    List<TrainingProgramSyllabus> findAllTPS();
    TrainingProgramSyllabus updateTPS(TrainingProgramSyllabus tps);
    TrainingProgramSyllabus saveTPS(TrainingProgramSyllabus TPS);
    TrainingProgramSyllabus convert(TrainingProgramSyllabusResponse tpsRes);
    int getSyllabusDuration(int code);
}
