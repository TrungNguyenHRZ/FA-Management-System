package com.example.BE.handle;

import com.example.BE.enums.ErrorMessage;
import org.springframework.context.MessageSource;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

import java.util.Locale;

public class BusinessException extends RuntimeException {

    private String message;


    private BusinessException( String message) {
        super(message);
        this.message = message;
    }


    public BusinessException(ErrorMessage message) {
        super(message.getMessage());
        this.message = message.getMessage();
    }

}
