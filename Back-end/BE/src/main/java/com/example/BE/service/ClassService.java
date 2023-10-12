package com.example.BE.service;

import com.example.BE.model.entity.Class;

import java.util.List;


public interface ClassService {
    void saveClass(Class c);

    List<Class> findAllClass();
}
