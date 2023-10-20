package com.example.BE.service.Impl;

import com.example.BE.model.dto.response.ClassResponse;
import com.example.BE.model.entity.Class;
import com.example.BE.model.entity.TrainingProgram;
import com.example.BE.repository.ClassRepository;
import com.example.BE.service.ClassService;
import com.example.BE.service.TrainingProgramService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public class ClassServiceImpl implements ClassService {
    @Autowired
    ClassRepository classRepository;
    @Autowired
    TrainingProgramService trainingProgramService;


    @Override
    public Class saveClass(Class c) {
        return classRepository.save(c);
    }

    @Override
    public List<Class> findAllClass() {
        return classRepository.findAll();
    }

    @Override
    public Class searchByName(String className){ return classRepository.searchByClassName(className);}

    @Override
    public Class searchByClassCode(String classCode) {
        return classRepository.searchByClassCode(classCode);
    }

    @Override
    public Class findById(int ClassID) {
        return classRepository.findById(ClassID).orElse(null);
    }

    @Override
    public Class convert(ClassResponse c) {
        Class tmp = new Class();
        tmp.setClassId(c.getClassId());
        tmp.setClassName(c.getClassName());
        tmp.setClassCode(c.getClassCode());
        tmp.setDuration(c.getDuration());
        tmp.setStatus(c.getStatus());
        tmp.setLocation(c.getLocation());
        tmp.setFsu(c.getFsu());
        tmp.setStart_date(c.getStart_date());
        tmp.setEnd_date(c.getEnd_date());
        tmp.setCreate_by(c.getCreate_by());
        tmp.setCreatedDate(c.getCreatedDate());
        tmp.setModified_date(c.getModified_date());
        tmp.setModified_by(c.getModified_by());
        TrainingProgram tmp1 = trainingProgramService.findById(c.getTrainingProgram_id());
        tmp.setProgram_class(tmp1);
        return tmp;
    }

    @Override
    public Class updateClass(Class c) {
        return classRepository.saveAndFlush(c);
    }

    public List<ClassResponse> findClassesInDateRange(Date startDate, Date endDate) {
        return classRepository.findClassesInDateRange(startDate, endDate);
    }

    @Override
    public List<ClassResponse> findClassByKeyWord(String keyword) {
        return classRepository.findClassesByKeyword(keyword, keyword);
    }
}
