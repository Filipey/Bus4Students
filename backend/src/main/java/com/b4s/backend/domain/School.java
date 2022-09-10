package com.b4s.backend.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.List;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "instituicao_de_ensino")
public class School {

    @Id
    private String campus;

    @Column(name = "nome")
    private String name;

    @Column(name = "localizacao")
    private String location;

    @Column(name = "periodo_letivo")
    private boolean isActive;

    @ManyToMany(mappedBy = "schools", cascade = CascadeType.ALL)
    private List<Student> students;
}
