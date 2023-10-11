package com.example.BE.dto.response.user;


import com.example.BE.model.entity.User;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.text.SimpleDateFormat;
import java.util.Date;

@Getter
@Setter
@ToString
public class LoginResponse {

    private int id;
    private String userType;
    private String name;
    private String email;
    private String address;
    private String dob; // dd/MM/yyyy
    private String gender; // true : male / false: female
    private boolean status;
    private Date createdAt;
    private String createdBy;
    private String phone;
    private String accessToken;

    public LoginResponse(User user, String accessToken) {
        this.id = user.getUserId();
        this.userType = user.getPermission().getRole();
        this.name = user.getName();
        this.email = user.getEmail();
        this.address = user.getCreateBy();
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("dd/MM/yyyy");
        this.dob = simpleDateFormat.format(user.getDob());
        this.gender = user.getGender();
        this.status = user.isStatus();
        this.createdAt = user.getCreatedDate();
        this.createdBy = user.getCreateBy();
        this.phone = user.getPhone();
        this.accessToken = accessToken;
    }
}
