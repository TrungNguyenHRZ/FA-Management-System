package com.example.BE.validator;

import com.example.BE.model.dto.response.ClassResponse;
import com.example.BE.model.entity.Class;
import com.microsoft.sqlserver.jdbc.StringUtils;
import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;
@Component
public class ClassValidator implements Validator {
    @Override
    public boolean supports(java.lang.Class<?> clazz) {
        return Class.class.equals(clazz);
    }

    public void validate(Object target, Errors errors) {
        ClassResponse c = (ClassResponse) target;
        if (StringUtils.isEmpty(c.getClassName())) {
            errors.rejectValue("className", "error.className", "Tên lớp không được để trống!");
        }
    }
}
