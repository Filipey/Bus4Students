package com.b4s.backend.repositories;

import com.b4s.backend.domain.Person;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface PersonRepository extends JpaRepository<Person, String> {

    @Query(nativeQuery = true, value = "SELECT * FROM PESSOA p where p.cpf = :cpf")
    Optional<Person> findByCpf(@Param("cpf") String cpf);
}
