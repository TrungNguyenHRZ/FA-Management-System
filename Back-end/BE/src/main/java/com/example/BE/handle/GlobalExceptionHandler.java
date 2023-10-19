package com.example.BE.handle;

import com.example.BE.exception.NotFoundException;
import com.example.BE.model.dto.ApiResponse;
import com.example.BE.model.dto.StatusEnum;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(Exception.class)
    @ResponseBody
    public ApiResponse handleException(Exception ex) {
        ApiResponse apiResponse = new ApiResponse();
        apiResponse.error(ex.getMessage());
        return apiResponse;
    }

    @ExceptionHandler(NotFoundException.class)
    @ResponseBody
    public ApiResponse handleNotFoundException(NotFoundException ex) {
        ApiResponse apiResponse = new ApiResponse();
        apiResponse.error(ex.getMessage());
        return apiResponse;
    }


    @ExceptionHandler(BusinessException.class)
    @ResponseBody
    public ResponseEntity<?> handleBusinessException(BusinessException ex) {
        ApiResponse  apiResponse = new ApiResponse();
        apiResponse.error(ex.getMessage());
        return new ResponseEntity<>(apiResponse, HttpStatus.BAD_REQUEST);
    }


    @ExceptionHandler(UnauthorizeException.class)
    @ResponseBody
    public ResponseEntity<?> handleUnauthorizeException(UnauthorizeException ex) {
        ApiResponse  apiResponse = new ApiResponse();
        apiResponse.setMessage(ex.getMessage());
        apiResponse.setStatus(StatusEnum.ERROR);
        return new ResponseEntity<>(apiResponse, HttpStatus.UNAUTHORIZED);
    }

}

