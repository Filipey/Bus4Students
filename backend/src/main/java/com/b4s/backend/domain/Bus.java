package com.b4s.backend.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.*;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "onibus")
@Inheritance(strategy = InheritanceType.JOINED)
@Transactional
public abstract class Bus {

    @Id
    @Column(name = "placa")
    private String plate;

    @Column(name = "horario_saida")
    private String departureTime;

    @ManyToMany(mappedBy = "buses")
    @JsonIgnore
    private List<Student> students;
}
