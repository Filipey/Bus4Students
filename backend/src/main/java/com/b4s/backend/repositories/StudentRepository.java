package com.b4s.backend.repositories;

import com.b4s.backend.domain.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface StudentRepository extends JpaRepository<Student, String> {

    @Query(nativeQuery = true, value = "SELECT * FROM pessoa p INNER JOIN estudante e on p.cpf = :cpf AND e.fk_pessoa_cpf = :cpf")
    Optional<Student> getStudentByCpf(@Param("cpf") String cpf);

}
