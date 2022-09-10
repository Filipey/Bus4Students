package com.b4s.backend.domain;

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

    @Id
    @Column(name = "fk_pessoa_cpf")
    private String cpf;

    @Column(name = "comprovante_de_matricula_")
    private String enrollment;


    @ManyToMany
    @JoinTable(name = "frequenta",
            joinColumns = {@JoinColumn(name = "fk_estudante__fk_pessoa_cpf")},
            inverseJoinColumns = {@JoinColumn(name = "fk_instituicao_de_ensino__campus")}
    )
    private List<School> schools;
}
