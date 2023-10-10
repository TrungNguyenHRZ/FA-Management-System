package com.example.BE.model.dto;

import com.example.BE.model.entity.TrainingProgram;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Setter
@Getter
public class ClassDTO {
    protected int classID;

    protected String className;

    protected String classCode;

    protected int trainingProgram;

    protected java.util.Date duration;

    protected String status;

    protected String location;

    protected String fsu;

    protected java.util.Date start_date;

    protected java.util.Date end_date;

    protected String create_by;

    protected java.util.Date createdDate;

    protected Date modified_date;

    protected String modified_by;

    protected TrainingProgram program_class;
}