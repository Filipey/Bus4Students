package com.b4s.backend.services;

import com.b4s.backend.domain.Admin;

public interface AdminService {

    Admin getByCpf(String cpf);

    void insert(Admin admin);

    void update(Admin admin, String cpf);

    void delete(String cpf);
}
