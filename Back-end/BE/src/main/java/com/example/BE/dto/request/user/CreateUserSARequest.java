package com.example.BE.dto.request.user;

import com.example.BE.enums.Role;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class CreateUserSARequest {
    @NotBlank
    private String name;
    @Email
    @NotBlank
    private String email;
    @NotBlank
    private String phone;
    @NotBlank
    private String dob; // dd/MM/yyyy
    @NotNull
    private boolean genderTrueMale; // true : male / false: female
    private boolean status;
    @NotBlank
    private String password;
}
