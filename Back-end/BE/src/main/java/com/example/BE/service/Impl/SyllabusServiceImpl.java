package com.example.BE.service.Impl;

import com.example.BE.model.entity.Syllabus;
import com.example.BE.repository.SyllabusRepository;
import com.example.BE.service.SyllabusService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SyllabusServiceImpl implements SyllabusService {

    @Autowired
    SyllabusRepository syllabusRepository;

    @Override
    public List<Syllabus> getAllSyllabus() {
        // TODO Auto-generated method stub
        return syllabusRepository.findAll();
    }

    @Override
    public Syllabus createSyllabus(Syllabus syllabus) {
        // TODO Auto-generated method stub
        return null;

    }

    @Override
    public List<Syllabus> getAllSyllabusByKey(String keyword) {
        // TODO Auto-generated method stub
        return syllabusRepository.getSyllabusListByKeyword(keyword);
    }

    @Override
    public List<Syllabus> getAllSyllabusByCreateDate(String date) {
        // TODO Auto-generated method stub
        return syllabusRepository.getSyllabusByCreateDate(date);
    }

}
