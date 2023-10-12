package com.example.BE.service.Impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.BE.model.entity.TrainingUnit;
import com.example.BE.repository.TrainingUnitRepository;
import com.example.BE.service.TrainingUnitService;

@Service
public class TrainingUnitImpl implements TrainingUnitService{

	@Autowired
	TrainingUnitRepository repo;

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
	
}
