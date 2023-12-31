package com.example.BE.controller.Class;

import com.example.BE.dto.response.user.UserResponse;
import com.example.BE.model.dto.ApiResponse;
import com.example.BE.model.dto.ClassUserDTO;
import com.example.BE.model.dto.response.ClassResponse;
import com.example.BE.model.dto.response.ClassUserResponse;
import com.example.BE.model.entity.*;
import com.example.BE.model.entity.Class;
import com.example.BE.repository.ClassUserRepository;
import com.example.BE.service.ClassService;
import com.example.BE.service.ClassUserService;
import com.example.BE.service.TrainingProgramService;
import com.example.BE.service.UserService;
import com.example.BE.util.ValidatorUtil;
import com.example.BE.validator.ClassValidator;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/class")
public class ClassController {
    @Autowired
    private ClassService classService;
    @Autowired
    private UserService userService;
    @Autowired
    private TrainingProgramService trainingProgramService;
    @Autowired
    private ClassUserService classUserService;
    @Autowired
    private ClassUserRepository classUserRepository;
    @Autowired
    private ValidatorUtil validatorUtil;
    @Autowired
    private ClassValidator classValidator;
//    @GetMapping(value = {"", "/all"})
//    public List<ClassDTO> getAllClass(){
//        List<Class> classList = classService.findAllClass();
//        return classMapper.toClassDTOList(classList);
//    }
//    @GetMapping(value = {"", "/all"})
//    public ResponseEntity<ApiResponse<List<ClassResponse>>> getAllClass() {
//        ApiResponse apiResponse = new ApiResponse();
//        List<Class> clazz = classService.findAllClass();
//        List<ClassResponse> clazzResponse = new ArrayList<>();
//        for (Class c: clazz) {
//            clazzResponse.add(new ClassResponse(c));
//        }
//        List<ClassResponse> tmp = classService.sortClassesByCreateDate(clazzResponse);
//        List<ClassResponse> result = classService.sortByModifiedDate(tmp);
//        apiResponse.ok(result);
//        return ResponseEntity.ok(apiResponse);
//    }
    @GetMapping(value = {"", "/all"})
    public ResponseEntity<ApiResponse<List<ClassResponse>>> getAllClass() {
        ApiResponse apiResponse = new ApiResponse();
        List<Class> clazz = classService.findAllClass();
        List<ClassResponse> clazzResponse = new ArrayList<>();
        for (Class c: clazz) {
            clazzResponse.add(new ClassResponse(c));
        }

        // Sort by create date
        List<ClassResponse> result = classService.sortClassesByCreateDate(clazzResponse);

        apiResponse.ok(result);
        return ResponseEntity.ok(apiResponse);
    }
    @GetMapping(value = {"/searchByName"})
    public ClassResponse findClassByName(@RequestParam(required = true) String className){
        Class c = classService.searchByName(className);
        ClassResponse classResponse = new ClassResponse(c);
        return classResponse;
    }
//    @GetMapping(value = {"/searchByClassCode"})
//    public ClassResponse findClassByCode(@RequestParam(required = true) String classCode){
//        Class c1 = classService.searchByClassCode(classCode);
//        ClassResponse classResponse = new ClassResponse(c1);
//        List<Class> classList = new ArrayList<>();
//        for (ClassResponse c :classResponse) {
//            classList.add(classService.findById(c.getClassId()));
//        }
//        return classService.isEnable(classList);
//    }
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
        classValidator.validate(c, bindingResult);
        if (bindingResult.hasErrors()) {
            apiResponse.error(validatorUtil.toErrors(bindingResult.getFieldErrors()));
            return ResponseEntity.ok(apiResponse);
        }
        List<Class> list = classService.findAllClass();
        int n = 0;
        int incrementalNumber = 0;
        if(list.size()-1<0){
            n = 1;
            incrementalNumber = 1;
        }else{
            n = list.size()-1;
            incrementalNumber = list.get(n).getClassId()+1;
        }
        LocalDate now = LocalDate.now();
        int currentYear = now.getYear();
        String twoDigitYear = Integer.toString(currentYear).substring(2);
        c.setClassCode(c.getLocation()+"_"+ twoDigitYear+"_"+incrementalNumber);
        c.setCreatedDate(new Date());
        Class clazz = classService.convert(c);
        clazz.setEnable(true);
        Class tmp = classService.saveClass(clazz);
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
                tmp.setModified_date(new Date());
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
        List<ClassResponse> tmp = classService.findClassesInDateRange(startDayDate, endDayDate);
        List<Class> classList = new ArrayList<>();
        for (ClassResponse c :tmp) {
            classList.add(classService.findById(c.getClassId()));
        }
        return classService.isEnable(classList);
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
        List<ClassResponse> tmp = classService.findClassByKeyWord(key);
        List<Class> classList = new ArrayList<>();
        for (ClassResponse c :tmp) {
            classList.add(classService.findById(c.getClassId()));
        }
        apiResponse.ok(classService.isEnable(classList));
        return ResponseEntity.ok(apiResponse);
    }
    @PostMapping(value = {"/CreateClassUser"})
    public ResponseEntity<ClassUser> createClassUser(@RequestBody ClassUserDTO classUserDTO) {
        ClassUser classUser = new ClassUser();
        classUser.setId(new ClassUserId(classUserDTO.getUserId(), classUserDTO.getClassId()));
        classUser.setUserType(classUserDTO.getUserType());

        Class classObject = classService.findById(classUserDTO.getClassId());
        classUser.setClass_object(classObject);

        User user = userService.getUserById2(classUserDTO.getUserId());
        classUser.setUser(user);

        ClassUser createdClassUser = classUserService.saveClassUser(classUser);
        return new ResponseEntity<>(createdClassUser, HttpStatus.CREATED);
    }
    @GetMapping(value = {"/getClassesByStatus"})
    public ResponseEntity<ApiResponse<List<ClassResponse>>> getAllClassesByStatus(@RequestParam(required = true) String status) {
        ApiResponse apiResponse = new ApiResponse();
        List<Class> cList = classService.searchByStatus(status);
        List<ClassResponse> cr = new ArrayList<>();
        for (Class c: cList) {
            cr.add(new ClassResponse(c));
        }
        List<Class> classList = new ArrayList<>();
        for (ClassResponse c :cr) {
            classList.add(classService.findById(c.getClassId()));
        }
        apiResponse.ok(cr);
        return ResponseEntity.ok(apiResponse);
    }
//    @PutMapping(value = {"/UpdateClassUser/{userId}/{classId}"})
//    public ResponseEntity<ApiResponse<ClassUserRespone>> updateClassUser(@PathVariable("userId") int userId,
//                                                     @PathVariable("classId") int classId,
//                                                     @RequestBody ClassUserDTO classUserDTO) {
//        ApiResponse apiResponse = new ApiResponse();
//        ClassUser classUser = classUserService.getClassUserById(userId, classId);
//        if (classUser == null) {
//            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
//        }else{
//            ClassUser updatedClassUser = new ClassUser(classUserDTO.getUserId(), classUserDTO.getClassId(), classUserDTO.getUserType());
//            //
//            Class classObject = classService.findById(classUserDTO.getClassId());
//            updatedClassUser.setClass_object(classObject);
//            User user = userService.getUserById2(classUserDTO.getUserId());
//            updatedClassUser.setUser(user);
//            //
//            classUserRepository.deleteByUserIdAndClassId(userId, classId);
//            ClassUser tmp = classUserService.saveClassUser(updatedClassUser);
//            ClassUserRespone result = new ClassUserRespone(tmp);
//            apiResponse.ok(result);
//            return ResponseEntity.ok(apiResponse);
//        }
//    }
    // sửa này
        @PutMapping(value = {"/UpdateClassUser/{userId}/{classId}"})
        public ResponseEntity<ApiResponse<ClassUser>> updateClassUser(@PathVariable("userId") int userId,
                                                                      @PathVariable("classId") int classId,
                                                                      @RequestBody ClassUserDTO classUserDTO) {
            ApiResponse apiResponse = new ApiResponse();
            ClassUser classUser = classUserService.getClassUserById(userId, classId);
            if (classUser == null) {
                apiResponse.error("ClassUser not found");
                return ResponseEntity.notFound().build();
            }else{
                ClassUser updatedClassUser = new ClassUser(classUserDTO.getUserId(), classUserDTO.getClassId(), classUserDTO.getUserType());
                //
                Class classObject = classService.findById(classUserDTO.getClassId());
                updatedClassUser.setClass_object(classObject);
                User user = userService.getUserById2(classUserDTO.getUserId());
                updatedClassUser.setUser(user);
                //
                classUserRepository.deleteByUserIdAndClassId(userId, classId);
                ClassUser tmp = classUserService.saveClassUser(updatedClassUser);
                apiResponse.ok(tmp);
                return ResponseEntity.ok(apiResponse);
            }
        }
        @GetMapping("/FilterByFsuOrLocation")
        public ResponseEntity<List<ClassResponse>> searchClasses(@RequestParam(required = false) String fsu, @RequestParam(required = false) String location) {
            if (fsu != null && location != null) {
                List<ClassResponse> classes = classService.findClassByFSU(fsu);
                List<ClassResponse> result = new ArrayList<>();
                for (ClassResponse c:classes) {
                    if(c.getLocation().equalsIgnoreCase(location.trim())){
                        result.add(c);
                    }
                }
                return ResponseEntity.ok(classService.sortClassesByModifiedDate(result));
            } else if (fsu != null) {
                // Tìm lớp học bằng fsu
                List<ClassResponse> classes = classService.findClassByFSU(fsu);
                return ResponseEntity.ok(classService.sortClassesByModifiedDate(classes));
            } else if (location != null) {
                // Tìm lớp học bằng location
                List<ClassResponse> classes = classService.findClassByLocation(location);
                return ResponseEntity.ok(classService.sortClassesByModifiedDate(classes));
            } else {
                // Nếu không cung cấp bất kỳ tham số nào
                return ResponseEntity.badRequest().build();
            }
        }
    @PostMapping(value = {"/CreateMultiClassUser"})
    public ResponseEntity<List<ClassUser>> createMultiClassUser(@RequestBody List<ClassUserDTO> classUserDTOList) {
        List<ClassUser> classUserList = new ArrayList<>();
        for (ClassUserDTO classUserDTO : classUserDTOList) {
            ClassUser classUser = new ClassUser();
            classUser.setId(new ClassUserId(classUserDTO.getUserId(), classUserDTO.getClassId()));
            classUser.setUserType(classUserDTO.getUserType());

            Class classObject = classService.findById(classUserDTO.getClassId());
            classUser.setClass_object(classObject);

            User user = userService.getUserById2(classUserDTO.getUserId());
            classUser.setUser(user);

            ClassUser createdClassUser = classUserService.saveClassUser(classUser);
            classUserList.add(createdClassUser);
        }
        return new ResponseEntity<>(classUserList, HttpStatus.CREATED);
    }
    @GetMapping(value = {"/getUserByClassId"})
    public ResponseEntity<ApiResponse<List<ClassUserDTO>>> getUserByClassId(@RequestParam(required = true) int classId) {
        List<ClassUser> tmp = classUserService.getClassUserListByClassId(classId);
        List<ClassUserDTO> cuDTO = new ArrayList<>();
        for (ClassUser c: tmp) {
            ClassUserDTO existingClassUserDTO = null;
            for (ClassUserDTO cu: cuDTO) {
                if (cu.getClassId() == c.getClass_object().getClassId()&& cu.getUserId() == c.getUser().getUserId()) {
                    existingClassUserDTO = cu;
                    break;
                }
            }

            if (existingClassUserDTO == null) {
                cuDTO.add(new ClassUserDTO(c));
            } else {
                cuDTO.add(existingClassUserDTO);
            }
        }
        ApiResponse apiResponse = new ApiResponse();
        apiResponse.ok(cuDTO);
        return ResponseEntity.ok(apiResponse);
    }
    @GetMapping(value = {"/getAdminAndTrainerByClassId"})
    public ResponseEntity<ApiResponse<List<UserResponse>>> getAdminByClassId(@RequestParam(required = true) int classId) {
        List<ClassUser> tmp = classUserService.getClassUserListByClassId(classId);
        List<ClassUserDTO> cuDTO = new ArrayList<>();

        for (ClassUser c: tmp) {
            ClassUserDTO existingClassUserDTO = null;
            for (ClassUserDTO cu: cuDTO) {
                if (cu.getClassId() == c.getClass_object().getClassId()&& cu.getUserId() == c.getUser().getUserId()) {
                    existingClassUserDTO = cu;
                    break;
                }
            }

            if (existingClassUserDTO == null) {
                cuDTO.add(new ClassUserDTO(c));
            } else {
                cuDTO.add(existingClassUserDTO);
            }
        }
        List<UserResponse> admin = new ArrayList<>();
        for (ClassUserDTO cu:cuDTO) {
            if(cu.getUserType().equalsIgnoreCase("Admin")){
                User us = classUserService.getUserById(cu.getUserId());
                admin.add(new UserResponse(us));
            }
        }
        List<UserResponse> trainer = new ArrayList<>();
        for (ClassUserDTO cu:cuDTO) {
            if(cu.getUserType().equalsIgnoreCase("trainer")){
                User us = classUserService.getUserById(cu.getUserId());
                trainer.add(new UserResponse(us) );
            }
        }
        ClassUserResponse response = new ClassUserResponse();
        if(admin.isEmpty()){
        }
        response.setAdminList(admin);
        response.setTrainerList(trainer);
        ApiResponse apiResponse = new ApiResponse();
        apiResponse.ok(response);
        return ResponseEntity.ok(apiResponse);
    }
    @DeleteMapping(value = {"/DeleteClassUser"})
    public ResponseEntity<ApiResponse<Integer>> DeleteClassUser(@RequestParam int userId, @RequestParam int classId){
        ApiResponse apiResponse = new ApiResponse();
        classUserService.deleteByUserIdAndClassId(userId, classId);
        apiResponse.okv2("Xoa r");
        return ResponseEntity.ok(apiResponse);
    }

}
