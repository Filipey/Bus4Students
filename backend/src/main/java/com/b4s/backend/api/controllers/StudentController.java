package com.b4s.backend.api.controllers;

import com.b4s.backend.domain.Student;
import com.b4s.backend.services.StudentService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import org.springframework.http.HttpStatus;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/student")
@Api("Students API")
public class StudentController {

    private final StudentService studentService;

    public StudentController(StudentService studentService) {
        this.studentService = studentService;
    }

    @GetMapping("{cpf}")
    @ApiResponses({
            @ApiResponse(code = 200, message = "Student found"),
            @ApiResponse(code = 404, message = "Student not found")
    })
    @ResponseStatus(HttpStatus.OK)
    public Student getStudentByCpf(@PathVariable String cpf) {
        return studentService.getStudentByCpf(cpf);
    }

    @PostMapping
    @ApiResponses({
            @ApiResponse(code = 201, message = "Student created"),
            @ApiResponse(code = 400, message = "Authorization Error")
    })
    @ResponseStatus(HttpStatus.CREATED)
    public Student insert(@RequestBody @Validated Student student) {
        studentService.create(student);

        return studentService.getStudentByCpf(student.getCpf());
    }

    @DeleteMapping("{cpf}")
    @ApiResponses({
            @ApiResponse(code = 204, message = "Student deleted"),
            @ApiResponse(code = 400, message = "Authorization Error"),
            @ApiResponse(code = 404, message = "Student not found")
    })
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable String cpf) {
        studentService.delete(cpf);
    }
}
