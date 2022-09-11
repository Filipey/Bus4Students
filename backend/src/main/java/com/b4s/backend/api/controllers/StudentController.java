package com.b4s.backend.api.controllers;

import com.b4s.backend.domain.Student;
import com.b4s.backend.services.StudentService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/student")
@Api("Students API")
public class StudentController {

    private final StudentService studentService;
    private final ModelMapper modelMapper;

    public StudentController(StudentService studentService, ModelMapper modelMapper) {
        this.studentService = studentService;
        this.modelMapper = modelMapper;
    }

    @GetMapping("/{cpf}")
    @ApiOperation("Get a student by his CPF")
    @ApiResponses({
            @ApiResponse(code = 200, message = "Student found"),
            @ApiResponse(code = 404, message = "Student not found")
    })
    @ResponseStatus(HttpStatus.OK)
    public Student getStudentByCpf(@PathVariable String cpf) {
        return studentService.getStudentByCpf(cpf);
    }

    @PostMapping
    @ApiOperation("Insert a new Student")
    @ApiResponses({
            @ApiResponse(code = 201, message = "Student created"),
            @ApiResponse(code = 400, message = "Authorization Error")
    })
    @ResponseStatus(HttpStatus.CREATED)
    public Student insert(@RequestBody @Validated Student student) {
        studentService.create(student);

        return studentService.getStudentByCpf(student.getCpf());
    }

    @DeleteMapping("/{cpf}")
    @ApiOperation("Delete a student")
    @ApiResponses({
            @ApiResponse(code = 204, message = "Student deleted"),
            @ApiResponse(code = 400, message = "Authorization Error"),
            @ApiResponse(code = 404, message = "Student not found")
    })
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable String cpf) {
        studentService.delete(cpf);
    }

    @GetMapping
    @ApiOperation("Get all Students")
    @ApiResponses({
            @ApiResponse(code = 200, message = "Students found"),
            @ApiResponse(code = 400, message = "Authorization Error"),
            @ApiResponse(code = 404, message = "There is no Students")
    })
    @ResponseStatus(HttpStatus.OK)
    public List<Student> getAllStudents() {
        return studentService.getAllStudents();
    }

    @PostMapping("{cpf}")
    @ApiOperation("Set a bus to a student")
    @ApiResponses({
            @ApiResponse(code = 201, message = "Succesful delegated"),
            @ApiResponse(code = 400, message = "Authorization Error"),
            @ApiResponse(code = 404, message = "Student not found")
    })
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delegateNewBus(@PathVariable String cpf, @RequestBody String plate) {
        studentService.delegateNewBus(cpf, plate);
    }
}
