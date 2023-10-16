package com.example.BE.model.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;


import org.hibernate.annotations.GenericGenerator;

import lombok.Data;
// import java.util.UUID;


@Entity
@Table(name = "Training_Content")
@Data
public class TrainingContent {


	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "content_id")
	private int contentId;

	@Column(name = "content")
	private String content;


    @Column(name = "learning_objective")
    private String learningObjective;

    @Column(name = "delivery_type")
    private String deliveryType;


	@Column(name = "Duration")
	private int duration;


    @Column(name = "Training_Format")
    private String trainingFormat;

    @Column(name = "note")
    private String note;

    @ManyToOne
    @JoinColumn(name = "unit_code")
    private TrainingUnit unitCode;

	@OneToMany(mappedBy = "content_id")
	List<LearningObject> learning_objects;

}
