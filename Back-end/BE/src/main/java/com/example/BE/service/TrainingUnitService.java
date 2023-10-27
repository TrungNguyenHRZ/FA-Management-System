package com.example.BE.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.BE.model.dto.response.TrainingUnitResponse;
import com.example.BE.model.entity.TrainingUnit;

@Service
public interface TrainingUnitService {
	public List<TrainingUnit> getAllTrainingUnits();
	public List<TrainingUnit> getTrainingUnitsByTopicCode(int code);
	TrainingUnit getUnitByUnitCode(int topicCode);
	TrainingUnit saveUnit(TrainingUnit unit);
	TrainingUnit convert (TrainingUnitResponse unitResponse);
	List<TrainingUnit> saveAllUnits(List<TrainingUnit> units);
	List<TrainingUnit> updateUnit(List<TrainingUnit> unit);
	void deleteUnit(int unitId);
}
