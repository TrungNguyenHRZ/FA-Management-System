package com.example.BE.model.entity;

import jakarta.persistence.Embeddable;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.*;

import java.io.Serializable;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode
@Embeddable
public class ClassUserId implements Serializable {
    private static final long serialVersionUID = 1L;
//    @ManyToOne
//    @JoinColumn(name = "userid")
//    private User user;
//
//
//    @ManyToOne
//    @JoinColumn(name = "classid")
//    private Class class_object;
    private int classId;

    private int userId;
}
