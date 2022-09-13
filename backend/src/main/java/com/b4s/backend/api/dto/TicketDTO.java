package com.b4s.backend.api.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TicketDTO {

    private BigDecimal value;
    private String source;
    private String sink;
    private String esconPlate;
}
