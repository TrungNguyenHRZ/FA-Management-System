package com.example.BE.controller.trainingUnit;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.BE.mapper.TrainingUnitMapper;
import com.example.BE.model.dto.response.TrainingUnitResponse;
import com.example.BE.model.entity.TrainingUnit;
import com.example.BE.service.TrainingUnitService;

@RestController
@RequestMapping("/training_unit")
public class TrainingUnitController {

	@Autowired
	TrainingUnitService trainingUnitService;

	@Autowired
	TrainingUnitMapper unitMapper;
	
	@GetMapping("/view")
	public List<TrainingUnitResponse> getTrainingUnits(){
		List<TrainingUnit> unitList = trainingUnitService.getAllTrainingUnits();
		return unitMapper.toTrainingUnitResponseList(unitList);
		
	}

	@GetMapping("/view/{num}")
	public List<TrainingUnitResponse> getTrainingUnitsByTopicCode(@PathVariable int num){
		List<TrainingUnit> unitList = trainingUnitService.getTrainingUnitsByTopicCode(num);
		return unitMapper.toTrainingUnitResponseList(unitList);
	}

	
	
}
