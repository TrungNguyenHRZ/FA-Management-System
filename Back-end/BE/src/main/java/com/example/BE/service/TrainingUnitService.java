package com.example.BE.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.BE.model.entity.TrainingUnit;

@Service
public interface TrainingUnitService {
	public List<TrainingUnit> getAllTrainingUnits();
	public List<TrainingUnit> getTrainingUnitsByTopicCode(int code);
}
