package com.b4s.backend.domain;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "onibus")
@Inheritance(strategy = InheritanceType.JOINED)
public abstract class Bus {

    @Id
    @Column(name = "placa")
    private String plate;

    @Column(name = "horario_saida")
    private String departureTime;

    @JsonBackReference
    @ManyToMany(mappedBy = "buses")
    private List<Student> students;
}
