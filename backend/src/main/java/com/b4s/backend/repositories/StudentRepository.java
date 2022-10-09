package com.b4s.backend.repositories;

import com.b4s.backend.api.dto.StudentDTO;
import com.b4s.backend.domain.Student;
import org.postgresql.util.PSQLException;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface StudentRepository extends JpaRepository<Student, String>{

    @Query(nativeQuery = true, value = "" +
            "SELECT p.cpf, p.nome, p.endereco, e.comprovante_de_matricula " +
            "FROM pessoa p, estudante e " +
            "WHERE p.cpf = :cpf AND e.cpf = :cpf")
    Optional<Student> getStudentByCpf(@Param("cpf") String cpf) throws PSQLException;

    @Query(nativeQuery = true, value = "SELECT COUNT(*) FROM pessoa p, estudante e WHERE p.cpf = e.cpf")
    Long getTotalStundents();

    @Modifying
    @Query(nativeQuery = true, value =
            "INSERT INTO pessoa(cpf, nome, endereco) " +
                    "VALUES (:#{#student.cpf}, :#{#student.name}, :#{#student.address});" +
            "INSERT INTO estudante(comprovante_de_matricula, cpf) " +
                    "VALUES(:#{#student.enrollment}, :#{#student.cpf}) "
    )
    void create(@Param("student") Student student) throws PSQLException;

    @Query(nativeQuery = true, value =
            "DELETE FROM pessoa WHERE (cpf = :cpf);" + "DELETE FROM estudante WHERE cpf = :cpf"
    )
    @Modifying
    void delete(@Param("cpf") String cpf) throws PSQLException;

    @Query(nativeQuery = true, value = "" +
            "SELECT p.cpf, p.nome, p.endereco, e.comprovante_de_matricula " +
            "FROM pessoa p, estudante e " +
            "WHERE p.cpf = e.cpf " +
            "ORDER BY p.nome")
    List<Student> getAllStudents();

    @Query(nativeQuery = true, value =
            "UPDATE pessoa " +
            "SET " +
                    "cpf = :#{#student.cpf}, " +
                    "nome = :#{#student.name}, " +
                    "endereco = :#{#student.address} " +
                    "WHERE cpf = :cpf ;" +
                    "UPDATE estudante " +
                    "SET " +
                    "comprovante_de_matricula = :#{#student.enrollment} " +
                    "WHERE cpf = :cpf"
                    )
    @Modifying
    void update(@Param("student") StudentDTO student, @Param("cpf") String cpf);

    @Query(nativeQuery = true, value = "INSERT INTO utiliza(placa, cpf) VALUES(:busPlate, :studentCpf)")
    @Modifying
    void delegateNewBus(@Param("studentCpf")String studentCpf, @Param("busPlate") String busPlate);

    @Query(nativeQuery = true, value = "DELETE FROM utiliza WHERE cpf = :cpf AND placa = :plate")
    @Modifying
    void removeBusFromStudent(@Param("cpf") String cpf, @Param("plate") String plate) throws PSQLException;
}
