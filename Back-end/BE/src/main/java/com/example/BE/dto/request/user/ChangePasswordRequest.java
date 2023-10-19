package com.example.BE.dto.request.user;

import com.fasterxml.jackson.annotation.JsonIgnore;
import io.swagger.v3.oas.annotations.Hidden;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class ChangePasswordRequest {
    @Hidden
    @JsonIgnore
    private int id;
    private String email;
    private String newPass;
}
