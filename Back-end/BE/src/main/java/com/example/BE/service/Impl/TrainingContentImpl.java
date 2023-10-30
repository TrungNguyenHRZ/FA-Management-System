package com.example.BE.service.Impl;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.BE.model.dto.response.TrainingContentResponse;
import com.example.BE.model.entity.TrainingContent;
import com.example.BE.model.entity.TrainingUnit;
import com.example.BE.repository.TrainingContentRepository;
import com.example.BE.service.TrainingContentService;
import com.example.BE.service.TrainingUnitService;

@Service
public class TrainingContentImpl implements TrainingContentService{

	@Autowired
	TrainingContentRepository repo;
	@Override
	public void saveAllTrainingContents(List<TrainingContent> trainingContentList) {
		// TODO Auto-generated method stub
		// for(TrainingContent tc : trainingContentList){
		// 	tc.set
		// }
		repo.saveAll(trainingContentList);
	}
	@Override
	public void deleteAllContentsByUnit(List<TrainingContent> trainingContentList) {
		// TODO Auto-generated method stub
		repo.deleteAll(trainingContentList);
	}

	// @Autowired
	// TrainingUnitService unitService;

	// @Override
	// public TrainingContent convert(TrainingContentResponse tcr, int unitCode) {
	// 	// TODO Auto-generated method stub
	// 	// List<TrainingContent> contentList = new ArrayList<TrainingContent>();
	// 	TrainingUnit unit = unitService.getUnitByUnitCode(unitCode);

	// 		TrainingContent content = new TrainingContent();
	// 		content.setContentId(tcr.getContentId());
	// 		content.setContent(tcr.getContent());
	// 		content.setLearningObjective(tcr.getLearningObjective());
	// 		content.setDeliveryType(tcr.getDeliveryType());
	// 		content.setDuration(tcr.getDuration());
	// 		content.setTrainingFormat(tcr.getTrainingFormat());		
	// 		content.setNote(tcr.getNote());
	// 		content.setUnitCode(unit);
	// 		// contentList.add(content);
		
	// 	return content;
	// }
	
}
