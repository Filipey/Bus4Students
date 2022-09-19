package com.b4s.backend.services;


import com.b4s.backend.api.dto.StudentPassDTO;
import com.b4s.backend.domain.StudentPass;

import java.util.List;

public interface StudentPassService {

    void insert(StudentPassDTO studentPassDTO, String adminCpf);

    void delete(Long id);

    StudentPass getByOwner(String studentCpf);

    void update(StudentPassDTO studentPassDTO, Long id);

    List<StudentPass> getAll();
}
