package com.b4s.backend.services.impl;

import com.b4s.backend.api.exception.ObjectNotFoundException;
import com.b4s.backend.domain.Ticket;
import com.b4s.backend.repositories.TicketRepository;
import com.b4s.backend.services.TicketService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class TicketServiceImpl implements TicketService {

    private final TicketRepository ticketRepository;

    public TicketServiceImpl(TicketRepository ticketRepository) {
        this.ticketRepository = ticketRepository;
    }

    @Override
    @Transactional(readOnly = true)
    public Ticket getById(int id) {
        return ticketRepository.getTicketById(id)
                .orElseThrow(() -> new ObjectNotFoundException("Ticket with id " +id+ " not found"));
    }

    @Override
    @Transactional(readOnly = true)
    public List<Ticket> getAllDisponibleTickets() {
        return ticketRepository.getAllDisponibleTickets();
    }

    @Override
    @Transactional
    public void insert(Ticket ticket) {
        ticketRepository.insert(ticket);
    }

    @Override
    @Transactional
    public void update(Ticket ticket, int id) {
        ticketRepository.update(ticket, id);
    }

    @Override
    @Transactional
    public void delete(int id) {
        ticketRepository.getTicketById(id).map(ticket -> {
            ticketRepository.delete(id);
            return ticket;
        }).orElseThrow(() -> new ObjectNotFoundException("Ticket with id " +id+ " not found"));
    }

    @Override
    @Transactional
    public void delegateTicket(String studentCpf, String admCpf, int id) {
        ticketRepository.delegateTicket(studentCpf, admCpf, id);
    }

    @Override
    public List<Ticket> getTicketsByOwner(String studentCpf) {
        return ticketRepository.getTicketsByOwner(studentCpf);
    }
}
