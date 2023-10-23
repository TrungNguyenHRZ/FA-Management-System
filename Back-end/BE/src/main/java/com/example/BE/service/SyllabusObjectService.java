package com.example.BE.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.BE.model.entity.SyllabusObject;

@Service
public interface SyllabusObjectService {
	List<SyllabusObject> getSyllabusObjectBySyllabusCode(int code);
}
