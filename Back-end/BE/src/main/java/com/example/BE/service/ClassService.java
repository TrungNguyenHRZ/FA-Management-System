package com.example.BE.service;

import java.util.Date;
import java.util.List;

import com.example.BE.model.dto.response.ClassResponse;
import com.example.BE.model.entity.Class;
import com.example.BE.model.entity.TrainingProgram;


public interface ClassService {
    Class saveClass(Class c);
    List<Class> findAllClass();
    Class searchByName(String className);
    Class searchByClassCode(String classCode);

    Class findById(int ClassID);
    List<Class> searchByStatus(String status);

    List<Class> findAllClassByTrainingProgram(TrainingProgram t);

    List<ClassResponse> sortByModifiedDate(List<ClassResponse> classes);
    Class convert(ClassResponse c);

    Class updateClass(Class c);
    List<ClassResponse> findClassesInDateRange(Date startDate, Date endDate);

    List<ClassResponse> findClassByKeyWord(String keyword);
    List<ClassResponse> findClassByFSU(String keyword);
    List<ClassResponse> findClassByLocation(String keyword);
    List<ClassResponse> sortClassesByModifiedDate(List<ClassResponse> classes);
    List<ClassResponse> isEnable(List<Class> classList);
}
