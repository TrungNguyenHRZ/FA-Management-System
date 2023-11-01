package com.example.BE.controller.trainingProgram;

import com.example.BE.mapper.TrainingProgramMapper;
import com.example.BE.model.dto.ApiResponse;
import com.example.BE.model.dto.response.TrainingProgramDetailResponse;
import com.example.BE.model.dto.response.TrainingProgramResponse;
import com.example.BE.model.dto.response.TrainingProgramSyllabusResponse;
import com.example.BE.model.entity.Syllabus;
import com.example.BE.model.entity.TrainingProgram;
import com.example.BE.model.entity.TrainingProgramSyllabus;
import com.example.BE.model.entity.TrainingProgramSyllabusId;
import com.example.BE.repository.SyllabusRepository;
import com.example.BE.repository.TrainingProgramSyllabusRepo;
import com.example.BE.service.SyllabusService;
import com.example.BE.service.TrainingProgramService;
import com.example.BE.service.TrainingProgramSyllabusService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/TrainingProgram")

public class TrainingProgramController {

    @Autowired
    TrainingProgramService trainingProgramService;

    @Autowired
    SyllabusService syllabusService;

    @Autowired
    SyllabusRepository syllabusRepository;

    @Autowired
    TrainingProgramMapper trainingProgramMapper;

    @Autowired
    TrainingProgramSyllabusRepo psRepo;

    @Autowired
    TrainingProgramSyllabusService trainingProgramSyllabusService;

//    @GetMapping(value = {"", "/all"})
//    public List<TrainingProgramResponse> getAllTrainingPrograms(){
//        List<Syllabus> syllabusList = syllabusService.getAllSyllabus();
//        List<TrainingProgram> trainingProgramList = trainingProgramService.findAllTrainingProgram();
//        for(TrainingProgram tp : trainingProgramList){
//            List<TrainingProgramSyllabus> psList =  psRepo.getSyllabusCode(tp.getTraining_code());
//            tp.setSyllabus(psList);
//        }
//        return trainingProgramMapper.toTrainingProgramResponseList(trainingProgramList);
//    }

//    public ResponseEntity<?> getAllTrainingPrograms(){
//        trainingProgramService.findAllTrainingProgram();
//        return ResponseEntity.ok().build();
//    }

//    @GetMapping(value = {"/all"})
//    public ResponseEntity<ApiResponse<List<TrainingProgram>>> getAllTrainingPrograms(){
//        ApiResponse apiResponse = new ApiResponse();
//        apiResponse.ok(trainingProgramService.findAllTrainingProgram());
//        return ResponseEntity.ok(apiResponse);
//    }

    @GetMapping(value = {"", "/all"})
    public ResponseEntity<List<TrainingProgramResponse>> getAllTrainingPrograms() {
        return ResponseEntity.ok(trainingProgramService.findAllTrainingProgram());
    }

//    @GetMapping(value = {"/{name}"})
//    public List<TrainingProgramResponse> getTrainingProgramsByName(@PathVariable String name){
//        return trainingProgramMapper.toTrainingProgramResponseList(trainingProgramService.findByTrainingName(name));
//    }

    @GetMapping(value = {"/{name}"})
    public ResponseEntity<List<TrainingProgramResponse>> getTrainingProgramsByName(@PathVariable String name) {
        return ResponseEntity.ok(trainingProgramService.findByTrainingName(name));
    }

    @PostMapping(value = {"/create-training-program"})
    public ResponseEntity<ApiResponse> createTrainingProgram(@Valid @RequestBody TrainingProgramResponse t, BindingResult bindingResult) {
        ApiResponse apiResponse = new ApiResponse();

        TrainingProgram tp = trainingProgramService.saveTrainingProgram(trainingProgramService.convert(t));
        TrainingProgramResponse tp2 = new TrainingProgramResponse(tp);
        apiResponse.ok(tp2);
        return ResponseEntity.ok(apiResponse);
    }

    @PostMapping(value = {"/create-training-program-syllabus"})
    public ResponseEntity<TrainingProgramSyllabus> createTrainingProgramSyllabus(@Valid @RequestBody TrainingProgramSyllabusResponse tpsRes){
        TrainingProgramSyllabus tps = new TrainingProgramSyllabus();
        tps.setId(new TrainingProgramSyllabusId(tpsRes.getTrainingProgram(), tpsRes.getSyllabus()));
        tps.setSequence(tpsRes.getSequence());

        TrainingProgram trainingProgram = trainingProgramService.findById(tpsRes.getTrainingProgram());
        tps.setProgram(trainingProgram);

        Syllabus syllabus = syllabusService.getSyllabusByTopic_Code(tpsRes.getSyllabus());
        tps.setProgram_topic(syllabus);

        TrainingProgramSyllabus createdTps = trainingProgramSyllabusService.saveTPS(tps);
        return new ResponseEntity<>(createdTps, HttpStatus.CREATED);
    }


    @PutMapping(value = {"update-training-program/{id}"})
    public ResponseEntity<TrainingProgramResponse> updateTrainingProgram(@PathVariable int id, @RequestBody TrainingProgramResponse t) {
        TrainingProgram tp = trainingProgramService.findById(id);
        if (tp != null) {
            if (t.getTraining_name() != null){
                tp.setTraining_name(t.getTraining_name());
            }
            if (t.getTraining_topic_code() != null){
                tp.setTraining_topic_code(t.getTraining_topic_code());
            }
            if (t.getStatus() != null){
                tp.setStatus(t.getStatus());
            }
            if (t.getStart_time() != null){
                tp.setStart_time(t.getStart_time());
            }
            if (t.getDuration() != 0){
                tp.setDuration(t.getDuration());
            }
            if (t.getCreate_by() != null){
                tp.setCreate_by(t.getCreate_by());
            }
            if (t.getCreatedDate() != null){
                tp.setCreatedDate(t.getCreatedDate());
            }
            if (t.getModified_date() != null){
                tp.setModified_date(t.getModified_date());
            }
            if (t.getModified_by() != null){
                tp.setModified_by(t.getModified_by());
            }
            if (t.getGeneralInfo() != null){
                tp.setGeneralInfo(t.getGeneralInfo());
            }

//            if (t.getSyllabusIds() != null && !t.getSyllabusIds().isEmpty()){
//                List<Syllabus> newSyllabuses = syllabusRepository.findAllById(t.getSyllabusIds());
//                for (Syllabus newSyllabus : newSyllabuses) {
//                    TrainingProgramSyllabus newTps = new TrainingProgramSyllabus();
//                    newTps.setProgram(tp);
//                    newTps.setProgram_topic(newSyllabus);
//                    tp.getSyllabus().add(newTps);
//                }
//            }

            /*Updating syllabus part for update method*/

//            if (t.getSyllabusIds() != null && !t.getSyllabusIds().isEmpty()) {
////                List<TrainingProgramSyllabus> existingAssociations = tp.getSyllabus();
////                List<Integer> existingSyllabusIds = existingAssociations.stream()
////                        .map(tps -> tps.getProgram_topic().getTopic_code())
////                        .collect(Collectors.toList());
////
////                // Remove associations not in the new list
////                existingAssociations.removeIf(tps -> !t.getSyllabusIds().contains(tps.getProgram_topic().getTopic_code()));
////
////                // Add new associations
////                for (Integer newSyllabusId : t.getSyllabusIds()) {
////                    if (!existingSyllabusIds.contains(newSyllabusId)) {
////                        Syllabus newSyllabus = syllabusRepository.findById(newSyllabusId).orElse(null);
////                        if (newSyllabus != null) {
////                            TrainingProgramSyllabus newTps = new TrainingProgramSyllabus();
////                            newTps.setProgram(tp);
////                            newTps.setProgram_topic(newSyllabus);
////                            tp.getSyllabus().add(newTps);
////                        }
////                    }
////                }
////            }
            TrainingProgram tp2 = trainingProgramService.updateTrainingProgram(tp);
            TrainingProgramResponse result = new TrainingProgramResponse(tp2);
            return ResponseEntity.ok(result);
        } else {
            return ResponseEntity.notFound().build();
        }
    }



    @PostMapping("/duplicate-training-program/{id}")
    public ResponseEntity<TrainingProgramResponse> duplicateTrainingProgram(@PathVariable int id){
        TrainingProgram exTp = trainingProgramService.findById(id);
        if (exTp != null){
            TrainingProgram newTp = trainingProgramService.duplicate(exTp);
            TrainingProgram savedTp = trainingProgramService.saveTrainingProgram(newTp);
            TrainingProgramResponse result = new TrainingProgramResponse(savedTp);
            return ResponseEntity.ok(result);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping(value = {"/search-TP-by-keyword"})
    public ResponseEntity<ApiResponse<List<TrainingProgramResponse>>> getTPByKeyword(@RequestParam(required = true) String key){
        ApiResponse apiResponse = new ApiResponse();
        apiResponse.ok(trainingProgramService.findTPByKeyword(key));
        return ResponseEntity.ok(apiResponse);
    }

    @GetMapping(value = {"/get_all_training_program_syllabus"})
    public ResponseEntity<ApiResponse<List<TrainingProgramSyllabusResponse>>> getAllTPS(){
        List<TrainingProgramSyllabus> tps = trainingProgramSyllabusService.findAllTPS();
        List<TrainingProgramSyllabusResponse> tpsRes = new ArrayList<>();
        for (TrainingProgramSyllabus t: tps){
            tpsRes.add(new TrainingProgramSyllabusResponse(t));
        }
        ApiResponse apiResponse = new ApiResponse();
        apiResponse.ok(tpsRes);
        return ResponseEntity.ok(apiResponse);
    }

    @GetMapping("/training-programs/{trainingProgramCode}/detail")
    public ResponseEntity<TrainingProgramDetailResponse> getTrainingProgramDetail(@PathVariable int trainingProgramCode) {
        TrainingProgramDetailResponse programDetail = trainingProgramService.getTrainingProgramDetail(trainingProgramCode);
        if (programDetail != null) {
            return ResponseEntity.ok(programDetail);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}


