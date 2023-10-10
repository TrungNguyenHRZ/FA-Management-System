package com.example.BE.service;

import java.util.List;
import com.example.BE.model.entity.Class;


public interface ClassService {
    void saveClass(Class c);
    List<Class> findAllClass();
}
