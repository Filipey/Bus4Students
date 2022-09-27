package com.b4s.backend.services.impl;

import com.b4s.backend.api.dto.HallBusDTO;
import com.b4s.backend.api.exception.ObjectAlreadyExistsException;
import com.b4s.backend.api.exception.ObjectNotFoundException;
import com.b4s.backend.domain.HallBus;
import com.b4s.backend.repositories.HallBusRepository;
import com.b4s.backend.services.HallBusService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class HallBusServiceImpl implements HallBusService {

    private final HallBusRepository hallBusRepository;

    public HallBusServiceImpl(HallBusRepository hallBusRepository) {
        this.hallBusRepository = hallBusRepository;
    }

    @Override
    @Transactional(readOnly = true)
    public HallBus getByPlate(String plate) {
        return hallBusRepository.getByPlate(plate).orElseThrow(() -> new ObjectNotFoundException("HallBus not found"));
    }

    @Override
    @Transactional
    public void insert(HallBus bus) {
        try {
            hallBusRepository.insert(bus);
        } catch (Exception e) {
            throw new ObjectAlreadyExistsException("Bus with plate " +bus.getPlate() + " already exists");
        }
    }

    @Override
    @Transactional
    public void update(String plate, HallBusDTO dto) {
        hallBusRepository.update(plate, dto);
    }

    @Override
    @Transactional
    public void delete(String plate) {
        hallBusRepository.getByPlate(plate).map(bus -> {
            hallBusRepository.delete(plate);
            return bus;
        }).orElseThrow(() -> new ObjectNotFoundException("HallBus not found"));
    }

    @Override
    @Transactional(readOnly = true)
    public List<HallBus> getAll() {
        return hallBusRepository.getAllHallBuses();
    }
}
