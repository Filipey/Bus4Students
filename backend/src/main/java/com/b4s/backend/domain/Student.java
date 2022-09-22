package com.b4s.backend.domain;


import com.b4s.backend.domain.enums.UserRoles;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

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
            joinColumns = {@JoinColumn(name = "cpf")},
            inverseJoinColumns = {@JoinColumn(name = "campus")}
    )
    private List<School> schools;

    @ManyToMany
    @JoinTable(name = "utiliza",
            joinColumns = {@JoinColumn(name = "cpf")},
            inverseJoinColumns = {@JoinColumn(name = "placa")}
    )
    private List<Bus> buses;

    @ManyToMany
    @JsonIgnore
    @JoinTable(name = "recebe",
        joinColumns = {@JoinColumn(name = "cpf")},
            inverseJoinColumns = {@JoinColumn(name = "id")}
    )
    private List<Ticket> tickets;

    @JsonIgnore
    @OneToOne(mappedBy = "owner")
    private StudentPass pass;

    @Transient
    private UserRoles role = UserRoles.STUDENT;
}
