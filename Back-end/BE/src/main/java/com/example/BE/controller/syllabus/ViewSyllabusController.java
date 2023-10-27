package com.example.BE.controller.syllabus;

import com.example.BE.mapper.SyllabusMapper;
import com.example.BE.mapper.SyllabusObjectMapper;
import com.example.BE.mapper.TrainingUnitMapper;
import com.example.BE.model.dto.ApiResponse;
import com.example.BE.model.dto.PageableDTO;
import com.example.BE.model.dto.ApiResponse;
import com.example.BE.model.dto.ApiResponse;
import com.example.BE.model.dto.response.SyllabusObjectResponse;
import com.example.BE.model.dto.response.SyllabusResponse;
import com.example.BE.model.dto.response.TrainingUnitResponse;
import com.example.BE.model.entity.Syllabus;
import com.example.BE.model.entity.SyllabusObject;
import com.example.BE.model.entity.TrainingContent;
import com.example.BE.model.entity.TrainingUnit;
import com.example.BE.model.entity.User;
import com.example.BE.repository.SyllabusObjectRepository;
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

import java.util.ArrayList;
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

	@Autowired
	SyllabusObjectRepository syObjectRepo;

	@Autowired
	SyllabusObjectMapper syObjectMapper;

	@Autowired
	UserRepository userRepo;


	@GetMapping("/view")
	public List<SyllabusResponse> getAllSyllabus(){
		List<SyllabusResponse> syList = syllabusService.getAll();
		for(SyllabusResponse syr : syList) {
			List<SyllabusObject> syObj = syObjectRepo.getSyllabusObjectBySyllabusCode(syr.getTopic_code());
			List<SyllabusObjectResponse> syObjsResult = syObjectMapper.toSyObjectList(syObj);
			syr.setLearningList(syObjsResult);
		}
		return syList;
	}

	@GetMapping("/search")
	public List<SyllabusResponse> getAllSyllabusByKeyword(@RequestParam("keyword") String keyword){
		if(keyword == null || keyword.isEmpty() || keyword == " "){
			return syllabusService.getAll();
		}else{
			List<SyllabusResponse> syList = syllabusService.getAllSyllabusByKey(keyword);
			if(syList != null){
				return syList;
			}else{
				return null;
			}
		}
	}

	@GetMapping("/search/{date}")
	public List<SyllabusResponse> getAllSyllabusByDate(@PathVariable String date){
		return syllabusService.getAllSyllabusByCreateDate(date);
	}
	
	@GetMapping("viewSyllabus/{code}")
	public ResponseEntity<ApiResponse> getSyllabusByTopicCode(@PathVariable int code){
		ApiResponse apiResponse = new ApiResponse();
		try{
			Syllabus existedSyllabus = syllabusService.getSyllabusByTopic_Code(code);
			if(existedSyllabus != null){
				SyllabusResponse syllabus = syllabusService.getSyllabusByTopicCode(code);
				List<SyllabusObject> syObj = syObjectRepo.getSyllabusObjectBySyllabusCode(syllabus.getTopic_code());
				List<SyllabusObjectResponse> syObjsResult = syObjectMapper.toSyObjectList(syObj);
				syllabus.setLearningList(syObjsResult);
				apiResponse.ok(syllabus);
				return ResponseEntity.ok(apiResponse);
			}else {
				apiResponse.error("Syllabus not found");;
				return new ResponseEntity<>(apiResponse,HttpStatus.BAD_REQUEST);
			}		
		}catch(Exception e) {
			apiResponse.error("Server failed");;
			return new ResponseEntity<>(apiResponse,HttpStatus.BAD_REQUEST);
		}	
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

	@GetMapping("/testLearning")
	public List<SyllabusResponse> getLearningList() {
		List<SyllabusResponse> syList = syllabusService.getAll();
		for(SyllabusResponse syr : syList) {
			List<SyllabusObject> syObj = syObjectRepo.getSyllabusObjectBySyllabusCode(syr.getTopic_code());
			List<SyllabusObjectResponse> syObjsResult = syObjectMapper.toSyObjectList(syObj);
			syr.setLearningList(syObjsResult);
		}
		return syList;
	}

	@GetMapping("/test1")
	public List<SyllabusObjectResponse> testLearningList() {
		List<SyllabusObjectResponse> syList;
		List<SyllabusObject> syObj = syObjectRepo.findAll();
		List<SyllabusObjectResponse> syObjsResult = syObjectMapper.toSyObjectList(syObj);
		return syObjsResult;
	}

	@PutMapping("/updateSyllabus/{id}")
	public ResponseEntity<ApiResponse> updateSyllabus(@PathVariable int id, @RequestBody SyllabusResponse syResponse){
		ApiResponse apiResponse = new ApiResponse();
		try{
			Syllabus existedSyllabus = syllabusService.getSyllabusByTopic_Code(id);
			
			if(existedSyllabus != null){
				// SyllabusResponse syllabus = syllabusService.getSyllabusByTopicCode(id);
				// Syllabus syResponse = syllabusService.convertSyllabus(syllabusResponse);
				// existedSyllabus.setTopic_code(syResponse.getTopic_code());
				existedSyllabus.setTopic_name(syResponse.getTopic_name());
				existedSyllabus.setTechnical_group(syResponse.getTechnical_group());
				existedSyllabus.setVersion(syResponse.getVersion());
				existedSyllabus.setTraining_audience(syResponse.getTraining_audience());
				existedSyllabus.setTopic_outline(syResponse.getTopic_outline());
				existedSyllabus.setTraining_materials(syResponse.getTraining_materials());
				existedSyllabus.setTraining_principles(syResponse.getTraining_principles());
				existedSyllabus.setPriority(syResponse.getPriority());
				existedSyllabus.setLevel(syResponse.getLevel());
				existedSyllabus.setPublish_status(syResponse.getPublish_status());
				existedSyllabus.setCreate_by(syResponse.getCreate_by());
				existedSyllabus.setCreatedDate(syResponse.getCreatedDate());
				existedSyllabus.setModified_by(syResponse.getModified_by());
				existedSyllabus.setModified_date(syResponse.getModified_date());
				User user_existedSyllabus = userRepo.getUserById(syResponse.getUserId());
				existedSyllabus.setUser_syllabus(user_existedSyllabus);
				existedSyllabus.setSyllabus_unit(null);

				// List<TrainingUnitResponse> unitResponseList = syResponse.getUnitList();
				// List<TrainingUnit> unitList = new ArrayList<>();
				// for(TrainingUnitResponse tur : unitResponseList){
				// 	TrainingUnit u;
				// 	u = syllabusService.convert(tur);
				// 	unitList.add(u);
				// }
				// existedSyllabus.setSyllabus_unit(unitList);
				Syllabus updatedSyllabus = syllabusService.updateSyllabus(existedSyllabus);
				SyllabusResponse updatedSyllabusResponse = syllabusMapper.toResponse(updatedSyllabus);
				apiResponse.ok(updatedSyllabusResponse);
				return ResponseEntity.ok(apiResponse);
			}else{
				apiResponse.error("Syllabus not found");;
				return new ResponseEntity<>(apiResponse,HttpStatus.BAD_REQUEST);
			}
		}catch(Exception e){
			apiResponse.error("Server failed");;
			return new ResponseEntity<>(apiResponse,HttpStatus.BAD_REQUEST);
		}
		
	}

	@DeleteMapping("/deleteUnit/{id}")
	public ResponseEntity<ApiResponse> deleteUnit(@PathVariable int id){
		ApiResponse apiResponse = new ApiResponse();
		try{
			TrainingUnit unit = trainingUnitService.getUnitByUnitCode(id);
			if(unit != null){
				if(!unit.getTraining_content().isEmpty()){
					contentService.deleteAllContentsByUnit(unit.getTraining_content());
					trainingUnitService.deleteUnit(id);
				}else{
					trainingUnitService.deleteUnit(id);
				}
				apiResponse.ok("Delete Successfully");
				return ResponseEntity.ok(apiResponse);
			}else{
				apiResponse.error("Unit not found");
				return ResponseEntity.ok(apiResponse);
			}
		}catch(Exception e){
			apiResponse.error("Server failed");;
			return ResponseEntity.ok(apiResponse);
		}
		
	}

	@PostMapping("/duplicateSyllabus/{code}")
	public ResponseEntity<ApiResponse> duplicateSyllabus(@PathVariable int code){
		ApiResponse apiResponse = new ApiResponse();
		Syllabus chosenSyllabus = syllabusService.getSyllabusByTopic_Code(code);
		try{
			if(chosenSyllabus != null){
			syllabusService.duplicateSyllabus(code);
			apiResponse.error("Duplicate Successfully!");;
			} else{
				apiResponse.error("Syllabus not found");

			}
		}catch(Exception e){
			apiResponse.error("Server failed");
		}	
		return ResponseEntity.ok(apiResponse);
	}
}
