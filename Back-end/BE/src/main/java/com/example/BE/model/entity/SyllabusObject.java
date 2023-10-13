package com.example.BE.model.entity;

import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name = "Syllabus_Object")
@Data
public class SyllabusObject implements java.io.Serializable {

    @EmbeddedId
    private CompositeSyllabusObjective syllabus_id;


}
