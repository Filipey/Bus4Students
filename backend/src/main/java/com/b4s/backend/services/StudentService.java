package com.b4s.backend.services;

import com.b4s.backend.domain.Student;
import org.springframework.transaction.annotation.Transactional;


public interface StudentService {
    Student getStudentByCpf(String cpf);

}
