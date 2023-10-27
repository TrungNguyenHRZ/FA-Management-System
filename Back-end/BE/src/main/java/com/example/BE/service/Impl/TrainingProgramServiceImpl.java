package com.example.BE.service.Impl;

import com.example.BE.model.dto.response.TrainingProgramResponse;
import com.example.BE.model.entity.Syllabus;
import com.example.BE.model.entity.TrainingProgram;
import com.example.BE.model.entity.TrainingProgramSyllabus;
import com.example.BE.repository.SyllabusRepository;
import com.example.BE.repository.TrainingProgramRepository;
import com.example.BE.service.SyllabusService;
import com.example.BE.service.TrainingProgramService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class TrainingProgramServiceImpl implements TrainingProgramService {
    @Autowired
    TrainingProgramRepository trainingProgramRepository;
    @Autowired
    private SyllabusRepository syllabusRepository;
    @Autowired
    SyllabusService syllabusService;

    @Override
    public List<TrainingProgramResponse> findAllTrainingProgram(){
        List<TrainingProgram> trainingPrograms = trainingProgramRepository.findAll();
        List<TrainingProgramResponse> responses = new ArrayList<>();

        for (TrainingProgram program : trainingPrograms) {
            responses.add(new TrainingProgramResponse(program));
        }

        return responses;
    }

//    @Override
//    public void findAllTrainingProgram(){
//        List<TrainingProgram> trainingPrograms = trainingProgramRepository.findAll();
//        for (TrainingProgram programs : trainingPrograms){
//            programs.getTraining_code();
//            programs.getTraining_name();
//            programs.getTraining_topic_code();
//            programs.getStatus();
//            programs.getDuration();
//            programs.getCreate_by();
//            programs.getCreatedDate();
//            programs.getModified_date();
//            programs.getModified_by();
//            for (TrainingProgramSyllabus tps : programs.getSyllabus()){
//                tps.getProgram_topic().getTopic_code();
//            }
//        }
//    }

    @Override
    public TrainingProgram findById(int id) {
        return trainingProgramRepository.findById(id).orElse(null);
    }

    @Override
    public List<TrainingProgramResponse> findByTrainingName(String name){
        return trainingProgramRepository.findByTrainingName(name);
    }


    @Override
    public TrainingProgram saveTrainingProgram(TrainingProgram trainingProgram) {
        return trainingProgramRepository.save(trainingProgram);
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

//        if (t.getSyllabusIds() != null && !t.getSyllabusIds().isEmpty()) {
//            List<Syllabus> syllabuses = syllabusRepository.findAllById(t.getSyllabusIds());
//            for (Syllabus syllabus : syllabuses){
//                TrainingProgramSyllabus tps = new TrainingProgramSyllabus();
//                tps.setProgram(trainingProgram);
//                tps.setProgram_topic(syllabus);
//                /*Uncomment later
//                String sequence = t.getSequence().get(syllabus.getTopic_code());
//                tps.setSequence(sequence);*/
//                trainingProgram.getSyllabus().add(tps);
//            }
//        }

//        List<TrainingProgramSyllabus> syl = (List<TrainingProgramSyllabus>) syllabusService.getSyllabusByTopic_Code(t.getSyllabusProgram());
//        trainingProgram.setSyllabus(syl);

        return trainingProgram;
    }

    @Override
    public TrainingProgram updateTrainingProgram(TrainingProgram tp){
        return trainingProgramRepository.saveAndFlush(tp);
    }

    @Override
    public TrainingProgram duplicate (TrainingProgram original){
        TrainingProgram newTp = new TrainingProgram();
        newTp.setTraining_name(original.getTraining_name() + "Copy");
        newTp.setTraining_topic_code(original.getTraining_topic_code());
        newTp.setStatus(original.getStatus());
        newTp.setStart_time(original.getStart_time());
        newTp.setDuration(original.getDuration());
        newTp.setCreate_by(original.getCreate_by());
        newTp.setCreatedDate(original.getCreatedDate());
        newTp.setModified_date(original.getModified_date());
        newTp.setModified_by(original.getModified_by());
        List<TrainingProgramSyllabus> originalSyllabus = original.getSyllabus();
        List<TrainingProgramSyllabus> newSyllabus = new ArrayList<>();
        for (TrainingProgramSyllabus originalTps : originalSyllabus){
            TrainingProgramSyllabus newTps = new TrainingProgramSyllabus();
            newTps.setProgram_topic(originalTps.getProgram_topic());
            newSyllabus.add(newTps);
        }
        newTp.setSyllabus(newSyllabus);
        return newTp;
    }

    @Override
    public List<TrainingProgramResponse> findTPByKeyword(String keyword){
        return trainingProgramRepository.findTPByKeyword(keyword, keyword);
    }
}
