package com.b4s.backend.repositories;

import com.b4s.backend.api.dto.StudentResponseDTO;
import com.b4s.backend.domain.School;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface SchoolRepository extends JpaRepository<School, String> {

    @Query(nativeQuery = true, value = "SELECT * FROM instituicao_de_ensino ORDER BY nome")
    List<School> getAll();

    @Query(nativeQuery = true, value = "SELECT * FROM instituicao_de_ensino WHERE periodo_letivo = true")
    List<School> getActiveSchools();

    @Query(nativeQuery = true, value = "SELECT * FROM instituicao_de_ensino WHERE periodo_letivo = false")
    List<School> getNotActiveSchools();

    @Query(nativeQuery = true, value = "SELECT * FROM instituicao_de_ensino WHERE nome = :name")
    Optional<School> getByName(@Param("name") String name);

    @Query(nativeQuery = true, value = "SELECT * FROM instituicao_de_ensino WHERE campus LIKE %:campus%")
    Optional<School> getByCampus(@Param("campus") String campus);

    @Query(nativeQuery = true, value =
            "SELECT p.cpf, p.nome, p.endereco, e.comprovante_de_matricula " +
            "FROM pessoa p, estudante e " +
                    "WHERE e.cpf IN (SELECT cpf FROM frequenta f WHERE f.campus LIKE %:campus%) AND p.cpf = e.cpf")
    List<StudentResponseDTO> getStudentsFromCampus(@Param("campus") String campus);

    @Query(nativeQuery = true, value = "SELECT COUNT(*) FROM instituicao_de_ensino")
    Long getTotalSchools();

    @Query(nativeQuery = true, value =
            "SELECT p.cpf, p.nome, p.endereco, e.comprovante_de_matricula " +
            "FROM pessoa p, estudante e " +
            "WHERE p.cpf = (SELECT cpf FROM frequenta WHERE campus IN (SELECT campus FROM instituicao_de_ensino WHERE nome = :name))" +
                    "AND e.cpf = (SELECT cpf FROM frequenta WHERE campus IN (SELECT campus FROM instituicao_de_ensino WHERE nome = :name))")
    List<StudentResponseDTO> getStudentsFromSchool(@Param("name") String name);

    @Query(nativeQuery = true, value =
            "INSERT INTO instituicao_de_ensino(nome, localizacao, periodo_letivo, campus) " +
            "VALUES (:#{#school.name}, :#{#school.location}, :#{#school.active}, :#{#school.campus})")
    @Modifying
    void insert(@Param("school") School school);

    @Query(nativeQuery = true, value =
            "INSERT INTO frequenta(campus, cpf) VALUES (:campus, :studentCpf)")
    @Modifying
    void insertStudentInSchool(@Param("studentCpf") String studentCpf, @Param("campus") String campus);

    @Query(nativeQuery = true, value =
            "UPDATE instituicao_de_ensino " +
                    "SET nome = :#{#school.name}, " +
                    "localizacao = :#{#school.location}, " +
                    "periodo_letivo = :#{#school.active}, " +
                    "campus = :#{#school.campus} " +
                    "WHERE campus LIKE %:campus%")
    @Modifying
    void update(@Param("school") School school, @Param("campus") String campus);

    @Query(nativeQuery = true, value = "DELETE FROM instituicao_de_ensino WHERE campus = :campus")
    @Modifying
    void deleteByCampus(@Param("campus") String campus);

    @Query(nativeQuery = true, value = "DELETE FROM instituicao_de_ensino WHERE nome = :name")
    @Modifying
    void deleteByName(@Param("name") String name);
}
