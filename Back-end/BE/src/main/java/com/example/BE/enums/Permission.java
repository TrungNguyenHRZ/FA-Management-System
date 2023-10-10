package com.example.BE.enums;

public enum Permission {
    ACCESS_DENIED("Access_Denied"),
    VIEW("View"),
    MODIFY("Modify"),
    CREATE("Create"),
    FULL_ACCESS("Full_Access");


    private String permission;

    Permission(String permission) {
        this.permission = permission;
    }

    public String getPermission() {
        return this.permission;
    }

}
