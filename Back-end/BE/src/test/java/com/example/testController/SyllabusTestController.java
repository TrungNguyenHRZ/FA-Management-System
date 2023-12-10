package com.example.testController;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import java.util.ArrayList;
import java.util.List;

import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import com.example.BE.BeApplication;
import com.example.BE.controller.syllabus.ViewSyllabusController;
import com.example.BE.dto.request.user.LoginRequest;
import com.example.BE.model.dto.ApiResponse;
import com.example.BE.model.dto.response.SyllabusResponse;
import com.example.BE.model.dto.response.TrainingContentResponse;
import com.example.BE.model.dto.response.TrainingUnitResponse;
import com.example.BE.model.entity.TrainingContent;
import com.example.BE.service.SyllabusService;
import com.fasterxml.jackson.databind.ObjectMapper;

import static org.hamcrest.Matchers.containsString;

@SpringBootTest(classes = BeApplication.class)
@AutoConfigureMockMvc
public class SyllabusTestController {
	@Autowired
    private MockMvc mockMvc;

    @Autowired
	ObjectMapper objectMapper;

	@Test 
	public void testViewSyllabus() throws Exception {
		int topicCode = 9;

    	mockMvc.perform(get("/syllabus/viewSyllabus/" + topicCode )
            .contentType("application/json"))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.status").value("SUCCESS"));
	}

	@Test 
	public void testViewSyllabusNotOk() throws Exception {
		int topicCode = 2000;
		mockMvc.perform(get("/syllabus/viewSyllabus/" + topicCode )
            .contentType("application/json"))
            .andExpect(status().isNotFound())
            .andExpect(jsonPath("$.status").value("ERROR"))
			.andExpect(jsonPath("$.message").value("Syllabus not found"));
	}

	@Test
	public void testSaveSyllabusOk() throws Exception {
		SyllabusResponse syllabusResponse = new SyllabusResponse();
		TrainingUnitResponse unitResponse = new TrainingUnitResponse();
		List<TrainingUnitResponse> trainingUnits = new ArrayList<TrainingUnitResponse>();
		TrainingContentResponse contentResponse = new TrainingContentResponse();
		List<TrainingContentResponse> contents = new ArrayList<TrainingContentResponse>();
		//content fake data
		contentResponse.setContent("DB connect");
		contentResponse.setLearningObjective("");
		contentResponse.setDeliveryType("Assignment/Lab");
		contentResponse.setDuration(1);
		contentResponse.setTrainingFormat("Online");
		contents.add(contentResponse);
		//unit fake data
		unitResponse.setUnit_name("ORM");
		unitResponse.setDay_number(1);
		unitResponse.setContentList(contents);
		trainingUnits.add(unitResponse);
		//syllabus fake data
		syllabusResponse.setUserId(1);
		syllabusResponse.setTopic_name("Java");
		syllabusResponse.setUnitList(trainingUnits);
		String syllabusJSON = objectMapper.writeValueAsString(syllabusResponse);
		mockMvc.perform(post("/syllabus/saveSyllabus")
		.content(syllabusJSON)
		.contentType("application/json"))
		.andExpect(status().isOk());
	}

	@Test
	public void testSaveSyllabusUserNotFound() throws Exception {
		SyllabusResponse syllabusResponse = new SyllabusResponse();
		TrainingUnitResponse unitResponse = new TrainingUnitResponse();
		List<TrainingUnitResponse> trainingUnits = new ArrayList<TrainingUnitResponse>();
		TrainingContentResponse contentResponse = new TrainingContentResponse();
		List<TrainingContentResponse> contents = new ArrayList<TrainingContentResponse>();
		//content fake data
		contentResponse.setContent("DB connect");
		contentResponse.setLearningObjective("");
		contentResponse.setDeliveryType("Assignment/Lab");
		contentResponse.setDuration(1);
		contentResponse.setTrainingFormat("Online");
		contents.add(contentResponse);
		//unit fake data
		unitResponse.setUnit_name("ORM");
		unitResponse.setDay_number(1);
		unitResponse.setContentList(contents);
		trainingUnits.add(unitResponse);
		//syllabus fake data
		syllabusResponse.setUserId(0);
		syllabusResponse.setTopic_name("Java");
		syllabusResponse.setUnitList(trainingUnits);
		String syllabusJSON = objectMapper.writeValueAsString(syllabusResponse);
		mockMvc.perform(post("/syllabus/saveSyllabus")
		.content(syllabusJSON)
		.contentType("application/json"))
		.andExpect(status().isNotFound());
	}

	@Test
	public void testSaveSyllabusHasExisted() throws Exception {
		SyllabusResponse syllabusResponse = new SyllabusResponse();
		TrainingUnitResponse unitResponse = new TrainingUnitResponse();
		List<TrainingUnitResponse> trainingUnits = new ArrayList<TrainingUnitResponse>();
		TrainingContentResponse contentResponse = new TrainingContentResponse();
		List<TrainingContentResponse> contents = new ArrayList<TrainingContentResponse>();
		//content fake data
		contentResponse.setContent("DB connect");
		contentResponse.setLearningObjective("");
		contentResponse.setDeliveryType("Assignment/Lab");
		contentResponse.setDuration(1);
		contentResponse.setTrainingFormat("Online");
		contents.add(contentResponse);
		//unit fake data
		unitResponse.setUnit_name("ORM");
		unitResponse.setDay_number(1);
		unitResponse.setContentList(contents);
		trainingUnits.add(unitResponse);
		//syllabus fake data
		syllabusResponse.setUserId(0);
		syllabusResponse.setTopic_name("Java");
		syllabusResponse.setUnitList(trainingUnits);
		syllabusResponse.setTopic_code(9);
		String syllabusJSON = objectMapper.writeValueAsString(syllabusResponse);
		mockMvc.perform(post("/syllabus/saveSyllabus")
		.content(syllabusJSON)
		.contentType("application/json"))
		.andExpect(status().isNotFound());
	}

	@Test
	public void testSaveSyllabusNoUnits() throws Exception {
		SyllabusResponse syllabusResponse = new SyllabusResponse();
		//syllabus fake data
		syllabusResponse.setUserId(1);
		syllabusResponse.setTopic_name("Java");
		String syllabusJSON = objectMapper.writeValueAsString(syllabusResponse);
		mockMvc.perform(post("/syllabus/saveSyllabus")
		.content(syllabusJSON)
		.contentType("application/json"))
		.andExpect(status().isBadRequest());
	}

	@Test
	public void testSaveSyllabusNoContents() throws Exception {
		SyllabusResponse syllabusResponse = new SyllabusResponse();
		TrainingUnitResponse unitResponse = new TrainingUnitResponse();
		List<TrainingUnitResponse> trainingUnits = new ArrayList<TrainingUnitResponse>();
		//unit fake data
		unitResponse.setUnit_name("ORM");
		unitResponse.setDay_number(1);
		trainingUnits.add(unitResponse);
		//syllabus fake data
		syllabusResponse.setUserId(1);
		syllabusResponse.setTopic_name("Java");
		String syllabusJSON = objectMapper.writeValueAsString(syllabusResponse);
		mockMvc.perform(post("/syllabus/saveSyllabus")
		.content(syllabusJSON)
		.contentType("application/json"))
		.andExpect(status().isBadRequest());
	}

	@Test
	public void testUpdateSyllabusNotExisted() throws Exception {
		int topic_code  = 0;
		mockMvc.perform(put("/syllabus/updateSyllabus" + topic_code)
		.contentType("application/json"))
		.andExpect(status().isNotFound());
	}

}
