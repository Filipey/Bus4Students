package com.b4s.backend.services;


import com.b4s.backend.domain.EsconBus;

import java.util.List;

public interface EsconService {

    EsconBus getByPlate(String plate);

    void insert(EsconBus bus);

    void updateLine(String plate, int line);

    void delete(String plate);

    List<EsconBus> getAll();
}
