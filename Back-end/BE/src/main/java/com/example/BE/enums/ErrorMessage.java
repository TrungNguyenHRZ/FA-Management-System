package com.example.BE.enums;

import lombok.Getter;

@Getter
public enum ErrorMessage {
    USER_ADMIN_INVALID ("User Super Admin Invalid"),
    USER_EMAIL_EXISTED("Email existed"),
    USER_EMAIL_FORMAT_INCORRECT("Email incorrect format"),
    USER_CREATE_FAIL("Create user fail"),

    USER_PERMISSION_INVALID("User type invalid"),
    USER_DO_NOT_PERMISSION("User do not permission"),

    ;

    private String message;

    ErrorMessage(String message){
        this.message = message;
    }
}
