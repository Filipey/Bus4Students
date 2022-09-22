package com.b4s.backend.repositories;

import com.b4s.backend.domain.Admin;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface AdminRepository extends JpaRepository<Admin, Long> {

    @Query(nativeQuery = true, value =
            "SELECT p.cpf, p.nome, p.endereco, a.id " +
            "FROM pessoa p, administrador a " +
            "WHERE p.cpf = :cpf AND a.cpf = :cpf")
    Optional<Admin> getAdminByCpf(@Param("cpf") String cpf);

    @Query(nativeQuery = true, value =
            "INSERT INTO pessoa(cpf, nome, endereco) " +
                    "VALUES (:#{#admin.cpf}, :#{#admin.name}, :#{#admin.address}); " +
            "INSERT INTO administrador(id, cpf) " +
                    "VALUES (:#{#admin.id}, :#{#admin.cpf})")
    @Modifying
    void insert(@Param("admin") Admin admin);

    @Query(nativeQuery = true, value =
            "UPDATE pessoa SET cpf = :#{#admin.cpf}, " +
            "nome = :#{#admin.name}, " +
            "endereco = :#{#admin.address} " +
                    "WHERE cpf = :cpf ;" +
            "UPDATE administrador SET id = :#{#admin.id}, " +
            "cpf = :#{#admin.cpf} " +
                    "WHERE cpf = :cpf ;")
    @Modifying
    void update(@Param("admin") Admin admin, @Param("cpf") String cpf);

    @Query(nativeQuery = true, value =
            "DELETE FROM pessoa WHERE cpf = :cpf ; " +
            "DELETE FROM administrador WHERE cpf = :cpf")
    @Modifying
    void deleteByCpf(@Param("cpf") String cpf);
}
