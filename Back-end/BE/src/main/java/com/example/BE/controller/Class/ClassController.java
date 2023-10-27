package com.example.BE.controller.Class;

import com.example.BE.mapper.ClassMapper;
import com.example.BE.model.dto.ApiResponse;
import com.example.BE.model.dto.ClassUserDTO;
import com.example.BE.model.dto.response.ClassResponse;
import com.example.BE.model.entity.Class;
import com.example.BE.model.entity.ClassUser;
import com.example.BE.model.entity.TrainingProgram;
import com.example.BE.repository.ClassUserRepository;
import com.example.BE.service.ClassService;
import com.example.BE.service.ClassUserService;
import com.example.BE.service.TrainingProgramService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
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
    @Autowired
    private ClassUserService classUserService;
    @Autowired
    private ClassUserRepository classUserRepository;
//    @GetMapping(value = {"", "/all"})
//    public List<ClassDTO> getAllClass(){
//        List<Class> classList = classService.findAllClass();
//        return classMapper.toClassDTOList(classList);
//    }
    @GetMapping(value = {"", "/all"})
    public ResponseEntity<ApiResponse<List<ClassResponse>>> getAllClass() {
        ApiResponse apiResponse = new ApiResponse();
        List<Class> clazz = classService.findAllClass();
        List<ClassResponse> clazzResponse = new ArrayList<>();
        for (Class c: clazz) {
            clazzResponse.add(new ClassResponse(c));
        }
        apiResponse.ok(clazzResponse);
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
            if(c.getClassName() !=null) {
                tmp.setClassName(c.getClassName());
            }
            if(c.getClassCode()!=null){
                tmp.setClassCode(c.getClassCode());
            }
            if(c.getDuration()!=0){
                tmp.setDuration(c.getDuration());
            }
            if(c.getStatus()!=null) {
                tmp.setStatus(c.getStatus());
            }
            if(c.getLocation()!=null) {
                tmp.setLocation(c.getLocation());
            }
            if(c.getFsu()!=null) {
                tmp.setFsu(c.getFsu());
            }
            if(c.getStart_date()!=null) {
                tmp.setStart_date(c.getStart_date());
            }
            if(c.getEnd_date()!=null) {
                tmp.setEnd_date(c.getEnd_date());
            }
            if(c.getCreate_by()!=null) {
                tmp.setCreate_by(c.getCreate_by());
            }
            if(c.getCreatedDate()!=null) {
                tmp.setCreatedDate(c.getCreatedDate());
            }
            if(c.getModified_date()!=null) {
                tmp.setModified_date(c.getModified_date());
            }
            if(c.getModified_by()!=null) {
                tmp.setModified_by(c.getModified_by());
            }
            TrainingProgram tmp1 = trainingProgramService.findById(c.getTrainingProgram_id());
            if(tmp1!=null){
            tmp.setProgram_class(tmp1);}
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
    @GetMapping(value = {"/getAllClassUser"})
    public ResponseEntity<ApiResponse<List<ClassUserDTO>>> getAllClassUser() {
        List<ClassUser> cu =  classUserService.getAllClassUserList();
        List<ClassUserDTO> cuDTO = new ArrayList<>();
        for (ClassUser c: cu) {
            cuDTO.add(new ClassUserDTO(c));
        }
        ApiResponse apiResponse = new ApiResponse();
        apiResponse.ok(cuDTO);
        return ResponseEntity.ok(apiResponse);
    }
    @GetMapping(value = {"/searchClassByKeyword"})
    public ResponseEntity<ApiResponse<List<ClassResponse>>> getClassbyKey(@RequestParam(required = true) String key) {
        ApiResponse apiResponse = new ApiResponse();
        apiResponse.ok(classService.findClassByKeyWord(key));
        return ResponseEntity.ok(apiResponse);
    }
}
