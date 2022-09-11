package com.b4s.backend.api.controllers;

import com.b4s.backend.domain.EsconBus;
import com.b4s.backend.services.EsconService;
import com.b4s.backend.services.impl.EsconServiceImpl;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import org.springframework.http.HttpStatus;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/escon")
public class EsconController {

    private final EsconService esconService;

    public EsconController(EsconServiceImpl esconService) {
        this.esconService = esconService;
    }

    @GetMapping("/{plate}")
    @ApiOperation("Get a EsconBus info")
    @ApiResponses({
            @ApiResponse(code = 200, message = "Bus finded"),
            @ApiResponse(code = 404, message = "Bus not found")
    })
    @ResponseStatus(HttpStatus.OK)
    public EsconBus getEsconBusByPlate(@PathVariable String plate) {
        return esconService.getByPlate(plate);
    }

    @PostMapping
    @ApiOperation("Create a EsconBus")
    @ApiResponses({
            @ApiResponse(code = 201, message = "Bus created"),
            @ApiResponse(code = 400, message = "Authorization error")
    })
    @ResponseStatus(HttpStatus.CREATED)
    public void insert(@RequestBody @Validated EsconBus bus) {
        esconService.insert(bus);
    }

    @PatchMapping("/{plate}")
    @ApiOperation("Update a EsconBus line")
    @ApiResponses({
            @ApiResponse(code = 201, message = "Bus updated"),
            @ApiResponse(code = 400, message = "Authorization error")
    })
    @ResponseStatus(HttpStatus.OK)
    public void update(@PathVariable String plate, @RequestBody @Validated int line) {
        esconService.updateLine(plate, line);
    }

    @DeleteMapping("/{plate}")
    @ApiOperation("Delete a EsconBus")
    @ApiResponses({
            @ApiResponse(code = 204, message = "Bus deleted"),
            @ApiResponse(code = 400, message = "Authorization erorr"),
            @ApiResponse(code = 404, message = "Bus not found")
    })
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable String plate) {
        esconService.delete(plate);
    }

    @GetMapping
    @ApiOperation("Get all Escon buses")
    @ApiResponses({
            @ApiResponse(code = 200, message = "Buses received"),
            @ApiResponse(code = 404, message = "No buses found")
    })
    @ResponseStatus(HttpStatus.OK)
    public List<EsconBus> getAll() {
        return esconService.getAll();
    }
}
