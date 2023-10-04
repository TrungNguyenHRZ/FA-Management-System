package com.example.BE.model.entity;

import java.util.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import lombok.Data;

@Entity
@Table(name = "Classes")
@Data
public class Class {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ClassID")
    private int classID;

	@Column(name = "ClassName")
	private String className;

	@Column(name = "ClassCode")
	private String classCode;

	@Column(name = "Training_Code")
	private String training_code;

	@Temporal(TemporalType.TIME)
	@Column(name = "Duration")
	private Date duration;

	@Column(name = "Status")
	private String status;

	@Column(name="Location")
	private String location;

	@Column(name="FSU")
	private String fsu;

	@Temporal(TemporalType.DATE)
	@Column(name = "Start_Date")
	private String start_date;

	@Temporal(TemporalType.DATE)
	@Column(name = "End_Date")
	private String end_date;

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

	// @OneToMany(mappedBy = "class_object")
    // private Set<ClassUser> userClasses = new HashSet<>();

	@ManyToOne
	@JoinColumn(name="program_id")
	private TrainingProgram program_class;

}
