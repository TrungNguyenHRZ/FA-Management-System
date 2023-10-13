package com.example.BE.service.Impl;


import java.sql.Date;
// import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.BE.mapper.SyllabusMapper;
import com.example.BE.mapper.TrainingContentMapper;
import com.example.BE.model.dto.response.SyllabusResponse;
import com.example.BE.model.dto.response.TrainingUnitResponse;

import com.example.BE.model.entity.Syllabus;
import com.example.BE.model.entity.TrainingContent;
import com.example.BE.repository.SyllabusRepository;
import com.example.BE.repository.TrainingContentRepository;
import com.example.BE.service.SyllabusService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SyllabusServiceImpl implements SyllabusService {

    @Autowired
    SyllabusRepository syllabusRepository;



	@Autowired
	SyllabusMapper mapper;

	@Autowired
	TrainingContentRepository contentRepo;

	@Autowired
	TrainingContentMapper contentMapper;

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
	public List<SyllabusResponse> getAllSyllabusByKey(String keyword) {
		// TODO Auto-generated method stub
		List<Syllabus> syList = syllabusRepository.getSyllabusListByKeyword(keyword);
		List<SyllabusResponse> result;
		result = mapper.toSyllabusResponseList(syList);
		int b = 0;
		List<TrainingUnitResponse> unitList;
		List<TrainingContent> contentList; 
		for(SyllabusResponse a : result) {
			unitList = a.getUnitList();
			for(TrainingUnitResponse s : unitList) {
				contentList = contentRepo.getTrainingContentByUnitCode(s.getUnit_code());				
				s.setContentList(contentMapper.toListTrainingContentList(contentList));
			}
			
		}
		return result;
	}

	@Override
	public List<SyllabusResponse> getAllSyllabusByCreateDate(String date) {
		// TODO Auto-generated method stub
		List<Syllabus> syList = syllabusRepository.getSyllabusByCreateDate(date);
		List<SyllabusResponse> result;
		result = mapper.toSyllabusResponseList(syList);
		int b = 0;
		List<TrainingUnitResponse> unitList;
		List<TrainingContent> contentList; 
		for(SyllabusResponse a : result) {
			unitList = a.getUnitList();
			for(TrainingUnitResponse s : unitList) {
				contentList = contentRepo.getTrainingContentByUnitCode(s.getUnit_code());				
				s.setContentList(contentMapper.toListTrainingContentList(contentList));
			}
			
		}
		return result;
	
		}

	@Override
	public Syllabus findByUserId(int userid) {
		return syllabusRepository.getSyllabusByUser(userid);
	}

	@Override
	public SyllabusResponse getSyllabusByTopicCode(int topic_code) {
		// TODO Auto-generated method stub
		Syllabus syllabus = syllabusRepository.getSyllabusByTopicCode(topic_code);
		SyllabusResponse result = mapper.toResponse(syllabus);
		List<TrainingUnitResponse> unitList = result.getUnitList();
		List<TrainingContent> contentList; 
		for(TrainingUnitResponse s : unitList) {
				contentList = contentRepo.getTrainingContentByUnitCode(s.getUnit_code());				
				s.setContentList(contentMapper.toListTrainingContentList(contentList));
			}
		return result;
	}

	@Override
	public List<SyllabusResponse> getAll() {
		// TODO Auto-generated method stub
		List<Syllabus> syList = syllabusRepository.findAll();
		List<SyllabusResponse> result;
		result = mapper.toSyllabusResponseList(syList);
		int b = 0;
		List<TrainingUnitResponse> unitList;
		List<TrainingContent> contentList; 
		for(SyllabusResponse a : result) {
			unitList = a.getUnitList();
			for(TrainingUnitResponse s : unitList) {
				contentList = contentRepo.getTrainingContentByUnitCode(s.getUnit_code());				
				s.setContentList(contentMapper.toListTrainingContentList(contentList));
			}
			
		}
		return result;
	}

}
