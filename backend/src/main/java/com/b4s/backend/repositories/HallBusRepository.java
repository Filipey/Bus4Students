package com.b4s.backend.repositories;

import com.b4s.backend.api.dto.HallBusDTO;
import com.b4s.backend.domain.HallBus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface HallBusRepository extends JpaRepository<HallBus, String> {

    @Query(nativeQuery = true, value = "" +
            "SELECT o.placa, o.horario_saida, op.numero_passageiro, op.motorista " +
            "FROM onibus o, onibus_prefeitura op " +
            "WHERE o.placa = op.placa " +
            "ORDER BY op.motorista")
    List<HallBus> getAllHallBuses();

    @Modifying
    @Query(nativeQuery = true, value =
            "INSERT INTO onibus(placa, horario_saida) " +
                    "VALUES(:#{#bus.plate}, :#{#bus.departureTime});" +
            "INSERT INTO onibus_prefeitura(numero_passageiro, motorista, placa) " +
                    "VALUES (:#{#bus.passengersLimit}, :#{#bus.driver}, :#{#bus.plate})")
    void insert(@Param("bus") HallBus bus);

    @Modifying
    @Query(nativeQuery = true, value =
            "UPDATE onibus_prefeitura " +
            "SET motorista = :#{#bus.driver}, numero_passageiro = :#{#bus.passengersLimit} " + "WHERE placa = :plate ; " +
                    "UPDATE onibus SET horario_saida = :#{#bus.departureTime} WHERE placa = :plate")
    void update(@Param("plate") String plate, @Param("bus")HallBusDTO bus);

    @Modifying
    @Query(nativeQuery = true, value =
            "DELETE FROM onibus WHERE (placa = :plate);" +
            "DELETE FROM onibus_prefeitura WHERE (placa = :plate)")
    void delete(@Param("plate") String plate);

    @Query(nativeQuery = true, value =
            "SELECT o.placa, o.horario_saida, op.numero_passageiro, op.motorista " +
            "FROM onibus o, onibus_prefeitura op " +
            "WHERE o.placa = :plate AND op.placa = :plate")
    Optional<HallBus> getByPlate(@Param("plate") String plate);
}
