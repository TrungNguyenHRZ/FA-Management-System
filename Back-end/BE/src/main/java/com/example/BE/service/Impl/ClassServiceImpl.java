package com.example.BE.service.Impl;

import com.example.BE.model.dto.response.ClassResponse;
import com.example.BE.model.entity.Class;
import com.example.BE.model.entity.TrainingProgram;
import com.example.BE.repository.ClassRepository;
import com.example.BE.service.ClassService;
import com.example.BE.service.TrainingProgramService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

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
    public List<Class> searchByStatus(String status) {
        return classRepository.findClassesByStatus(status);
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

    @Override
    public List<ClassResponse> findClassByFSU(String fsu) {
        return classRepository.findClassesByFSU(fsu);
    }

    @Override
    public List<ClassResponse> findClassByLocation(String keyword) {
        return classRepository.findClassesBylocation(keyword);
    }

    @Override
    public List<ClassResponse> sortClassesByModifiedDate(List<ClassResponse> classes) {
        Collections.sort(classes, new Comparator<ClassResponse>() {
            @Override
            public int compare(ClassResponse class1, ClassResponse class2) {
                Date modifiedDate1 = class1.getModified_date();
                Date modifiedDate2 = class2.getModified_date();

                if (modifiedDate1 == null && modifiedDate2 == null) {
                    return 0;
                } else if (modifiedDate1 == null) {
                    return 1; // Đẩy những mục có modifiedDate là null xuống cuối
                } else if (modifiedDate2 == null) {
                    return -1; // Đẩy những mục có modifiedDate là null xuống cuối
                } else {
                    return modifiedDate2.compareTo(modifiedDate1); // Sắp xếp từ mới nhất đến cũ nhất
                }
            }
        });

        return classes;
    }

    @Override
    public List<ClassResponse> isEnable(List<Class> classList) {
        List<ClassResponse> classResponseList  = new ArrayList<>();
        for (Class c: classList) {
            if(c.isEnable()){
                classResponseList.add(new ClassResponse(c));
            }
        }
        return classResponseList;
    }

    @Override
    public List<Class> findAllClassByTrainingProgram(TrainingProgram t) {
        return classRepository.findClassesByTrainingProgramId(t.getTraining_code());
    }

    public List<ClassResponse> sortByModifiedDate(List<ClassResponse> classes) {
        classes.sort(Comparator.comparing(ClassResponse::getModified_date).reversed());
        return classes;
    }
}
