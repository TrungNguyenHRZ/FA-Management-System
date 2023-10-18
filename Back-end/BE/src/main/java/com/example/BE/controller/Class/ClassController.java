package com.example.BE.controller.Class;

import com.example.BE.mapper.ClassMapper;
import com.example.BE.model.dto.ApiResponse;
import com.example.BE.model.dto.ClassDTO;
import com.example.BE.model.dto.response.ClassResponse;
import com.example.BE.model.entity.Class;
import com.example.BE.model.entity.TrainingProgram;
import com.example.BE.service.ClassService;
import com.example.BE.service.TrainingProgramService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/class")
public class ClassController {
    @Autowired
    private ClassService classService;
    @Autowired
    private ClassMapper classMapper;
    @Autowired
    private TrainingProgramService trainingProgramService;
//    @GetMapping(value = {"", "/all"})
//    public List<ClassDTO> getAllClass(){
//        List<Class> classList = classService.findAllClass();
//        return classMapper.toClassDTOList(classList);
//    }
    @GetMapping(value = {"", "/all"})
    public ResponseEntity<ApiResponse<List<Class>>> getAllClass() {
        ApiResponse apiResponse = new ApiResponse();
        apiResponse.ok(classService.findAllClass());
        return ResponseEntity.ok(apiResponse);
    }
    @GetMapping(value = {"/searchByName"})
    public ClassResponse findClassByName(@RequestParam(required = true) String className){
        Class c = classService.searchByName(className);
        ClassResponse classResponse = new ClassResponse(c);
        return classResponse;
    }
    @GetMapping(value = {"/searchByClassCode"})
    public ClassResponse findClassByCode(@RequestParam(required = true) String classCode){
        Class c = classService.searchByClassCode(classCode);
        ClassResponse classResponse = new ClassResponse(c);
        return classResponse;
    }
    @GetMapping("/{id}")
    public ClassResponse getClassById(@PathVariable int id){
        Class tmp = classService.findById(id);
        ClassResponse classResponse = new ClassResponse(tmp);
        return classResponse;
    }
//    @PostMapping(value = {"/CreateClass"})
//    public ResponseEntity<ClassResponse> CreateClass(@RequestBody ClassResponse c){
//        c.setClassId(0);
//        Class tmp = classService.create(c);
//        ClassResponse response = new ClassResponse();
//        response.set
//        return ResponseEntity.status(HttpStatus.CREATED).body(response);
//    }
    @PostMapping(value = {"/CreateClass"})
    public ResponseEntity<ApiResponse> registerUser(@Valid @RequestBody ClassResponse c, BindingResult bindingResult) {
        ApiResponse apiResponse = new ApiResponse();

    //    userValidator.validate(user, bindingResult);
    //
    //    // validator
    //    if (bindingResult.hasErrors()) {
    //        apiResponse.error(validatorUtil.toErrors(bindingResult.getFieldErrors()));
    //        return ResponseEntity.ok(apiResponse);
    //    }

        Class tmp = classService.saveClass(classService.convert(c));
        ClassResponse tmp2 = new ClassResponse(tmp);
        apiResponse.ok(tmp2);

        return ResponseEntity.ok(apiResponse);
    }
    @PutMapping(value = {"UpdateClass/{id}"})
    public ResponseEntity<ClassResponse> updateClass(@PathVariable int id, @RequestBody ClassResponse c){
        Class tmp = classService.findById(id);
        if(tmp!=null){
            tmp.setClassName(c.getClassName());
            tmp.setClassCode(c.getClassCode());
            tmp.setDuration(c.getDuration());
            tmp.setStatus(c.getStatus());
            tmp.setLocation(c.getLocation());
            tmp.setFsu(c.getFsu());
            tmp.setStart_date(c.getStart_date());
            tmp.setEnd_date(c.getEnd_date());
            tmp.setCreate_by(c.getCreate_by());
            tmp.setCreatedDate(c.getCreatedDate());
            tmp.setModified_date(c.getModified_date());
            tmp.setModified_by(c.getModified_by());
            TrainingProgram tmp1 = trainingProgramService.findById(c.getTrainingProgram_id());
            tmp.setProgram_class(tmp1);
            Class tmp2 = classService.updateClass(tmp);
            ClassResponse result = new ClassResponse(tmp2);
            return ResponseEntity.ok(result);
        }else{
            return ResponseEntity.notFound().build();
        }
    }
    @GetMapping(value = {"/searchByDate"})
    public List<ClassResponse> findClassByTimeRange(@RequestParam(value = "startDay") String startDay,
                                            @RequestParam(value = "endDay") String endDay) throws ParseException {
        Date startDayDate = new SimpleDateFormat("yyyy-MM-dd").parse(startDay);
        Date endDayDate = new SimpleDateFormat("yyyy-MM-dd").parse(endDay);

        return classService.findClassesInDateRange(startDayDate, endDayDate);
    }
}
