package com.b4s.backend.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "login")
public class User {

    @Id
    @Column(name = "cpf")
    private String cpf;

    @Column(name = "senha")
    private String password;

    @Column(name = "admin")
    private boolean isAdmin;
}
