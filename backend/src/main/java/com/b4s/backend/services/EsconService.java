package com.b4s.backend.services;


import com.b4s.backend.domain.EsconBus;

public interface EsconService {

    EsconBus getByPlate(String plate);

    void insert(EsconBus bus);

    void updateLine(String plate, int line);

    void delete(String plate);
}
