package com.b4s.backend.api.controllers;

import com.b4s.backend.api.dto.StudentResponseDTO;
import com.b4s.backend.domain.School;
import com.b4s.backend.services.SchoolService;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/school")
public class SchoolController {

    private final SchoolService schoolService;

    public SchoolController(SchoolService schoolService) {
        this.schoolService = schoolService;
    }

    @GetMapping
    @ApiOperation("Get all Schools")
    @ApiResponses({
            @ApiResponse(code = 200, message = "Ok"),
            @ApiResponse(code = 404, message = "No Schools found")
    })
    @ResponseStatus(HttpStatus.OK)
    public List<School> getAll() {
        return schoolService.getAll();
    }

    @GetMapping("/active")
    @ApiOperation("Get all active Schools")
    @ApiResponses({
            @ApiResponse(code = 200, message = "Ok"),
            @ApiResponse(code = 404, message = "No schools found")
    })
    @ResponseStatus(HttpStatus.OK)
    public List<School> getActiveSchools() {
        return schoolService.getActiveSchools();
    }

    @GetMapping("/notactive")
    @ApiOperation("Get all no active Schools")
    @ApiResponses({
            @ApiResponse(code = 200, message = "Ok"),
            @ApiResponse(code = 404, message = "No Schools found")
    })
    @ResponseStatus(HttpStatus.OK)
    public List<School> getNotActiveSchools() {
        return schoolService.getNotActiveSchools();
    }

    @GetMapping("/{name}")
    @ApiOperation("Get School by name")
    @ApiResponses({
            @ApiResponse(code = 200, message = "Ok"),
            @ApiResponse(code = 404, message = "School not found")
    })
    @ResponseStatus(HttpStatus.OK)
    public School getSchoolByName(@PathVariable String name) {
        return schoolService.getByName(name);
    }

    @GetMapping("/campus/{campus}")
    @ApiOperation("Get School by campus like")
    @ApiResponses({
            @ApiResponse(code = 200, message = "Ok"),
            @ApiResponse(code = 404, message = "School not found")
    })
    @ResponseStatus(HttpStatus.OK)
    public School getSchoolByCampus(@PathVariable String campus) {
        return schoolService.getByCampus(campus);
    }

    @GetMapping("/student/{campus}")
    @ApiOperation("Get students of a campus")
    @ApiResponses({
            @ApiResponse(code = 200, message = "Ok"),
            @ApiResponse(code = 404, message = "Campus not found"),
            @ApiResponse(code = 404, message = "No Students in campus")
    })
    @ResponseStatus(HttpStatus.OK)
    public List<StudentResponseDTO> getStudentsFromCampus(@PathVariable String campus) {
        return schoolService.getStudentsFromCampus(campus);
    }

    @GetMapping("/total")
    @ApiOperation("Get total of Schools in Database")
    @ApiResponse(code = 200, message = "Ok")
    @ResponseStatus(HttpStatus.OK)
    public Long getTotalSchools() {
        return schoolService.getTotalSchools();
    }

    @PostMapping
    @ApiOperation("Create new School")
    @ApiResponses({
            @ApiResponse(code = 201, message = "Created"),
            @ApiResponse(code = 400, message = "Authorization Error")
    })
    @ResponseStatus(HttpStatus.CREATED)
    public void insert(@RequestBody School school) {
        schoolService.insert(school);
    }

    @PostMapping("/student/{studentCpf}")
    @ApiOperation("Insert a Student into a School")
    @ApiResponses({
            @ApiResponse(code = 201, message = "Created"),
            @ApiResponse(code = 400, message = "Authorization Error")
    })
    @ResponseStatus(HttpStatus.CREATED)
    public void insertStudentInSchool(@PathVariable String studentCpf, @RequestBody String campus) {
        schoolService.insertStudentInSchool(studentCpf, campus);
    }

    @PutMapping("/{campus}")
    @ApiOperation("Update a School by campus")
    @ApiResponses({
            @ApiResponse(code = 204, message = "Updated"),
            @ApiResponse(code = 400, message = "Authorization Error"),
            @ApiResponse(code = 404, message = "School not found")
    })
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void update(@PathVariable String campus, @RequestBody School school) {
        schoolService.update(school, campus);
    }

    @DeleteMapping("/campus/{campus}")
    @ApiOperation("Delete School by campus")
    @ApiResponses({
            @ApiResponse(code = 204, message = "Deleted"),
            @ApiResponse(code = 400, message = "Authorization Error"),
            @ApiResponse(code = 404, message = "School not found")
    })
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteByCampus(@PathVariable String campus) {
        schoolService.deleteByCampus(campus);
    }

    @DeleteMapping("/{name}")
    @ApiOperation("Delete School by name")
    @ApiResponses({
            @ApiResponse(code = 204, message = "Deleted"),
            @ApiResponse(code = 400, message = "Authorization Error"),
            @ApiResponse(code = 404, message = "School not found")
    })
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteByName(@PathVariable String name) {
        schoolService.deleteByName(name);
    }

    @DeleteMapping("/student/{studentCpf}")
    @ApiOperation("Remove Student from School")
    @ApiResponses({
            @ApiResponse(code = 204, message = "Deleted"),
            @ApiResponse(code = 400, message = "Authorization Error"),
            @ApiResponse(code = 404, message = "School not found")
    })
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void removeStudentFromCampus(@PathVariable String studentCpf, @RequestBody String campus) {
        schoolService.removeStudentFromCampus(studentCpf, campus);
    }
}
