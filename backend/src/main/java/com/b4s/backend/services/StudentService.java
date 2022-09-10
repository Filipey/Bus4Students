package com.b4s.backend.services;

import com.b4s.backend.domain.Student;

import java.util.List;


public interface StudentService {
    Student getStudentByCpf(String cpf);

    void create(Student student);

    void delete(String cpf);

    List<Student> getAllStudents();
}
