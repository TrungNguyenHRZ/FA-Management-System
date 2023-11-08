package com.example.BE.service.Impl;

import com.example.BE.model.dto.response.TrainingProgramSyllabusResponse;
import com.example.BE.model.entity.TrainingProgramSyllabus;
import com.example.BE.model.entity.TrainingProgramSyllabusId;
import com.example.BE.repository.TrainingProgramSyllabusRepo;
import com.example.BE.service.SyllabusService;
import com.example.BE.service.TrainingProgramService;
import com.example.BE.service.TrainingProgramSyllabusService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TrainingProgramSyllabusServiceImpl implements TrainingProgramSyllabusService {
    @Autowired
    TrainingProgramSyllabusRepo trainingProgramSyllabusRepo;
    @Autowired
    TrainingProgramService trainingProgramService;
    @Autowired
    SyllabusService syllabusService;
    @Override
    public List<TrainingProgramSyllabus> findAllTPS(){
        return trainingProgramSyllabusRepo.findAll();
    }

    @Override
    public TrainingProgramSyllabus updateTPS(TrainingProgramSyllabus tps) {
        return trainingProgramSyllabusRepo.saveAndFlush(tps);
    }

    @Override
    public TrainingProgramSyllabus saveTPS(TrainingProgramSyllabus TPS){
        return trainingProgramSyllabusRepo.saveAndFlush(TPS);
    }

    @Override
    public TrainingProgramSyllabus convert(TrainingProgramSyllabusResponse tpsRes){
        TrainingProgramSyllabus tps = new TrainingProgramSyllabus();
        tps.setProgram(trainingProgramService.findById(tpsRes.getTrainingProgram()));
        tps.setProgram_topic(syllabusService.getSyllabusByTopic_Code(tpsRes.getSyllabus()));
        return tps;
    }
}
