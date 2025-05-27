package com.aulaateca.aulaateca.servicio;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.aulaateca.aulaateca.modelo.Reserva;
import com.aulaateca.aulaateca.repositorio.ReservaRepository;

import java.util.List;
import java.util.Optional;

@Service
public class ReservaService {

    @Autowired
    private ReservaRepository reservaRepository;

    public List<Reserva> listarTodas() {
        return reservaRepository.findAll();
    }

    public Optional<Reserva> obtenerPorId(Long id) {
        return reservaRepository.findById(id);
    }

    public Reserva crearReserva(Reserva reserva) {
        return reservaRepository.save(reserva);
    }

    public Optional<Reserva> actualizarReserva(Long id, Reserva datosActualizados) {
        return reservaRepository.findById(id).map(r -> {
            r.setNombreProyecto(datosActualizados.getNombreProyecto());
            r.setMaterial(datosActualizados.getMaterial());
            r.setCantidadMaterial(datosActualizados.getCantidadMaterial());
            r.setAlumnos(datosActualizados.getAlumnos());
            r.setGrupo(datosActualizados.getGrupo());
            r.setProfesor(datosActualizados.getProfesor());
            r.setPreparacion(datosActualizados.isPreparacion());
            r.setFecha(datosActualizados.getFecha());
            r.setHoraInicio(datosActualizados.getHoraInicio());
            r.setHoraFin(datosActualizados.getHoraFin());
            return reservaRepository.save(r);
        });
    }

    public boolean eliminarReserva(Long id) {
        if (reservaRepository.existsById(id)) {
            reservaRepository.deleteById(id);
            return true;
        }
        return false;
    }

    public List<Reserva> filtrarPorGrupo(String grupo) {
        return reservaRepository.findByGrupoContainingIgnoreCase(grupo);
    }

    public List<Reserva> filtrarPorProyecto(String proyecto) {
        return reservaRepository.findByNombreProyectoContainingIgnoreCase(proyecto);
    }
}