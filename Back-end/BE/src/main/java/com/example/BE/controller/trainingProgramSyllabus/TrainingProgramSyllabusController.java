package com.example.BE.controller.trainingProgramSyllabus;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.BE.model.entity.TrainingProgramSyllabus;
import com.example.BE.repository.TrainingProgramSyllabusRepo;

@RestController
@RequestMapping("/training_syllabus")
public class TrainingProgramSyllabusController {

	@Autowired
	TrainingProgramSyllabusRepo repo;

	@GetMapping("/view/{num}")
	public List<TrainingProgramSyllabus> viewAllTrainingProgram(@PathVariable int num){
		return repo.getSyllabus(num);
	}

	@GetMapping("/view")
	public List<TrainingProgramSyllabus> viewAllTrainingPrograms(){
		return repo.findAll();
	}
}
