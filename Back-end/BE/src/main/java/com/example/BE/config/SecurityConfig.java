package com.example.BE.config;


import com.example.BE.security.CustomAuthorizationFilter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;


//@EnableWebSecurity
//@EnableGlobalMethodSecurity(jsr250Enabled = true)
//@RequiredArgsConstructor

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .csrf(AbstractHttpConfigurer::disable)
            .authorizeHttpRequests((authz) -> authz
                    .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()
                    .requestMatchers(
                        "/api-docs",
                        "/swagger-ui/**",
                        "/swagger-ui",
                        "/user/login",
                        "/dev/**",
                        "/user/create-sp-admin",
                        "user/view/**"
                    ).permitAll()
                    .requestMatchers(
                        "/user/**",
                        "/user-permission/**"
                    )
                    .authenticated()
//                .anyRequest().authenticated()
                    .anyRequest().permitAll()
            )
            .addFilterBefore(new CustomAuthorizationFilter(), UsernamePasswordAuthenticationFilter.class)
        ;
        return http.build();
    }
}
