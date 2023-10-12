package com.example.BE.controller.syllabus;

import com.example.BE.mapper.SyllabusMapper;
import com.example.BE.model.dto.response.SyllabusResponse;
import com.example.BE.model.entity.Syllabus;
import com.example.BE.model.entity.User;
import com.example.BE.repository.SyllabusRepository;
import com.example.BE.repository.UserRepository;
import com.example.BE.service.SyllabusService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/syllabus")
public class ViewSyllabusController {

    @Autowired
    SyllabusService syllabusService;

    @Autowired
    SyllabusRepository repo;

    @Autowired
    UserRepository repoUser;

    @Autowired
    SyllabusMapper syllabusMapper;

    @GetMapping("/view")
    public List<SyllabusResponse> getAllSyllabus() {
        List<Syllabus> syllabusList;
        syllabusList = syllabusService.getAllSyllabus();
        return syllabusMapper.toSyllabusResponseList(syllabusList);
    }

    @GetMapping("/view/{keyword}")
    public List<Syllabus> getAllSyllabusByKeyword(@PathVariable String keyword) {
        return syllabusService.getAllSyllabusByKey(keyword);
    }

    @GetMapping("/search/{date}")
    public List<Syllabus> getAllSyllabusByDate(@PathVariable String date) {
        return syllabusService.getAllSyllabusByCreateDate(date);
    }

    @PostMapping("/saveSyllabus/{id}")
    public Syllabus saveSyllabus(@RequestBody Syllabus syllabus, @PathVariable int id) {
        User user = repoUser.getUserById(id);
        syllabus.setUser_syllabus(user);
        return repo.save(syllabus);
    }
}
