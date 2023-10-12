package com.example.BE.security;

import com.example.BE.enums.ErrorMessage;
import com.example.BE.handle.BusinessException;
import org.apache.commons.lang3.StringUtils;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;

import java.util.Objects;

public class SecurityUtils {
    public static String getUsernameAuth() {
        SecurityContext securityContext = SecurityContextHolder.getContext();
        if (Objects.isNull(securityContext) || Objects.isNull(securityContext.getAuthentication()) || StringUtils.isBlank(securityContext.getAuthentication().getName())) {
            throw new BusinessException(ErrorMessage.USER_AUTHORIZATION_FAILED);
        }
        return securityContext.getAuthentication().getName();
    }
}
