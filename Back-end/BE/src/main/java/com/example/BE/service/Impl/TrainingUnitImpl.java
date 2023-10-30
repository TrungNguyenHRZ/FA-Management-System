package com.example.BE.service.Impl;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.BE.model.dto.response.TrainingContentResponse;
import com.example.BE.model.dto.response.TrainingUnitResponse;
import com.example.BE.model.entity.Syllabus;
import com.example.BE.model.entity.TrainingContent;
import com.example.BE.model.entity.TrainingUnit;
import com.example.BE.repository.TrainingUnitRepository;
import com.example.BE.service.SyllabusService;
import com.example.BE.service.TrainingContentService;
import com.example.BE.service.TrainingUnitService;

@Service
public class TrainingUnitImpl implements TrainingUnitService{

	@Autowired
	TrainingUnitRepository repo;

	@Autowired
	SyllabusService syllabusService;

	@Autowired
	TrainingContentService contentService;

	@Override
	public List<TrainingUnit> getAllTrainingUnits() {
		// TODO Auto-generated method stub
		return repo.findAll();
	}

	@Override
	public List<TrainingUnit> getTrainingUnitsByTopicCode(int code) {
		// TODO Auto-generated method stub
		return repo.getTrainingUnitsByTopicCode(code);
	}

	@Override
	public TrainingUnit saveUnit(TrainingUnit unit) {
		// TODO Auto-generated method stub
		return repo.save(unit);

	}

	@Override
	public TrainingUnit convert(TrainingUnitResponse unitResponse) {
		// TODO Auto-generated method stub
		TrainingUnit u = new TrainingUnit();
		u.setUnit_code(unitResponse.getUnit_code());
		u.setDay_number(unitResponse.getDay_number());
		u.setUnit_name(unitResponse.getUnit_name());
		Syllabus s = syllabusService.getSyllabusByTopic_Code(unitResponse.getTopic_code());
		List<TrainingContent> contentList = convertContent(
			unitResponse.getContentList(), unitResponse.getUnit_code());
		u.setTraining_content(contentList);
		u.setUnit_topic_code(s);
		
		return u;
	}

	public List<TrainingContent> convertContent(List<TrainingContentResponse> tcrs, int unitCode) {
		// TODO Auto-generated method stub
		List<TrainingContent> contentList = new ArrayList<TrainingContent>();
		TrainingUnit unit = getUnitByUnitCode(unitCode);
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

	@Override
	public TrainingUnit getUnitByUnitCode(int unitCode) {
		// TODO Auto-generated method stub
		return repo.getTrainingUnitByUnitCode(unitCode);
	}

	@Override
	public List<TrainingUnit> saveAllUnits(List<TrainingUnit> units) {
		// TODO Auto-generated method stub
		return repo.saveAll(units);
	}

	@Override
	public List<TrainingUnit> updateUnit(List<TrainingUnit> units) {
		// TODO Auto-generated method stub
		return repo.saveAll(units);
	}

	@Override
	public void deleteUnit(int unitId) {
		// TODO Auto-generated method stub
		repo.deleteById(unitId);
	}





	
}
