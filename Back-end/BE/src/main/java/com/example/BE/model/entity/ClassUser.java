package com.example.BE.model.entity;

import com.example.BE.model.dto.ClassUserDTO;
import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;

@Entity
@Table(name = "UserClass")
@Data
@Getter
@Setter
public class ClassUser implements Serializable {

    @EmbeddedId
    private ClassUserId id;

    @ManyToOne(cascade = CascadeType.ALL)
    @MapsId(value = "userId")
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne(cascade = CascadeType.ALL)
    @MapsId(value = "classID")
    @JoinColumn(name = "classId")
    private Class class_object;

    @Column(name = "UserType")
    private String userType;
    public ClassUser(){

    }
    public ClassUser(int userId,int classId, String userType) {
        this.setId(new ClassUserId(userId,classId));
        this.userType = userType;
    }

}
