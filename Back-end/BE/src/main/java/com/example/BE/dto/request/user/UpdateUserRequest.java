package com.example.BE.dto.request.user;


import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class UpdateUserRequest {
    @JsonIgnore
    private int id;

    private String name;
    private String phone;
    private String dob; // dd/MM/yyyy
    private Boolean genderTrueMale; // true : male / false: female
    private Boolean status;
}
