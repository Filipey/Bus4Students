package com.b4s.backend.api.controllers;

import com.b4s.backend.domain.Student;
import com.b4s.backend.services.StudentService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/student")
public class StudentController {

    private final StudentService studentService;

    public StudentController(StudentService studentService) {
        this.studentService = studentService;
    }

    @GetMapping("{cpf}")
    @ResponseStatus(HttpStatus.OK)
    public Student getStudentByCpf(@PathVariable String cpf) {
        return studentService.getStudentByCpf(cpf);
    }
}
