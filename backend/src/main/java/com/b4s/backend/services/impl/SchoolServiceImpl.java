package com.b4s.backend.services.impl;

import com.b4s.backend.api.dto.StudentResponseDTO;
import com.b4s.backend.domain.School;
import com.b4s.backend.repositories.SchoolRepository;
import com.b4s.backend.services.SchoolService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class SchoolServiceImpl implements SchoolService {

    private final SchoolRepository schoolRepository;

    public SchoolServiceImpl(SchoolRepository schoolRepository) {
        this.schoolRepository = schoolRepository;
    }

    @Override
    public List<School> getAll() {
        return schoolRepository.getAll();
    }

    @Override
    public List<School> getActiveSchools() {
        return schoolRepository.getActiveSchools();
    }

    @Override
    public List<School> getNotActiveSchools() {
        return schoolRepository.getNotActiveSchools();
    }

    @Override
    public School getByName(String name) {
        return schoolRepository.getByName(name).get();
    }

    @Override
    public School getByCampus(String campus) {
        return schoolRepository.getByCampus(campus).get();
    }

    @Override
    public List<StudentResponseDTO> getStudentsFromCampus(String campus) {
        return schoolRepository.getStudentsFromCampus(campus);
    }

    @Override
    public Long getTotalSchools() {
        return schoolRepository.getTotalSchools();
    }

    @Override
    public List<StudentResponseDTO> getStudentsFromSchool(String name) {
        return schoolRepository.getStudentsFromSchool(name);
    }

    @Override
    @Transactional
    public void insert(School school) {
        schoolRepository.insert(school);
    }

    @Override
    @Transactional
    public void insertStudentInSchool(String studentCpf, String campus) {
        schoolRepository.insertStudentInSchool(studentCpf, campus);
    }

    @Override
    @Transactional
    public void removeStudentFromCampus(String studentCpf, String campus) {
        schoolRepository.removeStudentFromCampus(studentCpf, campus);
    }

    @Override
    @Transactional
    public void update(School school, String campus) {
        schoolRepository.update(school, campus);
    }

    @Override
    @Transactional
    public void deleteByCampus(String campus) {
        schoolRepository.deleteByCampus(campus);
    }

    @Override
    @Transactional
    public void deleteByName(String name) {
        schoolRepository.deleteByName(name);
    }
}
