package com.example.BE.model.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;
import java.time.LocalTime;
import java.util.Date;

@Entity
@Setter
@Getter
@Table(name = "Schedule")
@Data
public class Schedule implements Serializable{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "schedule_id")
    private int schedule_id;

    @Column(name = "start_time")
    private LocalTime startTime;

    @Column(name = "end_time")
    private LocalTime endTime;

    @Temporal(TemporalType.DATE)
    @Column(name = "day")
    private Date day;

    @ManyToOne
    @JoinColumn(name = "class_id")
    private Class clazz;

}
