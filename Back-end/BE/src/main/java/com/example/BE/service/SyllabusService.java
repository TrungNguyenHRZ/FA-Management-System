package com.example.BE.service;


import com.example.BE.model.entity.Syllabus;
import com.example.BE.model.entity.TrainingContent;
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

	Syllabus duplicateSyllabus(int code);

	int generateNextId();

	List<TrainingUnit> duplicateUnits(int code, Syllabus newSyllabus);	
	
	void duplicateContents(List<TrainingContent> original, TrainingUnit tu);

	int genrateLastUnitCode();

	List<TrainingUnit> updateUnit(List<TrainingUnit> units);

	List<TrainingContent> updateContents(List<TrainingContent> contents);

	void activateSyllabus(int code);

	void deactivateSyllabus(int code);

}
