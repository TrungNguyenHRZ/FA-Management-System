package com.example.BE.service;

import java.util.List;

import com.example.BE.model.dto.response.ClassResponse;
import com.example.BE.model.entity.Class;


public interface ClassService {
    Class saveClass(Class c);
    List<Class> findAllClass();
    Class searchByName(String className);
    Class searchByClassCode(String classCode);

    Class findById(int ClassID);

    Class convert(ClassResponse c);

    Class updateClass(Class c);
}
