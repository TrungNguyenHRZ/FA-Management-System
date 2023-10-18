package com.example.BE.controller.syllabus;

import com.example.BE.mapper.SyllabusMapper;
import com.example.BE.mapper.TrainingUnitMapper;
import com.example.BE.model.dto.ApiResponse;
import com.example.BE.model.dto.PageableDTO;
import com.example.BE.model.dto.ApiResponse;
import com.example.BE.model.dto.ApiResponse;
import com.example.BE.model.dto.response.SyllabusResponse;
import com.example.BE.model.dto.response.TrainingUnitResponse;
import com.example.BE.model.entity.Syllabus;
import com.example.BE.model.entity.TrainingContent;
import com.example.BE.model.entity.TrainingUnit;
import com.example.BE.model.entity.User;
import com.example.BE.repository.SyllabusRepository;
import com.example.BE.repository.UserRepository;
import com.example.BE.service.SyllabusService;
import com.example.BE.service.TrainingContentService;
import com.example.BE.service.TrainingUnitService;

import org.springdoc.core.converters.models.Pageable;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/syllabus")
public class ViewSyllabusController {

    @Autowired
    SyllabusService syllabusService;

	@Autowired
	SyllabusMapper syllabusMapper;

    @Autowired
    SyllabusRepository repo;

    @Autowired
    UserRepository repoUser;

	@Autowired
	TrainingUnitService trainingUnitService;

	@Autowired 
	TrainingUnitMapper unitMapper;

	@Autowired
	TrainingContentService contentService;


	@GetMapping("/view")
	public List<SyllabusResponse> getAllSyllabus(){
		return syllabusService.getAll();
	}

	@GetMapping("/view/{keyword}")
	public List<SyllabusResponse> getAllSyllabusByKeyword(@PathVariable String keyword){
		return syllabusService.getAllSyllabusByKey(keyword);
	}

	@GetMapping("/search/{date}")
	public List<SyllabusResponse> getAllSyllabusByDate(@PathVariable String date){
		return syllabusService.getAllSyllabusByCreateDate(date);
	}
	
	@GetMapping("viewSyllabus/{code}")
	public SyllabusResponse getSyllabusByTopicCode(@PathVariable int code){
		return syllabusService.getSyllabusByTopicCode(code);
	}


    @PostMapping("/saveSyllabus")
    public ResponseEntity<ApiResponse> saveSyllabus(@RequestBody SyllabusResponse syllabusResponse) {
      	ApiResponse apiResponse = new ApiResponse();
		Syllabus syllabus = syllabusService.convertSyllabus(syllabusResponse);
        Syllabus result = repo.save(syllabus);
		for(TrainingUnit tu : result.getSyllabus_unit()){
			tu.setUnit_topic_code(result);

		}
		List<TrainingUnit> unitList = trainingUnitService.saveAllUnits(result.getSyllabus_unit());
		for(TrainingUnit tun : unitList){
			for(TrainingContent tc : tun.getTraining_content()){
				tc.setUnitCode(tun);
			}
			contentService.saveAllTrainingContents(tun.getTraining_content());
		}
		SyllabusResponse resultResponse = syllabusMapper.toResponse(result);
		apiResponse.ok(resultResponse);
		// result.setUser_syllabus(null);
		return ResponseEntity.ok(apiResponse);
    }

	@PostMapping("/processText")
    public  String processText(@RequestBody String text) {
        // Xử lý văn bản và trả về kết quả
        String result = "Processed: " + text;
        return result;
    }

	@PostMapping("/saveUnit")
	public ResponseEntity<ApiResponse> saveUnits(@RequestBody TrainingUnitResponse request){
		// TrainingUnit unit = unitMapper.toEntity(request);
		// TrainingUnit tmp;
		// tmp = trainingUnitService.saveUnit(unit);
		ApiResponse apiResponse = new ApiResponse();
		TrainingUnit unit = trainingUnitService.convert(request);
		TrainingUnit result = trainingUnitService.saveUnit(unit);
		for(TrainingContent tc : result.getTraining_content()){
			tc.setUnitCode(result);
		}
		contentService.saveAllTrainingContents(result.getTraining_content());
		TrainingUnitResponse tmp = unitMapper.toResponse(result);
		apiResponse.ok(tmp);
		 return ResponseEntity.ok(apiResponse);

		// Syllabus s = syllabusService.getSyllabusByTopic_Code(1);
		// request.setUnit_topic_code(s);
		// request.getUnit_name();
		// trainingUnitService.saveUnit(request);
		// String result = "Processed: " + request;
        // return result;
	}

	@GetMapping("/viewPagingSyllabus")
	public ResponseEntity<ApiResponse> getSyllabusList(
		@RequestParam(defaultValue = "0") int page,
        @RequestParam(defaultValue = "5") int size
	){		
		ApiResponse apiResponse = new ApiResponse();
		Page<Syllabus> list = syllabusService.getAllPagesSyllabus(page, size);
		PageableDTO<SyllabusResponse> data = new PageableDTO<>();
		data.setContent(syllabusMapper.toSyllabusResponseList(list.getContent()));
		data.setPageNumber(list.getNumber());
		data.setPageSize(list.getSize());
		data.setTotalElements(list.getTotalElements());
		data.setTotalPages(list.getTotalPages());
		apiResponse.ok(data);
		return ResponseEntity.ok(apiResponse);
	}
}
