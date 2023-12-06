package com.example.BE.model.dto.response;

import com.example.BE.model.dto.ClassUserDTO;
import lombok.Getter;
import lombok.Setter;

import java.util.List;
@Getter
@Setter
public class ClassUserResponse {
    protected List<ClassUserDTO> AdminList;
    protected List<ClassUserDTO> TrainerList;
    public ClassUserResponse() {
    }

}
