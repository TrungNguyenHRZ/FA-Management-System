package com.example.BE.config;

import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.security.SecurityScheme;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OpenApiConfig {

    public final static String SERCURITY_BEARER = "Bearer Auth";
    private String appVersion = "v1.1.1";

    @Bean
    public OpenAPI customOpenAPI() {
        return new OpenAPI().info(new Info().title("API Documentation").version(appVersion)
                .description("API documentation for my Spring Boot project"))
            .components(new Components()
                .addSecuritySchemes(SERCURITY_BEARER,
                    new SecurityScheme()
                        .name(SERCURITY_BEARER)
                        .type(SecurityScheme.Type.HTTP)
                        .scheme("bearer")
                        .bearerFormat("JWT")
                )
            );
    }

}