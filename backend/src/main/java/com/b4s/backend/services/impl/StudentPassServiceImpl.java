package com.b4s.backend.services.impl;

import com.b4s.backend.api.dto.StudentPassDTO;
import com.b4s.backend.api.exception.ObjectNotFoundException;
import com.b4s.backend.domain.StudentPass;
import com.b4s.backend.repositories.StudentPassRepository;
import com.b4s.backend.services.StudentPassService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class StudentPassServiceImpl implements StudentPassService {

    private final StudentPassRepository studentPassRepository;

    public StudentPassServiceImpl(StudentPassRepository studentPassRepository) {
        this.studentPassRepository = studentPassRepository;
    }

    @Override
    @Transactional
    public void insert(StudentPassDTO studentPassDTO, String adminCpf) {
        studentPassRepository.insert(studentPassDTO, adminCpf);
    }

    @Override
    @Transactional
    public void delete(Long id) {
        studentPassRepository.deletePass(id);
    }

    @Override
    public StudentPass getByOwner(String studentCpf) {
        try {
            return studentPassRepository.getByOwner(studentCpf).get();
        } catch (Exception e) {
            throw new ObjectNotFoundException("Student not found");
        }
    }

    @Override
    public List<StudentPass> getAll() {
        return studentPassRepository.getAll();
    }

    @Override
    @Transactional
    public void update(StudentPassDTO studentPassDTO, Long id) {
        studentPassRepository.update(studentPassDTO, id);
    }
}
