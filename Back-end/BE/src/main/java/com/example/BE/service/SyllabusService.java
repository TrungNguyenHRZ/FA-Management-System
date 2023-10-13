package com.example.BE.service;


import com.example.BE.model.entity.Syllabus;
import org.springframework.stereotype.Service;

import java.util.List;
import com.example.BE.model.dto.response.SyllabusResponse;
import com.example.BE.model.entity.Syllabus;


@Service
public interface SyllabusService {
    public List<Syllabus> getAllSyllabus();

    public Syllabus createSyllabus(Syllabus syllabus);

	public List<SyllabusResponse> getAllSyllabusByKey(String keyword);

	public List<SyllabusResponse> getAllSyllabusByCreateDate(String date);

	public Syllabus findByUserId(int userid);

	public SyllabusResponse getSyllabusByTopicCode(int topic_code);

	public List<SyllabusResponse> getAll();
}
