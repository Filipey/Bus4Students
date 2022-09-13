package com.b4s.backend.api;

import lombok.Getter;

import java.util.Arrays;
import java.util.List;

public class ApiErrors {

    @Getter
    private List<String> errors;

    public ApiErrors(String errorMessage) {
        this.errors = Arrays.asList(errorMessage);
    }

    public ApiErrors(List<String> errors) {
        this.errors = errors;
    }
}
