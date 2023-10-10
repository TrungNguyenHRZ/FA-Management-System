package com.example.BE.controller.syllabus;

import java.sql.Date;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.BE.model.entity.Syllabus;
// import com.example.BE.repository.SyllabusRepository;
import com.example.BE.service.SyllabusService;

@RestController
@RequestMapping("/syllabus")
public class ViewSyllabusController {
	
	@Autowired
	SyllabusService syllabusService;

	@GetMapping("/view")
	public List<Syllabus> getAllSyllabus(){
		return syllabusService.getAllSyllabus();
	}

	@GetMapping("/view/{keyword}")
	public List<Syllabus> getAllSyllabusByKeyword(@PathVariable String keyword){
		return syllabusService.getAllSyllabusByKey(keyword);
	}

	@GetMapping("/search/{date}")
	public List<Syllabus> getAllSyllabusByDate(@PathVariable String date){
		return syllabusService.getAllSyllabusByCreateDate(date);
	}

}
