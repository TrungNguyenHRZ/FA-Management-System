package com.example.BE.service;


import com.example.BE.model.entity.Syllabus;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface SyllabusService {
    public List<Syllabus> getAllSyllabus();

    public Syllabus createSyllabus(Syllabus syllabus);

    public List<Syllabus> getAllSyllabusByKey(String keyword);

    public List<Syllabus> getAllSyllabusByCreateDate(String date);
}
