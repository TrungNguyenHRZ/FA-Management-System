package com.example.BE.dto.request.user;


import com.example.BE.enums.Role;
import com.example.BE.enums.Status;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.Date;

@Getter
@Setter
@ToString
public class CreateUserRequest {
    @NotNull
    private Role userType;
    @NotBlank
    private String name;
    @Email
    @NotBlank
    private String email;
    @NotBlank
    private String phone;
    @NotBlank
    private Date dob; // dd/MM/yyyy
    @NotNull
    private boolean genderTrueMale; // true : male / false: female
    private Status status;
}
