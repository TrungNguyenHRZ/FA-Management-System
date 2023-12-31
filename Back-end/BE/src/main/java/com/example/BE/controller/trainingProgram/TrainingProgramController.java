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
import jakarta.validation.Path;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

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

    @GetMapping(value = {"", "/all"})
    public ResponseEntity<ApiResponse<List<TrainingProgramResponse>>> getAllTrainingPrograms() {
        ApiResponse apiResponse = new ApiResponse();
        List<TrainingProgramResponse> trainingPrograms = trainingProgramService.findAllTrainingProgram();
        apiResponse.ok(trainingPrograms);
        return ResponseEntity.ok(apiResponse);
    }

    @GetMapping(value =  {"/admin/all"})
    public ResponseEntity<ApiResponse<List<TrainingProgramResponse>>> getAllTPForAdmin(){
        ApiResponse apiResponse = new ApiResponse();
        List<TrainingProgramResponse> trainingPrograms = trainingProgramService.findAllTPForAdmin();
        apiResponse.ok(trainingPrograms);
        return ResponseEntity.ok(apiResponse);
    }

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
        t.setCreatedDate(new Date());
        TrainingProgram tp = trainingProgramService.saveTrainingProgram(trainingProgramService.convert(t));
        TrainingProgramResponse tp2 = new TrainingProgramResponse(tp);
        apiResponse.ok(tp2);
        return ResponseEntity.ok(apiResponse);
    }

    @PostMapping(value = {"/create-training-program-syllabus"})
    public ResponseEntity<ApiResponse> createTrainingProgramSyllabus(@Valid @RequestBody List<TrainingProgramSyllabusResponse> tpsResList){
        ApiResponse apiResponse = new ApiResponse();

        for (TrainingProgramSyllabusResponse tpsRes : tpsResList) {
            TrainingProgramSyllabus tps = new TrainingProgramSyllabus();
            tps.setId(new TrainingProgramSyllabusId(tpsRes.getTrainingProgram(), tpsRes.getSyllabus()));
            tps.setSequence(tpsRes.getSequence());

            TrainingProgram trainingProgram = trainingProgramService.findByIdWithToggleTrue(tpsRes.getTrainingProgram());

            if (trainingProgram != null) {
                int totalDuration = trainingProgram.getDuration();
                Syllabus syllabus = syllabusService.getSyllabusByTopic_Code(tpsRes.getSyllabus());

                totalDuration += syllabusService.getAllDuration(tpsRes.getSyllabus());
                trainingProgram.setDuration(totalDuration);

                tps.setProgram(trainingProgram);
                tps.setProgram_topic(syllabus);
                TrainingProgramSyllabus createdTps = trainingProgramSyllabusService.saveTPS(tps);
                apiResponse.ok(createdTps);
            } else {
                apiResponse.error("Training Program not found for ID: " + tpsRes.getTrainingProgram());
            }
        }
        return ResponseEntity.ok(apiResponse);
    }


    @PutMapping(value = {"update-training-program/{id}"})
    public ResponseEntity<ApiResponse<TrainingProgramResponse>> updateTrainingProgram(@PathVariable int id, @RequestBody TrainingProgramResponse t) {
        ApiResponse apiResponse = new ApiResponse();
        TrainingProgram tp = trainingProgramService.findByIdWithToggleTrue(id);
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

                tp.setModified_date(new Date());

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

            TrainingProgram tp = trainingProgramService.findByIdWithToggleTrue(tpsRes.getTrainingProgram());

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
        TrainingProgram exTp = trainingProgramService.findByIdWithToggleTrue(id);
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

    @GetMapping("/detail/{id}")
    public ResponseEntity<ApiResponse<TrainingProgramDetailResponse>> getTrainingProgramDetail(@PathVariable int id) {
        ApiResponse apiResponse = new ApiResponse();
        TrainingProgramDetailResponse programDetail = trainingProgramService.getTrainingProgramDetail(id);
        if (programDetail != null) {
            apiResponse.ok(programDetail);
            return ResponseEntity.ok(apiResponse);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/upload-training-programs/{id}")
    public ResponseEntity<ApiResponse> uploadFiles(@RequestParam("file") MultipartFile file,
                                                       @PathVariable int id) {
        ApiResponse apiResponse = new ApiResponse();
        TrainingProgram existedTP = trainingProgramService.findByIdWithToggleTrue(id);
        if (existedTP != null){
            String fileName = file.getOriginalFilename();
            String filePath = trainingProgramService.uploading(fileName, file);
            existedTP.setDownload_url(filePath);
            existedTP.setTraining_name(fileName);
            TrainingProgram afterTP = trainingProgramService.updateTrainingProgram(existedTP);
            apiResponse.ok(afterTP.getDownload_url());
            return ResponseEntity.ok(apiResponse);
        } else {
            apiResponse.error("Training Program Not Found!");
            return  ResponseEntity.ok(apiResponse);
        }
    }

    Path foundFile = null;
    @GetMapping(value = "/download-training-programs/{id}")
    public ResponseEntity<?> downloadFiles(@PathVariable int id){
        ApiResponse apiResponse = new ApiResponse();
        TrainingProgram existedTP = trainingProgramService.findByIdWithToggleTrue(id);
        Resource resource = null;
        String filePath = existedTP.getDownload_url();
        try {
            resource = new UrlResource(Paths.get(filePath).toUri());
        } catch (Exception e){
            e.printStackTrace();
        }
        String contentType = "application/octet-stream";
        String headerValue = "attachment;fileName=\"" + resource.getFilename() + "\"";
        HttpHeaders headers = new HttpHeaders();
        headers.add(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + existedTP.getTraining_name() + "\"");
        return ResponseEntity.ok()
                .headers(headers)
                .contentType(MediaType.APPLICATION_OCTET_STREAM)
                .body(resource);
    }

    @PutMapping("/deleteTP/{id}")
    public ResponseEntity<ApiResponse<TrainingProgramResponse>> deleteTP(@PathVariable int id) {
        ApiResponse apiResponse = new ApiResponse();
        if (trainingProgramService.softDelete(id)) {
            apiResponse.okv2("Training program deleted successfully!");
            return ResponseEntity.ok(apiResponse);
        } else {
            apiResponse.error("Failed to delete training program!");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(apiResponse);
        }
    }

    @PutMapping("restoreTP/{id}")
    public ResponseEntity<ApiResponse<TrainingProgramResponse>> restoreTP(@PathVariable int id) {
        ApiResponse apiResponse = new ApiResponse();
        if (trainingProgramService.reActivate(id)) {
            apiResponse.okv2("Training program reactivated successfully!");
            return ResponseEntity.ok(apiResponse);
        } else {
            apiResponse.error("Failed to reactivate training program!");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(apiResponse);
        }
    }

    @DeleteMapping("delete-training-program-syllabus")
    public ResponseEntity<ApiResponse> deleteTPS(@RequestParam int training_code, @RequestParam int topic_code){
        ApiResponse apiResponse = new ApiResponse();
        try {
            trainingProgramSyllabusService.deleteTPS(training_code, topic_code);
            apiResponse.ok("Deleted successfully!");
            return ResponseEntity.ok(apiResponse);
        } catch (Exception e){
            apiResponse.error("Failed to delete!");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(apiResponse);
        }
    }
}

