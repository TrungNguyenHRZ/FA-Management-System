package com.example.BE.service.Impl;

import com.example.BE.model.entity.Class;
import com.example.BE.repository.ClassRepository;
import com.example.BE.service.ClassService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ClassServiceImpl implements ClassService {
    @Autowired
    ClassRepository classRepository;


    @Override
    public void saveClass(Class c) {
        classRepository.save(c);
    }

    @Override
    public List<Class> findAllClass() {
        return classRepository.findAll();
    }

    
}
