package com.b4s.backend.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "onibus_prefeitura")
public class HallBus extends Bus{

    @Column(name = "numero_passageiro")
    private int passengersLimit;

    @Column(name = "motorista")
    private String driver;

}
