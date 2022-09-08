package com.b4s.backend.services.impl;

import com.b4s.backend.api.exception.ObjectNotFoundException;
import com.b4s.backend.domain.Student;
import com.b4s.backend.repositories.StudentRepository;
import com.b4s.backend.services.StudentService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class StudentServiceImpl implements StudentService {

    private final StudentRepository studentRepository;

    public StudentServiceImpl(StudentRepository studentRepository) {
        this.studentRepository = studentRepository;
    }


    @Override
    @Transactional(readOnly = true)
    public Student getStudentByCpf(String cpf) {
        return studentRepository.getStudentByCpf(cpf).orElseThrow(() -> new ObjectNotFoundException("Invalid CPF."));
    }
}
