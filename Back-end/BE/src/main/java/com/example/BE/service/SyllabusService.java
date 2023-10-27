package com.example.BE.service;


import com.example.BE.model.entity.Syllabus;
import com.example.BE.model.entity.TrainingUnit;

import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import java.util.List;
import com.example.BE.model.dto.response.SyllabusResponse;
import com.example.BE.model.dto.response.TrainingUnitResponse;
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

	public Syllabus getSyllabusByTopic_Code(int topic_code);

	Page<Syllabus> getAllPagesSyllabus(int page, int size);

	Syllabus convertSyllabus(SyllabusResponse syResponse);

	Syllabus updateSyllabus(Syllabus syllabus);

	TrainingUnit convert(TrainingUnitResponse unitResponse);

	void duplicateSyllabus(int code);

	int generateNextId();
}
