package com.example.testController;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import java.util.List;

import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;

import com.example.BE.BeApplication;
import com.example.BE.controller.syllabus.ViewSyllabusController;
import com.example.BE.model.dto.ApiResponse;
import com.example.BE.model.dto.response.SyllabusResponse;
import com.example.BE.service.SyllabusService;

@SpringBootTest(classes = BeApplication.class)
@AutoConfigureMockMvc
public class SyllabusTestController {

	@Autowired
	private SyllabusService syllabusService;

	@Autowired
    private ViewSyllabusController syllabusController;

	@Autowired
    private MockMvc mockMvc;

	@Test 
	public void testViewSyllabus() throws Exception {
		ResponseEntity<ApiResponse> responseEntity = syllabusController.getSyllabusByTopicCode(1);
        // assertEquals("success", responseEntity.getBody().getStatus());
		Assertions.assertThat(responseEntity).isNotNull()
		
	}
}
