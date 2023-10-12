package com.example.BE.controller;

import com.example.BE.mapper.ClassMapper;
import com.example.BE.model.dto.ClassDTO;
import com.example.BE.model.entity.Class;
import com.example.BE.service.ClassService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/findAllClass")
public class ClassController {
    @Autowired
    private ClassService classService;
    @Autowired
    private ClassMapper classMapper;

    @GetMapping(value = {"", "/all"})
    public List<ClassDTO> getAllClass() {
        List<Class> classList = classService.findAllClass();
        return classMapper.toClassDTOList(classList);
    }
}
