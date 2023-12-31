package com.example.BE.security.jwt;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.example.BE.enums.Role;
import com.example.BE.model.entity.User;
import com.example.BE.model.entity.UserPermission;
import com.example.BE.security.UserDetailsImpl;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.stereotype.Component;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Objects;
import java.util.stream.Collectors;

;

@Component
public class JWTUtils {


    public static String generateAccessToken(UserDetailsImpl userDetails) {
        Algorithm algorithm = Algorithm.HMAC256("secret".getBytes());
        return JWT.create()
            .withSubject(userDetails.getUsername())
            .withIssuedAt(new Date())
            .withExpiresAt(new Date(new Date().getTime() + 86400000))
            .withClaim("userInfo", userDetails.getAuthorities().stream().map(GrantedAuthority::getAuthority).collect(Collectors.toList()))
            .withClaim("id", userDetails.getId())
            .sign(algorithm);
    }



    public static String generateAccessToken(UserDetailsImpl userDetails, User user) {
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("dd/MM/yyyy");
        Algorithm algorithm = Algorithm.HMAC256("secret".getBytes());
        return JWT.create()
            .withSubject(userDetails.getUsername())
            .withIssuedAt(new Date())
            .withExpiresAt(new Date(new Date().getTime() + 86400000))
            .withClaim("userInfo", userDetails.getAuthorities().stream().map(GrantedAuthority::getAuthority).collect(Collectors.toList()))
            .withClaim("id", userDetails.getId())
            .withClaim("email", user.getEmail())
            .withClaim("name", user.getName())
            .withClaim("phone", user.getPhone())
            .withClaim("DoB", simpleDateFormat.format(user.getDob()))
            .withClaim("gender", user.getGender())
            .withClaim("status",user.getStatus())
            .withClaim("permission", Objects.equals(user.getPermission().getRole(), Role.SUPER_ADMIN.getRole()) ? "Super admin" : user.getPermission().getRole())
            .sign(algorithm);
    }

    public static String generateRefreshToken(UserDetailsImpl userDetails) {
        Algorithm algorithm = Algorithm.HMAC256("secret".getBytes());
        return JWT.create()
            .withSubject(userDetails.getUsername())
            .withIssuedAt(new Date())
            .withExpiresAt(new Date(new Date().getTime() + 5 * 86400000))
            .sign(algorithm);
    }

}
