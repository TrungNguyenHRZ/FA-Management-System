package com.example.BE.service.Impl;

import com.example.BE.model.dto.response.ClassResponse;
import com.example.BE.model.dto.response.SyllabusResponse;
import com.example.BE.model.dto.response.TrainingProgramDetailResponse;
import com.example.BE.model.dto.response.TrainingProgramResponse;
import com.example.BE.model.entity.TrainingProgram;
import com.example.BE.model.entity.TrainingProgramSyllabus;
import com.example.BE.repository.ClassRepository;
import com.example.BE.repository.SyllabusRepository;
import com.example.BE.repository.TrainingProgramRepository;
import com.example.BE.service.SyllabusService;
import com.example.BE.service.TrainingProgramService;
import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class TrainingProgramServiceImpl implements TrainingProgramService {
    @Autowired
    TrainingProgramRepository trainingProgramRepository;
    @Autowired
    private SyllabusRepository syllabusRepository;
    @Autowired
    SyllabusService syllabusService;
    @Autowired
    ClassRepository classRepository;
    private Path foundFile;

    @Override
    public List<TrainingProgramResponse> findAllTrainingProgram(){
        return trainingProgramRepository.findByToggleTrue();
    }

    @Override
    public List<TrainingProgramResponse> findAllTPForAdmin(){
        return trainingProgramRepository.findAllTrainingProgram();
    }

    @Override
    public TrainingProgram findById(int id) {
        return trainingProgramRepository.findById(id).orElse(null);
    }

    @Override
    public TrainingProgram findByIdWithToggleTrue(int id){
        return trainingProgramRepository.findByIdWithToggleTrue(id);
    }

    @Override
    public List<TrainingProgramResponse> findByTrainingName(String name){
        return trainingProgramRepository.findByTrainingName(name);
    }


    @Override
    public TrainingProgram saveTrainingProgram(TrainingProgram trainingProgram) {
        return trainingProgramRepository.save(trainingProgram);
    }

    @Override
    public TrainingProgram convert(TrainingProgramResponse t){
        TrainingProgram trainingProgram = new TrainingProgram();
        trainingProgram.setTraining_code(t.getTraining_code());
        trainingProgram.setTraining_name(t.getTraining_name());
        trainingProgram.setTraining_topic_code(t.getTraining_topic_code());
        trainingProgram.setStatus(t.getStatus());
        trainingProgram.setStart_time(t.getStart_time());
        trainingProgram.setDuration(0);
        trainingProgram.setCreate_by(t.getCreate_by());
        trainingProgram.setCreatedDate(t.getCreatedDate());
        trainingProgram.setModified_date(t.getModified_date());
        trainingProgram.setModified_by(t.getModified_by());
        trainingProgram.setGeneralInfo(t.getGeneralInfo());
        trainingProgram.setToggle(true);
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
        newTp.setTraining_name(original.getTraining_name());
        newTp.setTraining_topic_code(original.getTraining_topic_code());
        newTp.setStatus(original.getStatus());
        newTp.setStart_time(original.getStart_time());
        newTp.setDuration(original.getDuration());
        newTp.setCreate_by(original.getCreate_by());
        newTp.setCreatedDate(original.getCreatedDate());
        newTp.setModified_date(original.getModified_date());
        newTp.setModified_by(original.getModified_by());
        newTp.setGeneralInfo(original.getGeneralInfo());
        newTp.setToggle(true);
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

    @Override
    public TrainingProgramDetailResponse getTrainingProgramDetail(int trainingProgramCode) {
        TrainingProgram trainingProgram = findByIdWithToggleTrue(trainingProgramCode);
        if (trainingProgram != null) {
            List<SyllabusResponse> syllabuses = trainingProgram.getSyllabus()
                    .stream()
                    .map(s -> new SyllabusResponse(s.getProgram_topic()))
                    .collect(Collectors.toList());

            List<ClassResponse> classes = trainingProgram.getTraining_class()
                    .stream()
                    .map(c -> new ClassResponse(c))
                    .collect(Collectors.toList());
            return new TrainingProgramDetailResponse(trainingProgram, syllabuses, classes);
        }
        return null;
    }

    @Override
    public String uploading(String fileName, MultipartFile file){
        Path uploadDirectory = Paths.get("File-upload");
        Path filePath = null;
        if (Files.isDirectory(uploadDirectory)){
            String fileCode = RandomStringUtils.randomAlphanumeric(8);
            try (InputStream inputStream = file.getInputStream()){
                filePath = uploadDirectory.resolve(fileCode + "-" + fileName);
                Files.copy(inputStream, filePath, StandardCopyOption.REPLACE_EXISTING);
            } catch (IOException e){
                e.printStackTrace();
            } return filePath.toString();
        } else {
            return "Folder Not Found!";
        }
    }

    @Override
    public Resource downloading(String fileCode) throws IOException {
        Path uploadDirectory = Paths.get("File-upload");
        Files.list(uploadDirectory).forEach(file -> {
            if (file.getFileName().toString().startsWith(fileCode)){
                foundFile = file;
                return;
            }
        });
        if (foundFile != null){
            return new UrlResource(foundFile.toUri());
        } return null;
    }



    @Override
    @Transactional
    public boolean softDelete(int id){
        return trainingProgramRepository.softDeleteById(id, false) > 0;
    }

    @Override
    @Transactional
    public boolean reActivate(int id){
        return trainingProgramRepository.reActivateById(id, true) > 0;
    }
}
