package com.b4s.backend.services;

import com.b4s.backend.domain.Ticket;

import java.util.List;

public interface TicketService {

    Ticket getById(int id);

    void insert(Ticket ticket);

    void update(Ticket ticket, int id);

    void delete(int id);

    void delegateTicket(String studentCpf, int id);

    List<Ticket> getAllDisponibleTickets();
}
