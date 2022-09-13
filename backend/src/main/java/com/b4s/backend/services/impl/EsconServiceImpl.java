package com.b4s.backend.services.impl;

import com.b4s.backend.api.exception.ObjectAlreadyExistsException;
import com.b4s.backend.api.exception.ObjectNotFoundException;
import com.b4s.backend.domain.EsconBus;
import com.b4s.backend.repositories.EsconBusRepository;
import com.b4s.backend.services.EsconService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class EsconServiceImpl implements EsconService {

    private final EsconBusRepository esconBusRepository;

    public EsconServiceImpl(EsconBusRepository esconBusRepository) {
        this.esconBusRepository = esconBusRepository;
    }

    @Override
    @Transactional(readOnly = true)
    public EsconBus getByPlate(String plate) {
        return esconBusRepository.getEsconBusByPlate(plate).orElseThrow(() -> new ObjectNotFoundException("Bus not Found"));
    }

    @Override
    @Transactional
    public void insert(EsconBus bus) {
        try {
            esconBusRepository.insert(bus);
        } catch (Exception e) {
            throw new ObjectAlreadyExistsException("Bus with plate " +bus.getPlate() + " already exists");
        }
    }

    @Override
    @Transactional
    public void updateLine(String plate, int line) {
        try {
            esconBusRepository.updateLine(plate, line);
        } catch (Exception e) {
            throw new ObjectNotFoundException("Bus not found");
        }
    }

    @Override
    @Transactional
    public void delete(String plate) {
        esconBusRepository.getEsconBusByPlate(plate).map(bus -> {
            esconBusRepository.delete(plate);
            return bus;
        }).orElseThrow(() -> new ObjectNotFoundException("Bus not found"));
    }

    @Override
    @Transactional
    public List<EsconBus> getAll() {
        return esconBusRepository.getAllEsconBuses();
    }
}
