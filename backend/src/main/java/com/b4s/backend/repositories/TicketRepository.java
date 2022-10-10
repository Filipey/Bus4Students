package com.b4s.backend.repositories;

import com.b4s.backend.domain.Ticket;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;


public interface TicketRepository extends JpaRepository<Ticket, Long> {

    @Query(nativeQuery = true, value = "SELECT * FROM vale_transporte WHERE id = :id")
    Optional<Ticket> getTicketById(@Param("id") int id);

    @Modifying
    @Query(nativeQuery = true, value =
            "INSERT INTO vale_transporte(data_de_validade, valor, origem, destino) " +
            "VALUES(:#{#ticket.expirationDate}, :#{#ticket.value}, :#{#ticket.source}, :#{#ticket.sink})")
    void insert(@Param("ticket") Ticket ticket);

    @Modifying
    @Query(nativeQuery = true, value =
            "UPDATE vale_transporte " +
            "SET valor = :#{#ticket.value}, origem = :#{#ticket.source}, destino = :#{#ticket.sink} " +
            "WHERE id = :id")
    void update(@Param("ticket") Ticket ticket, @Param("id") int id);

    @Modifying
    @Query(nativeQuery = true, value = "DELETE FROM vale_transporte WHERE id = :id")
    void delete(@Param("id") int id);

    @Query(nativeQuery = true, value =
            "SELECT * " +
            "FROM vale_transporte vt " +
            "WHERE vt.id NOT IN  (SELECT id FROM recebe) " +
            "ORDER BY vt.id")
    List<Ticket> getAllDisponibleTickets();

    @Query(nativeQuery = true, value =
            "INSERT INTO recebe(cpf, id) " +
            "VALUES (:studentCpf, :id); " +
                    "INSERT INTO distribui(cpf, id) " +
                    "VALUES (:admCpf, :id)")
    @Modifying
    void delegateTicket(@Param("studentCpf") String studentCpf, @Param("admCpf") String admCpf, @Param("id") int id);

    @Query(nativeQuery = true, value =
            "SELECT v.data_de_validade, v.valor, v.id, v.origem, v.destino " +
            "FROM vale_transporte v " +
            "WHERE v.id in (SELECT id FROM recebe WHERE cpf = :studentCpf)")
    List<Ticket> getTicketsByOwner(@Param("studentCpf") String studentCpf);
}
