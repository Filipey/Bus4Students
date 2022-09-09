package com.b4s.backend.api.controllers;

import com.b4s.backend.api.ApiErrors;
import com.b4s.backend.api.exception.ObjectNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class AppControllerAdvice {

    @ExceptionHandler(ObjectNotFoundException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ApiErrors handleObjectNotFoundException(ObjectNotFoundException e) {
        return new ApiErrors(e.getMessage());
    }
}
