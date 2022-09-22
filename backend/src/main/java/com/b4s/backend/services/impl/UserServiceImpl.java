package com.b4s.backend.services.impl;

import com.b4s.backend.api.dto.PersonResponseDTO;
import com.b4s.backend.api.dto.UserDTO;
import com.b4s.backend.api.dto.UserResponseDTO;
import com.b4s.backend.api.exception.ObjectNotFoundException;
import com.b4s.backend.domain.Person;
import com.b4s.backend.domain.User;
import com.b4s.backend.repositories.AdminRepository;
import com.b4s.backend.repositories.StudentRepository;
import com.b4s.backend.repositories.UserRepository;
import org.postgresql.util.PSQLException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
public class UserServiceImpl {

    private final PasswordEncoder passwordEncoder;

    private final UserRepository userRepository;
    private final StudentRepository studentRepository;
    private final AdminRepository adminRepository;

    public UserServiceImpl(PasswordEncoder passwordEncoder, UserRepository userRepository,
                           StudentRepository studentRepository, AdminRepository adminRepository) {
        this.passwordEncoder = passwordEncoder;
        this.userRepository = userRepository;
        this.studentRepository = studentRepository;
        this.adminRepository = adminRepository;
    }

    @Transactional
    public void save(User user) {
        userRepository.insert(user);
    }

    public Optional<UserResponseDTO> getUserByCpf(String cpf) {
        return Optional.ofNullable(userRepository.getByCpf(cpf).orElseThrow(() -> new ObjectNotFoundException("User not found")));
    }

    @Transactional(readOnly = true)
    public Person getPersonByLogin(UserDTO dto){

        try {
            PersonResponseDTO person = userRepository.getUserByLogin(dto);
            if (person == null) {
                throw new ObjectNotFoundException("User not found");
            }

            if (studentRepository.getStudentByCpf(person.getCpf()).isPresent()) {
                return studentRepository.getStudentByCpf(person.getCpf()).get();
            }

            if (adminRepository.getAdminByCpf(person.getCpf()).isPresent()) {
                return adminRepository.getAdminByCpf(person.getCpf()).get();
            } else {
                throw new ObjectNotFoundException("User not found");
            }

        } catch (PSQLException e) {
            throw new ObjectNotFoundException(e.getMessage());
        }
    }
}
