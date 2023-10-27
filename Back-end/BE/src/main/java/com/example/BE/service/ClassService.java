package com.example.BE.service;

import java.util.Date;
import java.util.List;

import com.example.BE.model.dto.response.ClassResponse;
import com.example.BE.model.entity.Class;


public interface ClassService {
    Class saveClass(Class c);
    List<Class> findAllClass();
    Class searchByName(String className);
    Class searchByClassCode(String classCode);

    Class findById(int ClassID);
    List<Class> searchByStatus(String status);

    Class convert(ClassResponse c);

    Class updateClass(Class c);
    List<ClassResponse> findClassesInDateRange(Date startDate, Date endDate);

    List<ClassResponse> findClassByKeyWord(String keyword);

}
