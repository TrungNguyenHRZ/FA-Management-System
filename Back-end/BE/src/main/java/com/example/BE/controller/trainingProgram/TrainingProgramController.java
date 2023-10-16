package com.example.BE.controller.trainingProgram;

import com.example.BE.mapper.TrainingProgramMapper;
import com.example.BE.model.dto.ApiResponse;
import com.example.BE.model.dto.response.TrainingProgramResponse;
import com.example.BE.model.entity.Syllabus;
import com.example.BE.model.entity.TrainingProgram;
import com.example.BE.model.entity.TrainingProgramSyllabus;
import com.example.BE.repository.TrainingProgramRepository;
import com.example.BE.repository.TrainingProgramSyllabusRepo;
import com.example.BE.service.SyllabusService;
import com.example.BE.service.TrainingProgramService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/TrainingProgram")

public class TrainingProgramController {

    @Autowired
    TrainingProgramService trainingProgramService;

    @Autowired
    SyllabusService syllabusService;

    @Autowired
    TrainingProgramMapper trainingProgramMapper;

    @Autowired
    TrainingProgramSyllabusRepo psRepo;

    @GetMapping(value = {"", "/all"})
    public List<TrainingProgramResponse> getAllTrainingPrograms(){
        List<Syllabus> syllabusList = syllabusService.getAllSyllabus();
        List<TrainingProgram> trainingProgramList = trainingProgramService.findAllTrainingProgram();
        for(TrainingProgram tp : trainingProgramList){
            List<TrainingProgramSyllabus> psList =  psRepo.getSyllabusCode(tp.getTraining_code());
            tp.setSyllabus(psList);
        }

        return trainingProgramMapper.toTrainingProgramResponseList(trainingProgramList);
    }

//    @GetMapping(value = {"/all"})
//    public ResponseEntity<ApiResponse<List<TrainingProgram>>> getAllTrainingPrograms(){
//        ApiResponse apiResponse = new ApiResponse();
//        apiResponse.ok(trainingProgramService.findAllTrainingProgram());
//        return ResponseEntity.ok(apiResponse);
//    }

    @GetMapping(value = {"/{name}"})
    public List<TrainingProgramResponse> getTrainingProgramsByName(@PathVariable String name){
        return trainingProgramMapper.toTrainingProgramResponseList(trainingProgramService.findByTrainingName(name));
    }

    @PostMapping("/create-training-program")
    public ResponseEntity<ApiResponse> createTrainingProgram(@Valid @RequestBody TrainingProgramResponse t, BindingResult bindingResult) {
        ApiResponse apiResponse = new ApiResponse();

        TrainingProgram tp = trainingProgramService.saveTrainingProgram(trainingProgramService.convert(t));
        TrainingProgramResponse tp2 = new TrainingProgramResponse(tp);
        apiResponse.ok(tp2);
        return ResponseEntity.ok(apiResponse);
    }

    @PutMapping("update-training-program/{id}")
    public ResponseEntity<TrainingProgramResponse> updateTrainingProgram(@PathVariable int id, @RequestBody TrainingProgramResponse t){
        TrainingProgram tp = trainingProgramService.findById(id);
        if(tp != null){
            tp.setTraining_name(t.getTraining_name());
            tp.setTraining_topic_code(t.getTraining_topic_code());
            tp.setStatus(t.getStatus());
            tp.setStart_time(t.getStart_time());
            tp.setDuration(t.getDuration());
            tp.setCreate_by(t.getCreate_by());
            tp.setCreatedDate(t.getCreatedDate());
            tp.setModified_date(t.getModified_date());
            tp.setModified_by(t.getModified_by());
            TrainingProgram tp2 = trainingProgramService.updateTrainingProgram(tp);
            TrainingProgramResponse result = new TrainingProgramResponse(tp2);
            return ResponseEntity.ok(result);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
