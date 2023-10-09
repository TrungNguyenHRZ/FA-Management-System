package com.example.BE.model.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;
import java.util.List;

@Setter
@Getter
@Entity
@Table(name = "Users")
@Data
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "UserID")
    private int userID;

    @Column(name = "Email")
    private String email;

    @Column(name = "Name")
    private String name;

    @Column(name = "Phone")
    private String phone;

    @Column(name = "Password")
    private String password;

    @Temporal(TemporalType.DATE)
    @Column(name = "DOB")
    private Date dob;

    @Column(name = "Gender")
    private String gender;

    @Column(name = "status")
    private String status;

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
    @JoinColumn(name = "role")
    private UserPermission permission;

    @ManyToMany(fetch = FetchType.LAZY, cascade = {
            CascadeType.DETACH, CascadeType.MERGE,
            CascadeType.PERSIST, CascadeType.REFRESH
    })
    @JoinTable (
            name = "class_user",
            joinColumns = {
                    @JoinColumn(name = "userID"),
            },
            inverseJoinColumns = @JoinColumn(name = "classID")

    )
    private List<Class> classes;



}