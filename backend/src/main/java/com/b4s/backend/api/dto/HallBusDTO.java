package com.b4s.backend.api.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class HallBusDTO {
    private String driver;
    private int passengersLimit;
    private String departureTime;
}
