package com.example.BE.service.Impl;


import java.sql.Date;
import java.util.ArrayList;
// import java.util.Date;
import java.util.List;

import org.springdoc.core.converters.models.Pageable;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.example.BE.mapper.SyllabusMapper;
import com.example.BE.mapper.TrainingContentMapper;
import com.example.BE.model.dto.response.SyllabusResponse;
import com.example.BE.model.dto.response.TrainingContentResponse;
import com.example.BE.model.dto.response.TrainingUnitResponse;

import com.example.BE.model.entity.Syllabus;
import com.example.BE.model.entity.TrainingContent;
import com.example.BE.model.entity.TrainingUnit;
import com.example.BE.model.entity.User;
import com.example.BE.repository.SyllabusRepository;
import com.example.BE.repository.TrainingContentRepository;
import com.example.BE.repository.UserRepository;
import com.example.BE.service.SyllabusService;
import com.example.BE.service.TrainingUnitService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SyllabusServiceImpl implements SyllabusService {

    @Autowired
    SyllabusRepository syllabusRepository;

	// @Autowired
	// TrainingUnitService unitService;

	@Autowired
	SyllabusMapper mapper;

	@Autowired
	TrainingContentRepository contentRepo;

	@Autowired
	TrainingContentMapper contentMapper;

	@Autowired
	UserRepository userRepo;

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

	
	@Override
	public Syllabus getSyllabusByTopic_Code(int topic_code) {
		// TODO Auto-generated method stub
		return syllabusRepository.getSyllabusByTopicCode(topic_code);
	}

	
	@Override
	public Page<Syllabus> getAllPagesSyllabus(int page, int size) {
		// TODO Auto-generated method stub
		PageRequest pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "createdDate"));
		return syllabusRepository.findAll(pageable);
	}


	@Override
	public Syllabus convertSyllabus(SyllabusResponse syResponse) {
		// TODO Auto-generated method stub
		Syllabus syllabus = new Syllabus();
		syllabus.setTopic_code(syResponse.getTopic_code());
		syllabus.setTopic_name(syResponse.getTopic_name());
		syllabus.setTechnical_group(syResponse.getTechnical_group());
		syllabus.setVersion(syResponse.getVersion());
		syllabus.setTraining_audience(syResponse.getTraining_audience());
		syllabus.setTopic_outline(syResponse.getTopic_outline());
		syllabus.setTraining_materials(syResponse.getTraining_materials());
		syllabus.setTraining_principles(syResponse.getTraining_principles());
		syllabus.setPriority(syResponse.getPriority());
		syllabus.setLevel(syResponse.getLevel());
		syllabus.setPublish_status(syResponse.getPublish_status());
		syllabus.setCreate_by(syResponse.getCreate_by());
		syllabus.setCreatedDate(syResponse.getCreatedDate());
		syllabus.setModified_by(syResponse.getModified_by());
		syllabus.setModified_date(syResponse.getModified_date());
		User user_syllabus = userRepo.getUserById(syResponse.getUserId());
		syllabus.setUser_syllabus(user_syllabus);
		List<TrainingUnitResponse> unitResponseList = syResponse.getUnitList();
		List<TrainingUnit> unitList = new ArrayList<>();
		for(TrainingUnitResponse tur : unitResponseList){
			TrainingUnit u;
			u = convert(tur);
			unitList.add(u);
		}
		syllabus.setSyllabus_unit(unitList);
		return syllabus;
	}

	public TrainingUnit convert(TrainingUnitResponse unitResponse) {
		// TODO Auto-generated method stub
		TrainingUnit u = new TrainingUnit();
		u.setUnit_code(unitResponse.getUnit_code());
		u.setDay_number(unitResponse.getDay_number());
		u.setUnit_name(unitResponse.getUnit_name());
		Syllabus s = getSyllabusByTopic_Code(unitResponse.getTopic_code());
		List<TrainingContent> contentList = convertContent(
			unitResponse.getContentList(), unitResponse.getUnit_code());
		u.setTraining_content(contentList);
		u.setUnit_topic_code(s);
		
		return u;
	}

	public List<TrainingContent> convertContent(List<TrainingContentResponse> tcrs, int unitCode) {
		// TODO Auto-generated method stub
		List<TrainingContent> contentList = new ArrayList<TrainingContent>();
		// TrainingUnit unit = unitService.getUnitByUnitCode(unitCode);
		for(TrainingContentResponse tcr : tcrs){
			TrainingContent content = new TrainingContent();
			content.setContentId(tcr.getContentId());
			content.setContent(tcr.getContent());
			content.setLearningObjective(tcr.getLearningObjective());
			content.setDeliveryType(tcr.getDeliveryType());
			content.setDuration(tcr.getDuration());
			content.setTrainingFormat(tcr.getTrainingFormat());		
			content.setNote(tcr.getNote());
			// content.setUnitCode(unit);
			contentList.add(content);
		}
		return contentList;
	}

}
