package com.example.BE.service.Impl;


// import java.sql.Date;
import java.util.ArrayList;
import java.util.Date;
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
import com.example.BE.repository.TrainingUnitRepository;
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

	@Autowired
	TrainingUnitRepository unitRepo;

	@Override
	public List<Syllabus> getAllSyllabus() {
		// TODO Auto-generated method stub
		return syllabusRepository.getSyllabusDescDate();
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
		List<Syllabus> syList = syllabusRepository.getSyllabusDescDate();
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

	@Override
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


	@Override
	public Syllabus updateSyllabus(Syllabus syllabus) {
		// TODO Auto-generated method stub
		return syllabusRepository.saveAndFlush(syllabus);
	}


	@Override
	public Syllabus duplicateSyllabus(int code) {
		// TODO Auto-generated method stub
		Syllabus duplicatedSyllabus = new Syllabus();
		Syllabus chosenSyllabus = getSyllabusByTopic_Code(code);
		int nextId = generateNextId();
		Date now = new Date();

		if(chosenSyllabus != null){
			duplicatedSyllabus.setTopic_code(nextId);
			duplicatedSyllabus.setTopic_name(chosenSyllabus.getTopic_name());
			duplicatedSyllabus.setTechnical_group(chosenSyllabus.getTechnical_group());
			duplicatedSyllabus.setVersion(chosenSyllabus.getVersion());
			duplicatedSyllabus.setTraining_audience(chosenSyllabus.getTraining_audience());
			duplicatedSyllabus.setTopic_outline(chosenSyllabus.getTopic_outline());
			duplicatedSyllabus.setTraining_materials(chosenSyllabus.getTraining_materials());
			duplicatedSyllabus.setTraining_principles(chosenSyllabus.getTraining_principles());
			duplicatedSyllabus.setPriority(chosenSyllabus.getPriority());
			duplicatedSyllabus.setLevel(chosenSyllabus.getLevel());
			duplicatedSyllabus.setPublish_status(chosenSyllabus.getPublish_status());
			duplicatedSyllabus.setCreate_by(chosenSyllabus.getCreate_by());
			duplicatedSyllabus.setCreatedDate(now);
			duplicatedSyllabus.setModified_by(chosenSyllabus.getModified_by());
			duplicatedSyllabus.setModified_date(chosenSyllabus.getModified_date());
			duplicatedSyllabus.setUser_syllabus(chosenSyllabus.getUser_syllabus());
			// duplicatedSyllabus.setSyllabus_unit(chosenSyllabus.getSyllabus_unit());
		}
		// Syllabus newSyllabus = syllabusRepository.saveAndFlush(duplicatedSyllabus);
		// List<TrainingUnit> duplicatedUnits = duplicateUnits(chosenSyllabus.getTopic_code(),nextId);
		// duplicatedSyllabus.setSyllabus_unit(duplicatedUnits);
		// for(TrainingUnit tu : duplicatedSyllabus.getSyllabus_unit()){
		// 		tu.setUnit_topic_code(newSyllabus);
		// }
		// unitRepo.saveAllAndFlush(duplicatedSyllabus.getSyllabus_unit());
		return duplicatedSyllabus;
	}

	@Override
	public int generateNextId() {
		// TODO Auto-generated method stub
		return syllabusRepository.getLastSyllabus().getTopic_code() + 1;
	}


	@Override
	public List<TrainingUnit> duplicateUnits(int code, Syllabus newSyllabus) {
		// TODO Auto-generated method stub
		List<TrainingUnit> duplicatedUnitList = new ArrayList<>();
		List<TrainingUnit> unitList = getSyllabusByTopic_Code(code).getSyllabus_unit();
		
		int newId = genrateLastUnitCode() + 1;
		for(int i = 0; i < unitList.size(); i++) {
			TrainingUnit duplicatedUnit = new TrainingUnit();
			duplicatedUnit.setUnit_code(newId);
			duplicatedUnit.setUnit_name(unitList.get(i).getUnit_name());
			duplicatedUnit.setDay_number(unitList.get(i).getDay_number());
			duplicatedUnit.setUnit_topic_code(newSyllabus);
			// duplicatedUnit.setTraining_content(unitList.get(i).getTraining_content());
			// duplicateContent(unitList.get(i).getTraining_content(), duplicatedUnit);
			duplicatedUnitList.add(duplicatedUnit);
			// duplicateContents(code, duplicatedUnitList);
			newId++;
		}
		newSyllabus.setSyllabus_unit(duplicatedUnitList);
		return duplicatedUnitList;
		// return unitRepo.saveAll(duplicatedUnitList);
	}


	@Override
	public void duplicateContents(List<TrainingContent> original, TrainingUnit tu) {
		// TODO Auto-generated method stub
		int newId = contentRepo.getLastContent().getContentId() + 1;
		// List<TrainingUnit> unitList = getSyllabusByTopic_Code(code).getSyllabus_unit();;
			List<TrainingContent> copiedContents = new ArrayList<>();
			for(int i = 0;i<original.size();i++){
				TrainingContent content = new TrainingContent();
				content.setContentId(newId);
				content.setContent(original.get(i).getContent());
				content.setDeliveryType(original.get(i).getDeliveryType());
				content.setDuration(original.get(i).getDuration());
				content.setLearningObjective(original.get(i).getLearningObjective());
				content.setNote(original.get(i).getNote());
				content.setTrainingFormat(original.get(i).getTrainingFormat());
				content.setUnitCode(tu);
				copiedContents.add(content);
				newId++;
			}
		tu.setTraining_content(copiedContents);
		// return contentList;
		contentRepo.saveAll(copiedContents);
		}



	@Override
	public int genrateLastUnitCode() {
		// TODO Auto-generated method stub
		int lastId = unitRepo.getLastTrainingUnit().getUnit_code();
		return lastId;
	}


	@Override
	public List<TrainingUnit> updateUnit(List<TrainingUnit> units) {
		// TODO Auto-generated method stub
		// List<TrainingUnit> unitList = unitRepo.getTrainingUnitsByTopicCode(code);
		return unitRepo.saveAll(units);
	}


	@Override
	public List<TrainingContent> updateContents(List<TrainingContent> contents) {
		// TODO Auto-generated method stub
		return contentRepo.saveAll(contents);
	}


	@Override
	public void activateSyllabus(int code) {
		// TODO Auto-generated method stub
		try{
			Syllabus existedSyllabus = getSyllabusByTopic_Code(code);
			if(existedSyllabus != null){
				existedSyllabus.setPublish_status("Active");
				syllabusRepository.save(existedSyllabus);
			}
		}catch(Exception e){
			e.printStackTrace();
		}
	}


	@Override
	public void deactivateSyllabus(int code) {
		// TODO Auto-generated method stub
		try{
			Syllabus existedSyllabus = getSyllabusByTopic_Code(code);
			if(existedSyllabus != null){
				existedSyllabus.setPublish_status("Inactive");
				syllabusRepository.save(existedSyllabus);
			}
		}catch(Exception e){
			e.printStackTrace();
		}
	}


	@Override
	public List<TrainingUnit> updateUnitResponse(List<TrainingUnitResponse> unitResponse) {
		// TODO Auto-generated method stub
		List<TrainingUnit> unitList = new ArrayList<>();
		List<TrainingContent> contentList = new ArrayList<>();
		// for(TrainingUnitResponse response : unitResponse){
		// 	TrainingUnit unit = convert(response);
		// 	unitList.add(unit);
		// }
		for(TrainingUnitResponse response : unitResponse){
			TrainingUnit unit = unitRepo.getTrainingUnitByUnitCode(response.getUnit_code());
			if(unit != null){
				if(response.getUnit_name() != null){
					unit.setUnit_name(response.getUnit_name());
				}
				if(response.getDay_number() != 0){
					unit.setDay_number(response.getDay_number());
				}
				if(response.getContentList() != null){
					for(TrainingContentResponse cResponse : response.getContentList()){
						TrainingContent content = contentRepo.getContentById(cResponse.getContentId());
						if(content != null){
							if(cResponse.getContent() != null){
								content.setContent(cResponse.getContent());
							}
							if(cResponse.getLearningObjective() != null){
								content.setLearningObjective(cResponse.getLearningObjective());
							}
							if(cResponse.getDeliveryType() != null){
								content.setDeliveryType(cResponse.getDeliveryType());
							}
							if(cResponse.getDuration() > 0){
								content.setDuration(cResponse.getDuration());
							}
							if(cResponse.getNote() != null){
								content.setNote(cResponse.getNote());
							}
							if(cResponse.getTrainingFormat() != null){
								content.setTrainingFormat(cResponse.getTrainingFormat());
							}
							content.setUnitCode(unit);
						}
						contentList.add(content);
					}
				}				
			}
			unit.setTraining_content(contentList);
			unitList.add(unit);
		}
		List<TrainingUnit> trainingUnitList = updateUnit(unitList);
		List<TrainingContent> trainingContentList = contentRepo.saveAll(contentList);
		return trainingUnitList;
	}

	

	

}
