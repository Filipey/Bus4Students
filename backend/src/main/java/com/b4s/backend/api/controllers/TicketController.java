package com.b4s.backend.api.controllers;

import com.b4s.backend.domain.Ticket;
import com.b4s.backend.services.TicketService;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import org.springframework.http.HttpStatus;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/ticket")
public class TicketController {

    private final TicketService ticketService;

    public TicketController(TicketService ticketService) {
        this.ticketService = ticketService;
    }

    @GetMapping("/{id}")
    @ApiOperation("Get a Ticket by id")
    @ApiResponses({
            @ApiResponse(code = 200, message = "Ok"),
            @ApiResponse(code = 404, message = "Ticket not found")
    })
    @ResponseStatus(HttpStatus.OK)
    public Ticket getById(@PathVariable int id) {
        return ticketService.getById(id);
    }

    @GetMapping
    @ApiOperation("Get all disponible Tickets")
    @ApiResponses({
            @ApiResponse(code = 200, message = "Ok"),
            @ApiResponse(code = 404, message = "There is no disponible Tickets")
    })
    @ResponseStatus(HttpStatus.OK)
    public List<Ticket> getAllDisponibleTickets() {
        return ticketService.getAllDisponibleTickets();
    }

    @PostMapping
    @ApiOperation("Insert a new Ticket")
    @ApiResponses({
            @ApiResponse(code = 201, message = "Created"),
            @ApiResponse(code = 400, message = "Authorization Error"),

    })
    @ResponseStatus(HttpStatus.CREATED)
    public void insert(@RequestBody @Validated Ticket ticket){
        ticketService.insert(ticket);
    }

    @PutMapping("/{id}")
    @ApiOperation("Update a Ticket info")
    @ApiResponses({
            @ApiResponse(code = 204, message = "Updated"),
            @ApiResponse(code = 400, message = "Authorization Error")
    })
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void update(@RequestBody Ticket ticket, @PathVariable int id) {
        ticketService.update(ticket, id);
    }

    @DeleteMapping("/{id}")
    @ApiOperation("Delete a Ticket")
    @ApiResponses({
            @ApiResponse(code = 204, message = "Deleted"),
            @ApiResponse(code = 400, message = "Authorization Error")
    })
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable int id) {
        ticketService.delete(id);
    }

    @PostMapping("/{id}")
    @ApiOperation("Delegate a Ticket to a Student")
    @ApiResponses({
            @ApiResponse(code = 201, message = "Created"),
            @ApiResponse(code = 400, message = "Authorization Error")
    })
    public void delegateTicket(@RequestBody String studentCpf, @PathVariable int id) {
        ticketService.delegateTicket(studentCpf, id);
    }

}
