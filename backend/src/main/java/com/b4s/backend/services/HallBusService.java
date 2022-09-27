package com.b4s.backend.services;

import com.b4s.backend.api.dto.HallBusDTO;
import com.b4s.backend.domain.HallBus;

import java.util.List;

public interface HallBusService {

    HallBus getByPlate(String plate);

    void insert(HallBus bus);

    void update(String plate, HallBusDTO dto);

    void delete(String plate);

    List<HallBus> getAll();
}
