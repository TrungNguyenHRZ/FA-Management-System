package com.example.BE.service;


import java.sql.Date;
// import java.util.Date;
import java.util.List;

import org.springframework.stereotype.Service;

import com.example.BE.model.entity.Syllabus;

@Service
public interface SyllabusService {
	public List<Syllabus> getAllSyllabus();

	public Syllabus createSyllabus(Syllabus syllabus);

	public List<Syllabus> getAllSyllabusByKey(String keyword);

	public List<Syllabus> getAllSyllabusByCreateDate(String date);
}
