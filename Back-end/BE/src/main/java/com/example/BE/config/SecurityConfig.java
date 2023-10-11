package com.example.BE.config;


import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;


//@EnableWebSecurity
//@EnableGlobalMethodSecurity(jsr250Enabled = true)
//@RequiredArgsConstructor

@Configuration
public class SecurityConfig {

//    @Override
//    protected void configure(HttpSecurity http) throws Exception {
//        http.csrf().disable();
//        http.authorizeRequests().antMatchers(
//                "/api/v1/user/login",
//                "/api-docs",
//                "/swagger-ui",
//                "/swagger-ui/**").permitAll();
//
//        http.authorizeRequests().anyRequest().authenticated();
//        http.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);
////        http.addFilterBefore(new CustomAuthorizationFilter(), UsernamePasswordAuthenticationFilter.class);
//
//    }


    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .csrf().disable()
            .authorizeHttpRequests((authz) -> authz
                    .requestMatchers(
                        "/api-docs",
                        "/swagger-ui/**",
                        "/swagger-ui",
                        "/user/login",
                        "/user/create"
                    ).permitAll()
                .anyRequest().authenticated()
            )
        ;
        return http.build();
    }
}
