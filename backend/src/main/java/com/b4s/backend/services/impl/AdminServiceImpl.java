package com.b4s.backend.services.impl;

import com.b4s.backend.api.exception.ObjectNotFoundException;
import com.b4s.backend.domain.Admin;
import com.b4s.backend.repositories.AdminRepository;
import com.b4s.backend.services.AdminService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AdminServiceImpl implements AdminService {

    private final AdminRepository adminRepository;

    public AdminServiceImpl(AdminRepository adminRepository) {
        this.adminRepository = adminRepository;
    }

    @Override
    @Transactional(readOnly = true)
    public Admin getByCpf(String cpf) {
        return adminRepository.getAdminByCpf(cpf).orElseThrow(() -> new ObjectNotFoundException("Admin nao encontrado"));
    }

    @Override
    @Transactional
    public void insert(Admin admin) {
        adminRepository.insert(admin);
    }

    @Override
    @Transactional
    public void update(Admin admin, String cpf) {
        adminRepository.update(admin, cpf);
    }

    @Override
    @Transactional
    public void delete(String cpf) {
        adminRepository.deleteByCpf(cpf);
    }
}
