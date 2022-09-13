package com.b4s.backend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import springfox.documentation.builders.ApiInfoBuilder;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.*;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spi.service.contexts.SecurityContext;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

import java.util.ArrayList;
import java.util.List;

@Configuration
@EnableSwagger2
public class SwaggerConfig {

    @Bean
    public Docket docket() {
        return new Docket(DocumentationType.SWAGGER_2)
                .useDefaultResponseMessages(false)
                .select()
                .apis(RequestHandlerSelectors.basePackage("com.b4s.backend.api.controllers"))
                .paths(PathSelectors.any())
                .build()
                .securityContexts(List.of(securityContext()))
                .securitySchemes(List.of(apiKey()))
                .apiInfo(apiInfo());
    }

    private ApiKey apiKey() {
        return new ApiKey("JWT", "Authorization", "headers");
    }

    private ApiInfo apiInfo() {
        return new ApiInfoBuilder()
                .title("B4S API")
                .description("API para o projeto Bus4Students")
                .version("1.0")
                .contact(filipeContact())
                .build();
    }

    private SecurityContext securityContext() {
        return SecurityContext.builder()
                .securityReferences(defaultAuth())
                .forPaths(PathSelectors.any())
                .build();
    }

    private List<SecurityReference> defaultAuth() {
        AuthorizationScope authorizationScope = new AuthorizationScope("global", "accessEverything");

        AuthorizationScope[] scopes = new AuthorizationScope[1];
        scopes[0] = authorizationScope;
        SecurityReference securityReference = new SecurityReference("JWT", scopes);

        List<SecurityReference> securityReferenceList = new ArrayList<>();
        securityReferenceList.add(securityReference);

        return securityReferenceList;
    }


    private Contact filipeContact() {
        return new Contact("Filipe Moura",
                "http://github.com/Filipey",
                "filipeasm18@gmail.com");
    }

    private Contact diogoContact() {
        return new Contact("Diogo Leite",
                "http://github.com/diogoleite87",
                "diogoleite87@gmail.com");
    }

    private Contact vitorContact() {
        return new Contact("Vitor Marques",
                "http://github.com/MarqueVitor",
                "vitor_marquessantos@hotmail.com");
    }
}
