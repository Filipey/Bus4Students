package com.b4s.backend.services;

import com.b4s.backend.api.dto.StudentResponseDTO;
import com.b4s.backend.domain.School;

import java.util.List;

public interface SchoolService {

    List<School> getAll();

    List<School> getActiveSchools();

    List<School> getNotActiveSchools();

    School getByName(String name);

    School getByCampus(String campus);

    List<StudentResponseDTO> getStudentsFromCampus(String campus);

    Long getTotalSchools();

    List<StudentResponseDTO> getStudentsFromSchool(String name);

    void insert(School school);

    void insertStudentInSchool(String studentCpf, String campus);

    void removeStudentFromCampus(String studentCpf, String campus);

    void update(School school, String campus);

    void deleteByCampus(String campus);

    void deleteByName(String name);
}
