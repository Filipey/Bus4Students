package com.b4s.backend.api.controllers;

import com.b4s.backend.api.dto.UserDTO;
import com.b4s.backend.api.dto.UserResponseDTO;
import com.b4s.backend.domain.Person;
import com.b4s.backend.domain.User;
import com.b4s.backend.services.StudentService;
import com.b4s.backend.services.impl.UserServiceImpl;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/v1/user")
public class UserController {

    private final UserServiceImpl userService;
    private final StudentService studentService;

    public UserController(UserServiceImpl userService, StudentService studentService) {
        this.userService = userService;
        this.studentService = studentService;
    }

    @PostMapping
    @ApiOperation("Create a new User login")
    @ApiResponses({
            @ApiResponse(code = 201, message = "Created"),
            @ApiResponse(code = 404, message = "User with CPF already exists")
    })
    @ResponseStatus(HttpStatus.CREATED)
    public void save(@RequestBody User user) {
        userService.save(user);
    }

    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public Person getUser(@RequestBody UserDTO user) {
        return userService.getPersonByLogin(user);
    }

    @GetMapping("/{cpf}")
    @ResponseStatus(HttpStatus.OK)
    public Optional<UserResponseDTO> getUserData(@PathVariable String cpf) {
        return userService.getUserByCpf(cpf);
    }
}
