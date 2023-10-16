package com.example.BE.service.Impl;

import com.example.BE.model.dto.response.TrainingProgramResponse;
import com.example.BE.model.entity.TrainingProgram;
import com.example.BE.repository.TrainingProgramRepository;
import com.example.BE.service.TrainingProgramService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TrainingProgramServiceImpl implements TrainingProgramService {
    @Autowired
    TrainingProgramRepository trainingProgramRepository;

    @Override
    public List<TrainingProgram> findAllTrainingProgram(){
        return trainingProgramRepository.findAll();
    }

    @Override
    public TrainingProgram findById(int id) {
        return trainingProgramRepository.findById(id).orElse(null);
    }

    @Override
    public List<TrainingProgram> findByTrainingName(String name){
        return trainingProgramRepository.findByTrainingName(name);
    }


    @Override
    public TrainingProgram saveTrainingProgram(TrainingProgram trainingProgram) {
        trainingProgramRepository.save(trainingProgram);
        return trainingProgram;
    }

//    @Override
//    public List<TrainingProgram> findByNameLike(String name) {
//        return null;
//    }

    @Override
    public TrainingProgram convert(TrainingProgramResponse t){
        TrainingProgram trainingProgram = new TrainingProgram();
        trainingProgram.setTraining_code(t.getTraining_code());
        trainingProgram.setTraining_name(t.getTraining_name());
        trainingProgram.setTraining_topic_code(t.getTraining_topic_code());
        trainingProgram.setStatus(t.getStatus());
        trainingProgram.setStart_time(t.getStart_time());
        trainingProgram.setDuration(t.getDuration());
        trainingProgram.setCreate_by(t.getCreate_by());
        trainingProgram.setCreatedDate(t.getCreatedDate());
        trainingProgram.setModified_date(t.getModified_date());
        trainingProgram.setModified_by(t.getModified_by());
        return trainingProgram;
    }

    @Override
    public TrainingProgram updateTrainingProgram(TrainingProgram tp){
        return trainingProgramRepository.saveAndFlush(tp);
    }
}
