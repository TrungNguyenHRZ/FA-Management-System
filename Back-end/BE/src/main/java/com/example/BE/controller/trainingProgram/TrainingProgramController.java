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
import com.example.BE.repository.TrainingProgramRepository;
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
    TrainingProgramRepository trainingProgramRepository;

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
    public ResponseEntity<ApiResponse<List<TrainingProgramResponse>>> getAllTrainingPrograms() {
        ApiResponse apiResponse = new ApiResponse();
        List<TrainingProgramResponse> trainingPrograms = trainingProgramRepository.findAllTrainingProgram();
        apiResponse.ok(trainingPrograms);
        return ResponseEntity.ok(apiResponse);
    }

//    @GetMapping(value = {"/{name}"})
//    public List<TrainingProgramResponse> getTrainingProgramsByName(@PathVariable String name){
//        return trainingProgramMapper.toTrainingProgramResponseList(trainingProgramService.findByTrainingName(name));
//    }

    @GetMapping(value = {"/{name}"})
    public ResponseEntity<ApiResponse<List<TrainingProgramResponse>>> getTrainingProgramsByName(@RequestParam(required = true) String name) {
        ApiResponse apiResponse = new ApiResponse();
        List<TrainingProgramResponse> tpRes = trainingProgramRepository.findByTrainingName(name);
        apiResponse.ok(tpRes);
        return ResponseEntity.ok(apiResponse);
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
    public ResponseEntity<ApiResponse> createTrainingProgramSyllabus(@Valid @RequestBody TrainingProgramSyllabusResponse tpsRes){
        ApiResponse apiResponse = new ApiResponse();
        TrainingProgramSyllabus tps = new TrainingProgramSyllabus();
        tps.setId(new TrainingProgramSyllabusId(tpsRes.getTrainingProgram(), tpsRes.getSyllabus()));
        tps.setSequence(tpsRes.getSequence());

        TrainingProgram trainingProgram = trainingProgramService.findById(tpsRes.getTrainingProgram());
        int totalDuration = trainingProgram.getDuration();
        Syllabus syllabus = syllabusService.getSyllabusByTopic_Code(tpsRes.getSyllabus());

        totalDuration += syllabusService.getAllDuration(tpsRes.getSyllabus());
        trainingProgram.setDuration(totalDuration);

        tps.setProgram(trainingProgram);
        tps.setProgram_topic(syllabus);
        TrainingProgramSyllabus createdTps = trainingProgramSyllabusService.saveTPS(tps);
        apiResponse.ok(createdTps);
        return ResponseEntity.ok(apiResponse);
    }


    @PutMapping(value = {"update-training-program/{id}"})
    public ResponseEntity<ApiResponse<TrainingProgramResponse>> updateTrainingProgram(@PathVariable int id, @RequestBody TrainingProgramResponse t) {
        ApiResponse apiResponse = new ApiResponse();
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
            apiResponse.ok(result);
            return ResponseEntity.ok(apiResponse);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping(value = {"update-training-program-syllabus/{tpid}/{sid}"})
    public ResponseEntity<ApiResponse<TrainingProgramSyllabusResponse>> updateTPS(@PathVariable int tpid,
                                                                     @PathVariable int sid,
                                                                     @RequestBody TrainingProgramSyllabusResponse tpsRes) {
        ApiResponse apiResponse = new ApiResponse();
        TrainingProgramSyllabus tps = psRepo.findByProgramAndProgram_topic(tpid, sid);
        if (tps == null){
            apiResponse.error("Training Program Syllabus not found!");
            return ResponseEntity.notFound().build();
        } else {
            /*if (tpsRes.getSyllabus() != 0){
                tps.setProgram_topic(syllabusService.getSyllabusByTopic_Code(tpsRes.getSyllabus()));
            }
            if (tpsRes.getSequence() != null){
                tps.setSequence(tpsRes.getSequence());
            }
            TrainingProgramSyllabus tps2 = trainingProgramSyllabusService.saveTPS(tps);
//            TrainingProgramSyllabus tps2 = psRepo.save(tps);
            TrainingProgramSyllabusResponse result = new TrainingProgramSyllabusResponse(tps2);
            apiResponse.ok(result);*/

            TrainingProgram tp = trainingProgramService.findById(tpsRes.getTrainingProgram());

            if (tp == null) {
                apiResponse.error("Training Program not found!");
                return ResponseEntity.notFound().build();
            }

            int oldDuration = tp.getDuration();
            int newDuration = oldDuration;

            if (tps.getProgram_topic() != null) {
                int removedDuration = syllabusService.getAllContentDuration(tps.getProgram_topic().getTopic_code());
                System.out.println("Removed duration before: " + removedDuration);
                newDuration -= removedDuration;
                System.out.println("Removed duration after: " + removedDuration);
            }

            if (tpsRes.getSyllabus() != 0) {
                int addedDuration = syllabusService.getAllDuration(tpsRes.getSyllabus());
                newDuration += addedDuration;
                System.out.println("Added duration: " + addedDuration);
            }

            tp.setDuration(newDuration);

            TrainingProgramSyllabus updatedTPS = new TrainingProgramSyllabus(tpsRes.getTrainingProgram(), tpsRes.getSyllabus(), tpsRes.getSequence());
            updatedTPS.setProgram(tp);

            if (tpsRes.getSyllabus() != 0){
                Syllabus s = syllabusService.getSyllabusByTopic_Code(tpsRes.getSyllabus());
                updatedTPS.setProgram_topic(s);
            }

            psRepo.deleteByProgramAndProgram_topic(tpid, sid);

            TrainingProgramSyllabus tmp = trainingProgramSyllabusService.saveTPS(updatedTPS);
            apiResponse.ok(tmp);
            return ResponseEntity.ok(apiResponse);
        }
    }

    @PostMapping("/duplicate-training-program/{id}")
    public ResponseEntity<ApiResponse<TrainingProgramResponse>> duplicateTrainingProgram(@PathVariable int id){
        ApiResponse apiResponse = new ApiResponse();
        TrainingProgram exTp = trainingProgramService.findById(id);
        if (exTp != null){
            TrainingProgram newTp = trainingProgramService.duplicate(exTp);
            TrainingProgram savedTp = trainingProgramService.saveTrainingProgram(newTp);
            TrainingProgramResponse result = new TrainingProgramResponse(savedTp);
            apiResponse.ok(result);
            return ResponseEntity.ok(apiResponse);
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
    public ResponseEntity<ApiResponse<TrainingProgramDetailResponse>> getTrainingProgramDetail(@PathVariable int trainingProgramCode) {
        ApiResponse apiResponse = new ApiResponse();
        TrainingProgramDetailResponse programDetail = trainingProgramService.getTrainingProgramDetail(trainingProgramCode);
        if (programDetail != null) {
            apiResponse.ok(programDetail);
            return ResponseEntity.ok(apiResponse);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}


