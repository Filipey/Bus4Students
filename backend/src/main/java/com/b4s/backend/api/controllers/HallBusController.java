package com.b4s.backend.api.controllers;

import com.b4s.backend.api.dto.HallBusDTO;
import com.b4s.backend.domain.HallBus;
import com.b4s.backend.services.HallBusService;
import com.fasterxml.jackson.databind.node.ObjectNode;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import org.springframework.http.HttpStatus;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/hall")
public class HallBusController {

    private final HallBusService hallBusService;

    public HallBusController(HallBusService hallBusService) {
        this.hallBusService = hallBusService;
    }

    @GetMapping
    @ApiOperation("Get all Hall buses")
    @ApiResponses({
            @ApiResponse(code = 200, message = "Ok"),
            @ApiResponse(code = 404, message = "There is no buses")
    })
    @ResponseStatus(HttpStatus.OK)
    public List<HallBus> getAll() {
        return hallBusService.getAll();
    }

    @GetMapping("/{plate}")
    @ApiOperation("Get a HallBus by his plate")
    @ApiResponses({
            @ApiResponse(code = 200, message = "Ok"),
            @ApiResponse(code = 404, message = "Bus not found")
    })
    @ResponseStatus(HttpStatus.OK)
    public HallBus getByPlate(@PathVariable String plate) {
        return hallBusService.getByPlate(plate);
    }

    @PostMapping
    @ApiOperation("Insert a new HallBus")
    @ApiResponses({
            @ApiResponse(code = 201, message = "Created"),
            @ApiResponse(code = 400, message = "Authorization Error"),
            @ApiResponse(code = 404, message = "Bus already exists")
    })
    @ResponseStatus(HttpStatus.CREATED)
    public void insert(@RequestBody @Validated HallBus bus) {
        hallBusService.insert(bus);
    }

    @PutMapping("/{plate}")
    @ApiOperation("Update the driver and/or the passagers of a HallBus")
    @ApiResponses({
            @ApiResponse(code = 204, message = "Updated"),
            @ApiResponse(code = 400, message = "Authorization Error"),
    })
    void update(@PathVariable String plate, @RequestBody HallBusDTO dto) {

        hallBusService.update(plate, dto.getDriver(), dto.getPassengersLimit());
    }

    @DeleteMapping("/{plate}")
    @ApiOperation("Delete a HallBus")
    @ApiResponses({
            @ApiResponse(code = 204, message = "Deleted"),
            @ApiResponse(code = 400, message = "Auhtorization Error"),
            @ApiResponse(code = 404, message = "Bus not found")
    })
    void delete(@PathVariable String plate) {
        hallBusService.delete(plate);
    }
}
