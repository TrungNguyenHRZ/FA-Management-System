package com.example.BE.model.dto;

import lombok.Getter;
import lombok.Setter;

import java.sql.Date;
@Setter
@Getter
public class ClassDTO {
    protected int classId;
    protected String trainingCode;
    protected String className;
    protected String classCode;
    protected String duration;
    protected String status;
    protected String location;
    protected String FSU;
    protected Date startDate;
    protected Date endDate;
    protected String createdBy;
    protected Date createDate;
    protected String modifiedBy;
    protected Date modifiedDate;
}