package com.example.BE.controller.syllabus;

import com.example.BE.mapper.LearningObjectiveMapper;
import com.example.BE.mapper.SyllabusMapper;
import com.example.BE.mapper.SyllabusObjectMapper;
import com.example.BE.mapper.TrainingContentMapper;
import com.example.BE.mapper.TrainingUnitMapper;
import com.example.BE.model.dto.ApiResponse;
import com.example.BE.model.dto.PageableDTO;
import com.example.BE.model.dto.response.LearningObjectiveResponse;
import com.example.BE.model.dto.response.SyllabusObjectResponse;
import com.example.BE.model.dto.response.SyllabusResponse;
import com.example.BE.model.dto.response.TrainingContentResponse;
import com.example.BE.model.dto.response.TrainingUnitResponse;
import com.example.BE.model.entity.LearningObject;
import com.example.BE.model.entity.Syllabus;
import com.example.BE.model.entity.SyllabusObject;
import com.example.BE.model.entity.TrainingContent;
import com.example.BE.model.entity.TrainingUnit;
import com.example.BE.model.entity.User;
import com.example.BE.repository.SyllabusObjectRepository;
import com.example.BE.repository.SyllabusRepository;
import com.example.BE.repository.TrainingContentRepository;
import com.example.BE.repository.TrainingProgramSyllabusRepo;
import com.example.BE.repository.TrainingUnitRepository;
import com.example.BE.repository.UserRepository;
import com.example.BE.service.SyllabusService;
import com.example.BE.service.TrainingContentService;
import com.example.BE.service.TrainingProgramSyllabusService;
import com.example.BE.service.TrainingUnitService;

import org.apache.commons.lang3.RandomStringUtils;
import org.springdoc.core.converters.models.Pageable;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;

import org.springframework.util.ResourceUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;

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
	TrainingUnitRepository unitRepo;

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

	@Autowired
	TrainingContentMapper contentMapper;

	@Autowired
	TrainingProgramSyllabusService tpsService;

	@Autowired
	TrainingProgramSyllabusRepo tpsRepo;

	@Autowired
	LearningObjectiveMapper loMapper;

	@Autowired
	TrainingContentRepository contentRepository;

	@GetMapping("/view")
	public List<SyllabusResponse> getAllSyllabus() {
		List<SyllabusResponse> syList = syllabusService.getAll();
		
		for (SyllabusResponse syr : syList) {
			List<SyllabusObject> syObj = syObjectRepo.getSyllabusObjectBySyllabusCode(syr.getTopic_code());
			List<SyllabusObjectResponse> syObjsResult = syObjectMapper.toSyObjectList(syObj);

			int duration = 0;

			if(syr.getUnitList() != null){
				for (TrainingUnitResponse tur : syr.getUnitList()) {
				for (TrainingContentResponse tcr : tur.getContentList()) {
					duration += tcr.getDuration();
				}
			}
			if (duration != 0) {
				syr.setProgramDuration(duration);
			} else {
				syr.setProgramDuration(0);
			}
			}else{
				syr.setProgramDuration(0);
			}
			
			syr.setLearningList(syObjsResult);
		}
		return syList;
	}

	@GetMapping("/search")
	public List<SyllabusResponse> getAllSyllabusByKeyword(@RequestParam("keyword") String keyword) {
		if (keyword == null || keyword.isEmpty() || keyword == " ") {
			return syllabusService.getAll();
		} else {
			List<SyllabusResponse> syList = syllabusService.getAllSyllabusByKey(keyword);
			int duration = 0;
			if (syList != null) {
				for (SyllabusResponse syllabus : syList) {
					for (TrainingUnitResponse tur : syllabus.getUnitList()) {
						for (TrainingContentResponse tcr : tur.getContentList()) {
							duration += tcr.getDuration();
						}
					}
					if (duration != 0) {
						syllabus.setProgramDuration(duration);
					} else {
						syllabus.setProgramDuration(0);
					}
				}
				return syList;
			} else {
				return null;
			}
		}
	}

	@GetMapping("/search/{date}")
	public List<SyllabusResponse> getAllSyllabusByDate(@PathVariable String date) {
		List<SyllabusResponse> result = syllabusService.getAllSyllabusByCreateDate(date);
		int duration = 0;
		for (SyllabusResponse syllabus : result) {
			for (TrainingUnitResponse tur : syllabus.getUnitList()) {
				for (TrainingContentResponse tcr : tur.getContentList()) {
					duration += tcr.getDuration();
				}
			}
			if (duration != 0) {
				syllabus.setProgramDuration(duration);
			} else {
				syllabus.setProgramDuration(0);
			}
		}
		return result;
	}

	@GetMapping("viewSyllabus/{code}")
	public ResponseEntity<ApiResponse> getSyllabusByTopicCode(@PathVariable int code) {
		ApiResponse apiResponse = new ApiResponse();
		try {
			Syllabus existedSyllabus = syllabusService.getSyllabusByTopic_Code(code);
			if (existedSyllabus != null) {
				int duration = 0;
				SyllabusResponse syllabus = syllabusService.getSyllabusByTopicCode(code);
				for (TrainingUnitResponse tur : syllabus.getUnitList()) {
					for (TrainingContentResponse tcr : tur.getContentList()) {
						duration += tcr.getDuration();
					}
				}
				if (duration != 0) {
					syllabus.setProgramDuration(duration);
				} else {
					syllabus.setProgramDuration(0);
				}
				List<SyllabusObject> syObj = syObjectRepo.getSyllabusObjectBySyllabusCode(syllabus.getTopic_code());
				List<SyllabusObjectResponse> syObjsResult = syObjectMapper.toSyObjectList(syObj);
				syllabus.setLearningList(syObjsResult);
				apiResponse.ok(syllabus);
				return ResponseEntity.ok(apiResponse);
			} else {
				apiResponse.error("Syllabus not found");
				return  ResponseEntity.status(HttpStatus.NOT_FOUND).body(apiResponse);
			}
		} catch (Exception e) {
			apiResponse.error("Server failed");
			return new ResponseEntity<>(apiResponse, HttpStatus.BAD_REQUEST);
		}
	}

	@PostMapping("/saveSyllabus")
	public ResponseEntity<ApiResponse> saveSyllabus(@RequestBody SyllabusResponse syllabusResponse) {
		ApiResponse apiResponse = new ApiResponse();
		try {
			Syllabus result;
			if(syllabusResponse.getTopic_code() != 0){
				if(syllabusService.getSyllabusByTopic_Code(syllabusResponse.getTopic_code()) != null){
					apiResponse.error("Syllabus has already exists");
					return ResponseEntity.status(HttpStatus.NOT_FOUND).body(apiResponse);
				}
			}
			
			if (userRepo.getUserById(syllabusResponse.getUserId()) != null) {
				Syllabus syllabus = syllabusService.convertSyllabus(syllabusResponse);
				result = repo.save(syllabus);
				result.setCreate_by(userRepo.getUserById(syllabusResponse.getUserId()).getName());
				result.setModified_by(userRepo.getUserById(syllabusResponse.getUserId()).getName());
			} else {
				apiResponse.error("User not found");
				return  ResponseEntity.status(HttpStatus.NOT_FOUND).body(apiResponse);
			}
			

			if (syllabusResponse.getUnitList() != null) {
				for (TrainingUnit tu : result.getSyllabus_unit()) {
					tu.setUnit_topic_code(result);
				}
				List<TrainingUnit> unitList = trainingUnitService.saveAllUnits(result.getSyllabus_unit());
				for (TrainingUnit tun : unitList) {
					for (TrainingContent tc : tun.getTraining_content()) {
						tc.setUnitCode(tun);
					}
					contentService.saveAllTrainingContents(tun.getTraining_content());
				}
			}

			if (syllabusResponse.getLearningList() != null) {
				for (SyllabusObjectResponse sObjectResponse : syllabusResponse.getLearningList()) {
					LearningObject lo = syllabusService.convertObject(sObjectResponse.getLearningObjectList());
					syllabusService.saveObjective(lo, result.getTopic_code());
				}

			}
			SyllabusResponse test = syllabusMapper.toResponse(result);
			apiResponse.ok(test);
			return getSyllabusByTopicCode(test.getTopic_code());
		} catch (Exception e) {
			e.printStackTrace();
			apiResponse.error(e);
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(apiResponse);
		}

	}

	@PostMapping("/saveUnit/{id}")
	public ResponseEntity<ApiResponse> saveUnits(@RequestBody List<TrainingUnitResponse> request,
			@PathVariable int id) {
		// TrainingUnit unit = unitMapper.toEntity(request);
		// TrainingUnit tmp;
		// tmp = trainingUnitService.saveUnit(unit);
		ApiResponse apiResponse = new ApiResponse();
		List<TrainingUnit> unitList = new ArrayList<>();
		for (TrainingUnitResponse uRes : request) {
			TrainingUnit unit = trainingUnitService.convert(uRes);
			unit.setUnit_topic_code(syllabusService.getSyllabusByTopic_Code(id));

			TrainingUnit result = trainingUnitService.saveUnit(unit);
			for (TrainingContent tc : result.getTraining_content()) {
				tc.setUnitCode(result);
			}
			contentService.saveAllTrainingContents(result.getTraining_content());
			unitList.add(result);
		}
		List<TrainingUnitResponse> tmp = unitMapper.toTrainingUnitResponseList(unitList);
		apiResponse.ok(tmp);
		return ResponseEntity.ok(apiResponse);
	}

	@GetMapping("/viewPagingSyllabus")
	public ResponseEntity<ApiResponse> getSyllabusList(
			@RequestParam(defaultValue = "0") int page,
			@RequestParam(defaultValue = "5") int size) {
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

	@PutMapping("/updateSyllabus/{id}")
	public ResponseEntity<ApiResponse> updateSyllabus(@PathVariable int id, @RequestBody SyllabusResponse syResponse) {
		ApiResponse apiResponse = new ApiResponse();
		try {
			Syllabus existedSyllabus = syllabusService.getSyllabusByTopic_Code(id);
			if (existedSyllabus != null) {
				// SyllabusResponse syllabus = syllabusService.getSyllabusByTopicCode(id);
				// Syllabus syResponse = syllabusService.convertSyllabus(syllabusResponse);
				// existedSyllabus.setTopic_code(syResponse.getTopic_code());
				if (syResponse.getTopic_name() != null) {
					existedSyllabus.setTopic_name(syResponse.getTopic_name());
				}
				if (syResponse.getTechnical_group() != null) {
					existedSyllabus.setTechnical_group(syResponse.getTechnical_group());
				}
				if (syResponse.getVersion() != null) {
					existedSyllabus.setVersion(syResponse.getVersion());
				}
				if (syResponse.getTraining_audience() != null) {
					existedSyllabus.setTraining_audience(syResponse.getTraining_audience());
				}
				if (syResponse.getTopic_outline() != null) {
					existedSyllabus.setTopic_outline(syResponse.getTopic_outline());
				}
				if (syResponse.getTraining_materials() != null) {
					existedSyllabus.setTraining_materials(syResponse.getTraining_materials());
				}
				if (syResponse.getTraining_principles() != null) {
					existedSyllabus.setTraining_principles(syResponse.getTraining_principles());
				}
				if (syResponse.getPriority() != null) {
					existedSyllabus.setPriority(syResponse.getPriority());
				}
				if (syResponse.getLevel() != null) {
					existedSyllabus.setLevel(syResponse.getLevel());
				}
				if (syResponse.getPublish_status() != null) {
					existedSyllabus.setPublish_status(syResponse.getPublish_status());
				}
				if (syResponse.getCreate_by() != null) {
					existedSyllabus.setCreate_by(syResponse.getCreate_by());
				}
				if (syResponse.getCreatedDate() != null) {
					existedSyllabus.setCreatedDate(syResponse.getCreatedDate());
				}
				if (syResponse.getModified_by() != null) {
					existedSyllabus.setModified_by(syResponse.getModified_by());
				}
				if (syResponse.getModified_date() != null) {
					existedSyllabus.setModified_date(syResponse.getModified_date());
				}
				if (syResponse.getUserId() != 0) {
					User user_existedSyllabus = userRepo.getUserById(syResponse.getUserId());
					existedSyllabus.setUser_syllabus(user_existedSyllabus);
				}
				Syllabus updatedSyllabus = syllabusService.updateSyllabus(existedSyllabus);
				if (syResponse.getUnitList() != null) {
					List<TrainingUnit> updatedUnits = syllabusService.updateUnitResponse(syResponse.getUnitList());
				}
				if (syResponse.getLearningList() != null) {
					updateLearning(id, syResponse.getLearningList());
				}
				SyllabusResponse afterSyllabus = syllabusService.getSyllabusByTopicCode(id);
				// SyllabusResponse updatedSyllabusResponse =
				// syllabusMapper.toResponse(afterSyllabus);

				apiResponse.ok(afterSyllabus);
				return ResponseEntity.ok(apiResponse);
			} else {
				apiResponse.error("Syllabus not found");
				return ResponseEntity.status(HttpStatus.NOT_FOUND).body(apiResponse);
			}
		} catch (Exception e) {
			e.printStackTrace();
			apiResponse.error("Server failed");
			;
			return new ResponseEntity<>(apiResponse, HttpStatus.BAD_REQUEST);
		}

	}

	@PostMapping("/testGetUnits/{id}")
	public ResponseEntity<ApiResponse> getUnits(@PathVariable int id,
			@RequestBody List<TrainingUnitResponse> unitsResponse) {
		ApiResponse apiResponse = new ApiResponse();
		Syllabus existedSyllabus = syllabusService.getSyllabusByTopic_Code(id);
		List<TrainingUnit> existedUnits = existedSyllabus.getSyllabus_unit();
		if (unitsResponse != null) {
			for (int i = 0; i < unitsResponse.size(); i++) {
				List<TrainingContent> existingContents = existedUnits.get(i).getTraining_content();
				if (unitsResponse.get(i).getUnit_name() != null) {
					existedUnits.get(i).setUnit_name(unitsResponse.get(i).getUnit_name());
				}
				if (unitsResponse.get(i).getDay_number() != 0) {
					existedUnits.get(i).setDay_number(unitsResponse.get(i).getDay_number());
				}
				if (unitsResponse.get(i).getContentList() != null) {
					for (int a = 0; a < unitsResponse.get(i).getContentList().size(); a++) {
						if (unitsResponse.get(i).getContentList().get(a).getContent() != null) {
							existingContents.get(a)
									.setContent(unitsResponse.get(i).getContentList().get(a).getContent());
						}
						if (unitsResponse.get(i).getContentList().get(a).getLearningObjective() != null) {
							existingContents.get(a).setLearningObjective(
									unitsResponse.get(i).getContentList().get(a).getLearningObjective());
						}
						if (unitsResponse.get(i).getContentList().get(a).getDeliveryType() != null) {
							existingContents.get(a)
									.setDeliveryType(unitsResponse.get(i).getContentList().get(a).getDeliveryType());
						}
						if (unitsResponse.get(i).getContentList().get(a).getDuration() != 0) {
							existingContents.get(a)
									.setDuration(unitsResponse.get(i).getContentList().get(a).getDuration());
						}
						if (unitsResponse.get(i).getContentList().get(a).getTrainingFormat() != null) {
							existingContents.get(a).setTrainingFormat(
									unitsResponse.get(i).getContentList().get(a).getTrainingFormat());
						}
						if (unitsResponse.get(i).getContentList().get(a).getNote() != null) {
							existingContents.get(a).setNote(unitsResponse.get(i).getContentList().get(a).getNote());
						}
					}
				}
			}
		}
		// List<TrainingUnit> unitsResult = syllabusService.updateUnit(existedUnits);

		apiResponse.ok(unitMapper.toTrainingUnitResponseList(existedUnits));
		return ResponseEntity.ok(apiResponse);
	}

	@DeleteMapping("/deleteUnit/{id}")
	public ResponseEntity<ApiResponse> deleteUnit(@PathVariable int id) {
		ApiResponse apiResponse = new ApiResponse();
		try {
			TrainingUnit unit = trainingUnitService.getUnitByUnitCode(id);
			if (unit != null) {
				if (!unit.getTraining_content().isEmpty()) {
					contentService.deleteAllContentsByUnit(unit.getTraining_content());
					trainingUnitService.deleteUnit(id);
				} else {
					trainingUnitService.deleteUnit(id);
				}
				apiResponse.ok("Delete Successfully");
				return ResponseEntity.ok(apiResponse);
			} else {
				apiResponse.error("Unit not found");
				return ResponseEntity.ok(apiResponse);
			}
		} catch (Exception e) {
			apiResponse.error("Server failed");

			return ResponseEntity.ok(apiResponse);
		}

	}

	@DeleteMapping("/deleteContent/{id}")
	public ResponseEntity<ApiResponse> deleteContent(@PathVariable int id) {
		ApiResponse apiResponse = new ApiResponse();
		try {
			contentService.deleteContent(id);
			apiResponse.ok(id);
			return ResponseEntity.ok(apiResponse);

		} catch (Exception e) {
			e.printStackTrace();
			apiResponse.ok("Delete failed");
			return ResponseEntity.ok(apiResponse);
		}

	}

	@GetMapping("/duplicateSyllabus/{code}")
	public ResponseEntity<ApiResponse> duplicateSyllabus(@PathVariable int code) {
		ApiResponse apiResponse = new ApiResponse();
		Syllabus chosenSyllabus = syllabusService.getSyllabusByTopic_Code(code);
		try {
			if (chosenSyllabus != null) {
				Syllabus duplicatedSyllabus = syllabusService.duplicateSyllabus(code);
				List<TrainingUnit> existedUnits = chosenSyllabus.getSyllabus_unit();
				Syllabus newSyll = repo.save(duplicatedSyllabus);
				List<TrainingUnit> duplicatedUnits = syllabusService.duplicateUnits(code, newSyll);
				List<TrainingUnit> unitList = unitRepo.saveAll(duplicatedUnits);
				for (int i = 0; i < unitList.size(); i++) {
					syllabusService.duplicateContents(existedUnits.get(i).getTraining_content(), unitList.get(i));
				}
				// syllabusService.duplicateContents(code, duplicatedUnits);
				// apiResponse.ok(unitMapper.toTrainingUnitResponseList(duplicatedUnits));
				apiResponse.ok(syllabusMapper.toResponse(newSyll));
				// apiResponse.ok(count);
			} else {
				apiResponse.error("Syllabus not found");
			}
		} catch (Exception e) {
			e.printStackTrace();
			apiResponse.error("Server failed");
		}
		return ResponseEntity.ok(apiResponse);
	}

	@GetMapping("deactivate/{id}")
	public ResponseEntity<ApiResponse> deactivate(@PathVariable int id) {
		ApiResponse apiResponse = new ApiResponse();
		Syllabus existedSyllabus = syllabusService.getSyllabusByTopic_Code(id);
		if (existedSyllabus != null) {
			syllabusService.deactivateSyllabus(id);
			apiResponse.ok(syllabusMapper.toResponse(existedSyllabus));
		} else {
			apiResponse.error("Syllabus not found");
		}
		return ResponseEntity.ok(apiResponse);
	}

	@GetMapping("activate/{id}")
	public ResponseEntity<ApiResponse> activate(@PathVariable int id) {
		ApiResponse apiResponse = new ApiResponse();
		Syllabus existedSyllabus = syllabusService.getSyllabusByTopic_Code(id);
		if (existedSyllabus != null) {
			syllabusService.activateSyllabus(id);
			apiResponse.ok(syllabusMapper.toResponse(existedSyllabus));
		} else {
			apiResponse.error("Syllabus not found");
		}
		return ResponseEntity.ok(apiResponse);
	}

	@PutMapping("/updateUnits")
	public ResponseEntity<ApiResponse> updateUnits(@RequestBody List<TrainingUnitResponse> unitResponses) {
		ApiResponse apiResponse = new ApiResponse();
		List<TrainingUnit> unitList = syllabusService.updateUnitResponse(unitResponses);
		List<TrainingUnitResponse> unitListResponse = new ArrayList<>();

		for (TrainingUnit tu : unitList) {
			unitListResponse.add(unitMapper.toResponse(tu));
		}
		apiResponse.ok(unitListResponse);
		return ResponseEntity.ok(apiResponse);
	}

	@PostMapping("/uploadMaterials/{id}")
	public ResponseEntity<ApiResponse> uploadMaterials(
			@RequestParam("file") MultipartFile file,
			@PathVariable int id) {
		ApiResponse apiResponse = new ApiResponse();
		Syllabus existedSyllabus = syllabusService.getSyllabusByTopic_Code(id);
		if (existedSyllabus != null) {
			String fileName = file.getOriginalFilename();
			String filePath = syllabusService.uploadFile(fileName, file);
			existedSyllabus.setDownload_url(filePath);
			existedSyllabus.setTraining_materials(fileName);
			Syllabus afterSyllabus = syllabusService.updateSyllabus(existedSyllabus);
			apiResponse.ok(afterSyllabus.getDownload_url());
			return ResponseEntity.ok(apiResponse);
		} else {
			apiResponse.error("Syllabus not found");
			return ResponseEntity.ok(apiResponse);
		}
	}

	// @PostMapping("/uploadMultipleMaterials/{id}")
	// public ResponseEntity<ApiResponse> uploadMultipleMaterials(
	// @RequestParam("file") List<MultipartFile> file,
	// @PathVariable int id) {
	// ApiResponse apiResponse = new ApiResponse();
	// Syllabus existedSyllabus = syllabusService.getSyllabusByTopic_Code(id);
	// if (existedSyllabus != null) {

	// String fileName = file.getOriginalFilename();
	// String filePath = syllabusService.uploadFile(fileName, file);
	// existedSyllabus.setDownload_url(filePath);
	// existedSyllabus.setTraining_materials(fileName);
	// Syllabus afterSyllabus = syllabusService.updateSyllabus(existedSyllabus);
	// apiResponse.ok(afterSyllabus.getDownload_url());
	// return ResponseEntity.ok(apiResponse);
	// } else {
	// apiResponse.error("Syllabus not found");
	// return ResponseEntity.ok(apiResponse);
	// }
	// }

	Path foundFile = null;

	@GetMapping(value = "/downloadMaterials/{id}")
	public ResponseEntity<?> downloadFiles(@PathVariable int id) {
		ApiResponse apiResponse = new ApiResponse();
		Syllabus existedSyllabus = syllabusService.getSyllabusByTopic_Code(id);
		Resource resource = null;
		String filePath = existedSyllabus.getDownload_url();
		try {
			if (filePath != null) {
				resource = new UrlResource(Paths.get(filePath).toUri());
				String contentType = "application/octet-stream";
				String headerValue = "attachment;fileName=\"" + resource.getFilename() + "\"";
				HttpHeaders headers = new HttpHeaders();
				headers.add(HttpHeaders.CONTENT_DISPOSITION,
						"attachment; filename=\"" + existedSyllabus.getTraining_materials() + "\"");
				return ResponseEntity.ok()
						.headers(headers)
						.contentType(MediaType.APPLICATION_OCTET_STREAM)
						.body(resource);
			}
		} catch (Exception e) {
			e.printStackTrace();
			apiResponse.ok("No file");
			return ResponseEntity.ok(apiResponse);
		}
		return ResponseEntity.ok(apiResponse);
	}

	@GetMapping("/testGetDuration/{id}")
	public ResponseEntity<ApiResponse> getDuration(@PathVariable int id) {
		ApiResponse apiResponse = new ApiResponse();
		int duration = syllabusService.getAllContentDuration(id);
		apiResponse.ok(duration);
		return ResponseEntity.ok(apiResponse);
	}

	@DeleteMapping("/deleteLearning/{id}")
	public void testDeleteLearning(@PathVariable int id) {
		try {
			if (syObjectRepo.getSyllabusObjectBySyllabusCode(id) != null) {
				syObjectRepo.deleteSyllabusObjectByTopicCode(id);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	@PutMapping("testUpdateLearning/{id}")
	public ResponseEntity<ApiResponse> updateLearning(@PathVariable int id,
			@RequestBody List<SyllabusObjectResponse> loResponse) {
		ApiResponse apiResponse = new ApiResponse();
		testDeleteLearning(id);
		for (SyllabusObjectResponse sObjectResponse : loResponse) {
			LearningObject lo = syllabusService.convertObject(sObjectResponse.getLearningObjectList());
			syllabusService.saveObjective(lo, id);
		}
		return ResponseEntity.ok(apiResponse);

	}

}
