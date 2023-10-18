package com.example.BE.dto.request.userPermission;


import com.example.BE.enums.Permission;
import com.example.BE.enums.Role;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class UpdatePermissionRequest {
    @NotNull
    private Role roleUpdate;
    private Permission syllabus;
    private Permission material;
    private Permission className;
    private Permission trainingProgram;
}
