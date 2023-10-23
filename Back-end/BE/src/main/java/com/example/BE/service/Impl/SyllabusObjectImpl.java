package com.example.BE.service.Impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.BE.model.dto.response.SyllabusObjectResponse;
import com.example.BE.model.entity.SyllabusObject;
import com.example.BE.repository.SyllabusObjectRepository;
import com.example.BE.service.SyllabusObjectService;

@Service
public class SyllabusObjectImpl implements SyllabusObjectService {

	@Autowired
	SyllabusObjectRepository syObjRepo;
	
	@Override
	public List<SyllabusObject> getSyllabusObjectBySyllabusCode(int code) {
		// TODO Auto-generated method stub
		return syObjRepo.getSyllabusObjectBySyllabusCode(code);

	}
	
}
