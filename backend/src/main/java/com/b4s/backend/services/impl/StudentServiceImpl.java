package com.b4s.backend.services.impl;

import com.b4s.backend.api.exception.ObjectAlreadyExistsException;
import com.b4s.backend.api.exception.ObjectNotFoundException;
import com.b4s.backend.domain.Student;
import com.b4s.backend.repositories.EsconBusRepository;
import com.b4s.backend.repositories.HallBusRepository;
import com.b4s.backend.repositories.StudentRepository;
import com.b4s.backend.services.StudentService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.SQLException;
import org.postgresql.util.PSQLException;
import java.util.List;

@Service
public class StudentServiceImpl implements StudentService {

    private final StudentRepository studentRepository;
    private final EsconBusRepository esconBusRepository;
    private final HallBusRepository hallBusRepository;

    public StudentServiceImpl(StudentRepository studentRepository, EsconBusRepository esconBusRepository, HallBusRepository hallBusRepository) {
        this.studentRepository = studentRepository;
        this.esconBusRepository = esconBusRepository;
        this.hallBusRepository = hallBusRepository;
    }


    @Override
    @Transactional(readOnly = true)
    public Student getStudentByCpf(String cpf) {
        try {
            return studentRepository.getStudentByCpf(cpf).get();
        } catch (PSQLException e) {
            throw new ObjectAlreadyExistsException(e.getMessage());
        }
    }

    @Override
    @Transactional
    public void create(Student student) {
        try {
            studentRepository.create(student);
        } catch (PSQLException e) {
            throw new ObjectAlreadyExistsException(e.getMessage());
        }
    }

    @Override
    @Transactional
    public void delete(String cpf) {
        try {
            Student student = studentRepository.getStudentByCpf(cpf).get();
            studentRepository.delete(student.getCpf());
        } catch (PSQLException e) {
            throw new ObjectNotFoundException(e.getMessage());
        }
    }

    @Override
    @Transactional(readOnly = true)
    public List<Student> getAllStudents() {
        return studentRepository.getAllStudents();
    }

    @Override
    @Transactional
    public void delegateNewBus(String cpf, String plate) {
        try {
            studentRepository.delegateNewBus(cpf, plate);
            throw new SQLException();
        } catch (SQLException e) {
            e.getCause();
            throw new ObjectAlreadyExistsException("Bus with plate " +plate+ " not found");
        }

    }

}
