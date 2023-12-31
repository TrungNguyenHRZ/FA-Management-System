package com.example.BE.model.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;
import java.util.List;

@Entity
@Table(name = "Training_Unit")
@Data
public class TrainingUnit {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "unit_code")
    private int unit_code;

    @Column(name = "unit_name")
    private String unit_name;

    @Column(name = "day_number")
    private int day_number;

	@ManyToOne
	@JoinColumn(name="topic_code")
	private Syllabus unit_topic_code;

    @JsonIgnore
	@OneToMany(mappedBy="unitCode")
	private List<TrainingContent> training_content;
}
