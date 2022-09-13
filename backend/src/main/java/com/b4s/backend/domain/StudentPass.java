package com.b4s.backend.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.sql.Date;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
@Table(name = "carteira_de_estudante")
public class StudentPass {

    @Id
    @Column(name = "id")
    private Long id;

    @Column(name = "data_validade")
    private Date expirationDate;

    @Column(name = "instituicao_ensino")
    private String schoolName;

    @OneToOne
    @JoinColumn(name = "cpf_estudante", referencedColumnName = "cpf")
    private Student owner;
}
