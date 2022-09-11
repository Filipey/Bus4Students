package com.b4s.backend.domain;


import lombok.*;

import javax.persistence.*;
import java.util.List;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "estudante")
public class Student extends Person{

    @Column(name = "comprovante_de_matricula")
    private String enrollment;

    @ManyToMany
    @JoinTable(name = "frequenta",
            joinColumns = {@JoinColumn(name = "cpf_estudante")},
            inverseJoinColumns = {@JoinColumn(name = "campus")}
    )
    private List<School> schools;

    @ManyToMany
    @JoinTable(name = "utiliza",
            joinColumns = {@JoinColumn(name = "cpf_estudante")},
            inverseJoinColumns = {@JoinColumn(name = "placa_onibus")}
    )
    private List<Bus> buses;

    @OneToOne(mappedBy = "owner")
    private StudentPass pass;
}
