package com.b4s.backend.api.controllers;

import com.b4s.backend.domain.Person;
import com.b4s.backend.services.PersonService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/person")
public class PersonController {

    private final PersonService personService;

    public PersonController(PersonService personService) {
        this.personService = personService;
    }

    @GetMapping("/{cpf}")
    @ResponseStatus(HttpStatus.OK)
    public Person getByCpf(@PathVariable String cpf) {
        return personService.getPersonByCpf(cpf);
    }
}
