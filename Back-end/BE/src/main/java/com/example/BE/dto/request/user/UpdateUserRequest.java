package com.example.BE.dto.request.user;


import com.example.BE.enums.Role;
import jakarta.validation.constraints.*;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class UpdateUserRequest {
    private int id;

    private String name;
    private String phone;
    private String dob; // dd/MM/yyyy
    private Boolean genderTrueMale; // true : male / false: female
    private Boolean status;
    private int userAdminId = 1;
}
