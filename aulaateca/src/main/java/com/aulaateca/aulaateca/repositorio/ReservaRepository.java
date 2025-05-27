package com.aulaateca.aulaateca.repositorio;

import org.springframework.data.jpa.repository.JpaRepository;

import com.aulaateca.aulaateca.modelo.Reserva;

import java.util.List;

public interface ReservaRepository extends JpaRepository<Reserva, Long> {
    List<Reserva> findByGrupoContainingIgnoreCase(String grupo);
    List<Reserva> findByNombreProyectoContainingIgnoreCase(String proyecto);
}

