package com.b4s.backend.domain;

import com.b4s.backend.domain.enums.UserRoles;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.Table;
import javax.persistence.Transient;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "administrador")
public class Admin extends Person{

    private Long id;

    @Transient
    private UserRoles role = UserRoles.ADMIN;
}
