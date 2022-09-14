package com.b4s.backend.repositories;

import com.b4s.backend.domain.EsconBus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface EsconBusRepository extends JpaRepository<EsconBus, String> {

    @Query(nativeQuery = true, value =
            "SELECT o.placa, o.horario_saida, e.linha " +
            "FROM onibus o, escon e " +
            "WHERE o.placa = :plate")
    Optional<EsconBus> getEsconBusByPlate(@Param("plate") String plate);

    @Modifying
    @Query(nativeQuery = true, value =
            "INSERT INTO onibus(placa, horario_saida) VALUES (:#{#bus.plate}, :#{#bus.departureTime});" +
            "INSERT INTO escon(linha, placa) VALUES (:#{#bus.line}, :#{#bus.plate})"
    )
    void insert(@Param("bus") EsconBus bus);

    @Modifying
    @Query(nativeQuery = true, value = "UPDATE escon SET linha = :line WHERE placa = :plate")
    void updateLine(@Param("plate") String plate, @Param("line") int line);

    @Modifying
    @Query(nativeQuery = true, value = "DELETE FROM onibus WHERE (placa = :plate);" + "DELETE FROM escon WHERE (placa = :plate)")
    void delete(@Param("plate") String plate);

    @Query(nativeQuery = true, value = "" +
            "SELECT o.placa, o.horario_saida, e.linha" +
            "FROM onibus o, escon e" +
            "WHERE o.placa = e.placa" +
            "ORDER BY o.placa")
    List<EsconBus> getAllEsconBuses();

}
