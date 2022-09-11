package com.b4s.backend.api.dto;

import com.b4s.backend.domain.Bus;
import com.b4s.backend.domain.School;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class StudentDTO {

    private String name;
    private String cpf;
    private String enrollment;
    private List<School> schools;
    private List<Bus> buses;

}
