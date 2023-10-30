package com.example.BE.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.BE.model.dto.response.TrainingContentResponse;
import com.example.BE.model.entity.TrainingContent;

@Service
public interface TrainingContentService {
	// public TrainingContent convert(TrainingContentResponse tcr, int unitCode);
	public void saveAllTrainingContents(List<TrainingContent> trainingContentList);
	void deleteAllContentsByUnit(List<TrainingContent> trainingContentList);

}
