package com.b4s.backend.services.impl;

import com.b4s.backend.api.exception.ObjectNotFoundException;
import com.b4s.backend.domain.Person;
import com.b4s.backend.repositories.PersonRepository;
import com.b4s.backend.services.PersonService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
public class PersonServiceImpl implements PersonService {

    private final PersonRepository personRepository;

    public PersonServiceImpl(PersonRepository personRepository) {
        this.personRepository = personRepository;
    }

    @Override
    @Transactional(readOnly = true)
    public Person getPersonByCpf(String cpf) {
        return personRepository
                .findByCpf(cpf)
                .orElseThrow(() -> new ObjectNotFoundException("Invalid CPF."));
    }
}
