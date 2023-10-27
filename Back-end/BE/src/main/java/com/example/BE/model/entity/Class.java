package com.example.BE.model.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

@Entity
@Setter
@Getter
@Table(name = "Classes")
@Data
public class Class implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "classId")
    private int classId;

    @Column(name = "ClassName")
    private String className;

    @Column(name = "ClassCode")
    private String classCode;

	@Column(name = "Duration")
	private int duration;

    @Column(name = "Status")
    private String status;

    @Column(name = "Location")
    private String location;

    @Column(name = "FSU")
    private String fsu;

    @Temporal(TemporalType.DATE)
    @Column(name = "Start_Date")
    private Date start_date;

    @Temporal(TemporalType.DATE)
    @Column(name = "End_Date")
    private Date end_date;

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

    @JsonIgnore
    @OneToMany(cascade = CascadeType.ALL,mappedBy = "class_object")
    private List<ClassUser> classUserList;

    @ManyToOne
    @JoinColumn(name = "program_id")
    private TrainingProgram program_class;

}
