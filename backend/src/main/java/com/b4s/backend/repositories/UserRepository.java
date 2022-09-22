package com.b4s.backend.repositories;

import com.b4s.backend.api.dto.PersonResponseDTO;
import com.b4s.backend.api.dto.UserDTO;
import com.b4s.backend.api.dto.UserResponseDTO;
import com.b4s.backend.domain.User;
import org.postgresql.util.PSQLException;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, String> {

    @Query(nativeQuery = true, value = "SELECT cpf, admin FROM login WHERE cpf = :cpf")
    Optional<UserResponseDTO> getByCpf(String cpf);

    @Query(nativeQuery = true, value = "INSERT INTO login(cpf, senha, admin) VALUES (:#{#user.cpf}, :#{#user.password}, :#{#user.isAdmin()})")
    @Modifying
    void insert(@Param("user") User user);

    @Query(nativeQuery = true, value =
            "SELECT DISTINCT p.cpf, p.nome, p.endereco, " +
            "CASE" +
            "   WHEN l.admin is false THEN e.comprovante_de_matricula " +
            "   ELSE NULL " +
            "END AS comprovante_de_matricula, " +
            "CASE" +
            "   WHEN l.admin is true THEN a.id " +
            "   ELSE NULL " +
            "END AS id_admin " +
            "FROM pessoa p, administrador a, login l, estudante e " +
            "WHERE l.cpf = :#{#user.cpf} AND l.senha = :#{#user.password} AND l.cpf = p.cpf AND (a.cpf = p.cpf OR e.cpf = p.cpf)")
    PersonResponseDTO getUserByLogin(@Param("user") UserDTO user) throws PSQLException;
}
