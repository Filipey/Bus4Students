package com.b4s.backend.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

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
    private String enrollmentProof;

}
