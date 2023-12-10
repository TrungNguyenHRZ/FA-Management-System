package com.example.BE.model.dto.response;

import com.example.BE.dto.response.user.UserResponse;
import com.example.BE.model.dto.ClassUserDTO;
import lombok.Getter;
import lombok.Setter;

import java.util.List;
@Getter
@Setter
public class ClassUserResponse {
    protected List<UserResponse> AdminList;
    protected List<UserResponse> TrainerList;
    public ClassUserResponse() {
    }

}
