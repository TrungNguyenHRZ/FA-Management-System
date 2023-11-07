package com.example.BE.model.dto.response;

import com.example.BE.model.entity.ClassUser;

public class ClassUserRespone {
    protected int userId;
    protected int classId;
    protected String userType;

//    public ClassUserRespone() {
//    }

    public ClassUserRespone(ClassUser cu) {
        this.userId = cu.getUser().getUserId();
        this.classId = cu.getClass_object().getClassId();
        this.userType = cu.getUserType();
    }
}
