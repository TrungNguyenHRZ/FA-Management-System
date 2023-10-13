package com.example.BE.dto.request.user;


import com.example.BE.enums.Role;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class GantPermissionUserRequest {
    @JsonIgnore
    private int id;
    private Role newPermission;
}
