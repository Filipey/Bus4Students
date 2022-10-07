package com.b4s.backend.services.impl;

import com.b4s.backend.api.dto.StudentDTO;
import com.b4s.backend.api.exception.ObjectAlreadyExistsException;
import com.b4s.backend.api.exception.ObjectNotFoundException;
import com.b4s.backend.domain.Student;
import com.b4s.backend.repositories.EsconBusRepository;
import com.b4s.backend.repositories.HallBusRepository;
import com.b4s.backend.repositories.StudentRepository;
import com.b4s.backend.services.StudentService;
import org.postgresql.util.PSQLException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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
        studentRepository.delegateNewBus(cpf, plate);

    }

    @Override
    public Long getTotalStudents() {
        return studentRepository.getTotalStundents();
    }

    @Override
    @Transactional
    public void update(StudentDTO dto, String cpf) {
        try {
            studentRepository.getStudentByCpf(cpf).map(student -> {
                studentRepository.update(dto, cpf);
                return student;
            });
        } catch (PSQLException e) {
            throw new ObjectNotFoundException("Student with cpf " +cpf+ " not found");
        }
    }

    @Override
    @Transactional
    public void removeBusFromStudent(String cpf, String plate) {
        try {
            studentRepository.removeBusFromStudent(cpf, plate);
        } catch (PSQLException e) {
            throw new ObjectNotFoundException("Invalid params: CPF: " +cpf + " Plate: " +plate);
        }
    }

}
