package com.b4s.backend.repositories;

import com.b4s.backend.api.dto.StudentPassDTO;
import com.b4s.backend.api.dto.StudentResponseDTO;
import com.b4s.backend.domain.StudentPass;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface StudentPassRepository extends JpaRepository<StudentPass, Long> {

    @Query(nativeQuery = true, value =
            "INSERT INTO carteira_de_estudante(instituicao_ensino, data_validade, cpf)" +
            "VALUES(:#{#studentPass.schoolName}, :#{#studentPass.expirationDate}, :#{#studentPass.studentCpf});" +
                    "INSERT INTO gera(cpf)" +
                    "VALUES (:adminCpf)")
    @Modifying
    void insert(@Param("studentPass") StudentPassDTO studentPass, @Param("adminCpf") String adminCpf);

    @Query(nativeQuery = true, value =
            "DELETE FROM gera WHERE (id = :passId);" +
            "DELETE FROM carteira_de_estudante WHERE (id = :passId);"
            )
    @Modifying
    void deletePass(@Param("passId") Long id);

    @Query(nativeQuery = true, value =
            "UPDATE carteira_de_estudante " +
            "SET instituicao_ensino = :#{#studentPass.schoolName}," +
                    "data_validade = :#{#studentPass.expirationDate}, " +
                    "cpf = :#{#studentPass.studentCpf} " +
                    "WHERE id = :id")
    @Modifying
    void update(@Param("studentPass") StudentPassDTO studentPass, @Param("id") Long id);

    @Query(nativeQuery = true, value =
            "SELECT * FROM carteira_de_estudante " +
            "WHERE cpf = :studentCpf")
    Optional<StudentPass> getByOwner(@Param("studentCpf") String studentCpf);
    
    @Query(nativeQuery = true, value = "SELECT * FROM carteira_de_estudante ORDER BY id")
    List<StudentPass> getAll();

    @Query(nativeQuery = true, value = "SELECT p.nome, p.cpf, p.endereco, e.comprovante_de_matricula " +
            "FROM pessoa p, estudante e WHERE p.cpf = e.cpf AND e.cpf NOT IN (SELECT cpf FROM carteira_de_estudante)")
    List<StudentResponseDTO> getStudentsWithNoPass();
}
