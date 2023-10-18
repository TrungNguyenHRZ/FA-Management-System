package com.example.BE.model.dto;

import com.example.BE.model.entity.ClassUser;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class ClassUserDTO {
    protected int userId;
    protected int classId;
    protected String userType;

    public ClassUserDTO() {
    }

    public ClassUserDTO(ClassUser cu) {
        this.userId = cu.getUser().getUserId();
        this.classId = cu.getClass_object().getClassId();
        this.userType = cu.getUserType();
    }

//    public ClassUserDTO(ClassUser cu) {
//        ClassUserDTO classUserDTO = new ClassUserDTO();
//        classUserDTO.setUserId(cu.getUser().getUserId());
//        classUserDTO.setClassId(cu.getClass_object().getClassId());
//        classUserDTO.setUserType(cu.getUserType());
//    }

}
