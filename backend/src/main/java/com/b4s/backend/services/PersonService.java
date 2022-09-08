package com.b4s.backend.services;

import com.b4s.backend.domain.Person;

import java.util.Optional;

public interface PersonService {
    Person getPersonByCpf(String cpf);
}
