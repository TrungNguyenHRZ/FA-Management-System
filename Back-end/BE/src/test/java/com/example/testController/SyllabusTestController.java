package com.example.testController;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

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
	public void testSaveSyllabus() throws Exception {
		
	}



}
