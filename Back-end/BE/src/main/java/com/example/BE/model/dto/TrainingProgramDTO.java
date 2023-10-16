package com.example.BE.model.dto;

import com.example.BE.model.entity.User;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
public class TrainingProgramDTO {
    protected int training_code;
    protected String training_name;
    protected String training_topic_code;
    protected String status;
    protected String start_time;
    protected int duration;
    protected String create_by;
    protected Date createdDate;
    protected Date modified_date;
    protected String modified_by;
    protected User user_training;
}
