package com.example.BE.model.dto.request;

import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
public class TrainingProgramRequest {
    private int training_code;
    private String training_name;
    private String start_time;
    private int duration;
    private String training_topic_code;
    private String status;
    private String create_by;
    private Date createdDate;
    private Date modified_date;
    private String modified_by;
}
