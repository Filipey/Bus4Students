package com.b4s.backend.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.math.BigDecimal;
import java.sql.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "vale_transporte")
public class Ticket {

    @Column(name = "id")
    @Id
    private Long id;

    @Column(name = "data_de_validade")
    private Date expirationDate;

    @Column(name = "valor")
    private BigDecimal value;

    @Column(name = "origem")
    private String source;

    @Column(name = "destino")
    private String sink;



}
