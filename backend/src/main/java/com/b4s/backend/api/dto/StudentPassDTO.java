package com.b4s.backend.api.dto;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class StudentPassDTO {

    private LocalDate expirationDate;
    private String schoolName;
    private String studentCpf;
}
