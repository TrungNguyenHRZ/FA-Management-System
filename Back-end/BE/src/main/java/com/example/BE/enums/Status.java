package com.example.BE.enums;

public enum Status {

    ACTIVE("ACTIVE"),
    IN_ACTIVE("")

    ;

    private String status;

    Status(String status) {
        this.status = status;
    }

    public String getStatus() {
        return this.status;
    }
}