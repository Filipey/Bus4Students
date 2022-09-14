package com.b4s.backend.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.math.BigDecimal;
import java.sql.Date;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "vale_transporte")
public class Ticket {

    @Column(name = "id", columnDefinition = "serial")
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "vale_transporte_id")
    @SequenceGenerator(name = "vale_transporte_id", sequenceName = "vale_transporte_id", allocationSize = 1)
    private int id;

    @Column(name = "data_de_validade")
    private Date expirationDate;

    @Column(name = "valor")
    private BigDecimal value;

    @Column(name = "origem")
    private String source;

    @Column(name = "destino")
    private String sink;

    @ManyToMany(mappedBy = "tickets")
    @JsonIgnore
    private List<Student> students;

}
