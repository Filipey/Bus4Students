package com.b4s.backend.repositories;

import com.b4s.backend.domain.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface StudentRepository extends JpaRepository<Student, String> {

    @Query(nativeQuery = true, value = "SELECT * FROM pessoa p INNER JOIN estudante e on p.cpf = :cpf AND e.fk_pessoa_cpf = :cpf")
    Optional<Student> getStudentByCpf(@Param("cpf") String cpf);

    @Modifying
    @Query(nativeQuery = true, value =
            "INSERT INTO pessoa(cpf, nome, endereco) VALUES (:#{#student.cpf}, :#{#student.name}, :#{#student.address});" +
            "INSERT INTO estudante(comprovante_de_matricula_, fk_pessoa_cpf) VALUES(:#{#student.enrollment}, :#{#student.cpf}) "
    )
    void create(@Param("student") Student student);

    @Query(nativeQuery = true, value =
            "DELETE FROM pessoa WHERE (cpf = :cpf);" + "DELETE FROM estudante WHERE fk_pessoa_cpf = :cpf"
    )
    @Modifying
    void delete(@Param("cpf") String cpf);

    @Query(nativeQuery = true, value = "SELECT * FROM pessoa p INNER JOIN estudante e on p.cpf = e.fk_pessoa_cpf")
    List<Student> getAllStudents();
}
