package com.example.BE.model.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.io.Serializable;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;


import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "Training_Program")
@Data
@Setter
@Getter
public class TrainingProgram implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "training_program_code")
    private int training_code;

    @Column(name = "training_name")
    private String training_name;

    @Column(name = "training_topic_code")
    private String training_topic_code;

    @Column(name = "Status")
    private String status;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "Start_Time")
    private String start_time;

	@Column(name = "Duration")
	private int duration;

    @Column(name = "Create_By")
    private String create_by;

    @Temporal(TemporalType.DATE)
    @Column(name = "Create_Date")
    private Date createdDate;

    @Temporal(TemporalType.DATE)
    @Column(name = "Modified_Date")
    private Date modified_date;

    @Column(name = "Modified_By")
    private String modified_by;

    @ManyToOne
    @JoinColumn(name = "userid")
    private User user_training;

    @OneToMany(mappedBy = "program")
    List<TrainingProgramSyllabus> syllabus;

    @OneToMany(mappedBy = "program_class")
    List<Class> training_class;


}
