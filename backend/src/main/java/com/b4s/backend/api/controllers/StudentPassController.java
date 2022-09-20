package com.b4s.backend.api.controllers;

import com.b4s.backend.api.dto.StudentPassDTO;
import com.b4s.backend.domain.StudentPass;
import com.b4s.backend.services.impl.StudentPassServiceImpl;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/pass")
public class StudentPassController {

    private final StudentPassServiceImpl studentPassServiceImpl;

    public StudentPassController(StudentPassServiceImpl studentPassServiceImpl) {
        this.studentPassServiceImpl = studentPassServiceImpl;
    }

    @GetMapping
    @ApiOperation("Get all StudentPasses")
    @ApiResponses({
            @ApiResponse(code = 200, message = "Ok"),
            @ApiResponse(code = 404, message = "Theres no StudentPasses"),
            @ApiResponse(code = 400, message = "Authorization error")
    })
    @ResponseStatus(HttpStatus.OK)
    public List<StudentPass> getAll() {
        return studentPassServiceImpl.getAll();
    }

    @GetMapping("/{studentCpf}")
    @ApiOperation("Get a Student pass by his owner")
    @ApiResponses({
            @ApiResponse(code = 200, message = "Ok"),
            @ApiResponse(code = 404, message = "There is no owner"),
            @ApiResponse(code = 400, message = "Authorization error")
    })
    @ResponseStatus(HttpStatus.OK)
    public StudentPass getByOwner(@PathVariable String studentCpf) {
        return studentPassServiceImpl.getByOwner(studentCpf);
    }

    @PostMapping("/{adminCpf}")
    @ApiOperation("Create a new StudentPass")
    @ApiResponses({
            @ApiResponse(code = 201, message = "Created"),
            @ApiResponse(code = 400, message = "Authorization error")
    })
    @ResponseStatus(HttpStatus.CREATED)
    public void insert(@RequestBody StudentPassDTO studentPassDTO, @PathVariable String adminCpf) {
        studentPassServiceImpl.insert(studentPassDTO, adminCpf);
    }

    @DeleteMapping("/{id}")
    @ApiOperation("Delete a StudentPass")
    @ApiResponses({
            @ApiResponse(code = 204, message = "Deleted"),
            @ApiResponse(code = 400, message = "Authorization Error"),
            @ApiResponse(code = 404, message = "StudentPass not found")
    })
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Long id) {
        studentPassServiceImpl.delete(id);
    }


    @PutMapping("/{id}")
    @ApiOperation("Update a StudentPass")
    @ApiResponses({
            @ApiResponse(code = 204, message = "Updated"),
            @ApiResponse(code = 400, message = "Authorization Error")
    })
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void update(@RequestBody StudentPassDTO studentPassDTO, @PathVariable Long id) {
        studentPassServiceImpl.update(studentPassDTO, id);
    }
}
