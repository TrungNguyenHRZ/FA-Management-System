package com.example.BE.dto.response.userPermission;

import com.example.BE.model.entity.UserPermission;
import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class UserPermissionResponse {

    private String role;
    private String trainingProgram;
    private String syllabus;
    private String material;
    private String userManagement;
    private String className;


    public UserPermissionResponse(UserPermission permission) {
        this.role = permission.getRole();
        this.trainingProgram = permission.getTrainingProgram();
        this.syllabus = permission.getSyllabus();
        this.material = permission.getMaterial();
        this.userManagement = permission.getUserManagement();
        this.className = permission.getClassName();
    }
}
