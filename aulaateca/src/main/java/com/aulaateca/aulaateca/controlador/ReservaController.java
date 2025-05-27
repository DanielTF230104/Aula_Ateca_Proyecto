package com.aulaateca.aulaateca.controlador;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.aulaateca.aulaateca.modelo.Reserva;
import com.aulaateca.aulaateca.repositorio.ReservaRepository;

@RestController
@RequestMapping("/api/reservas")
@CrossOrigin(origins = "*")
public class ReservaController {

    @Autowired
    private ReservaRepository reservaRepository;

    @GetMapping
    public List<Reserva> getAll() {
        return reservaRepository.findAll();
    }

    @GetMapping("/grupo")
    public List<Reserva> buscarPorGrupo(@RequestParam String nombre) {
        return reservaRepository.findByGrupoContainingIgnoreCase(nombre);
    }

    @GetMapping("/proyecto")
    public List<Reserva> buscarPorProyecto(@RequestParam String nombre) {
        return reservaRepository.findByNombreProyectoContainingIgnoreCase(nombre);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Reserva> getById(@PathVariable Long id) {
        return reservaRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Reserva create(@RequestBody Reserva reserva) {
        return reservaRepository.save(reserva);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Reserva> update(@PathVariable Long id, @RequestBody Reserva updated) {
        return reservaRepository.findById(id).map(r -> {
            r.setNombreProyecto(updated.getNombreProyecto());
            r.setMaterial(updated.getMaterial());
            r.setCantidadMaterial(updated.getCantidadMaterial());
            r.setAlumnos(updated.getAlumnos());
            r.setGrupo(updated.getGrupo());
            r.setProfesor(updated.getProfesor());
            r.setPreparacion(updated.isPreparacion());
            r.setFecha(updated.getFecha());
            r.setHoraInicio(updated.getHoraInicio());
            r.setHoraFin(updated.getHoraFin());
            reservaRepository.save(r);
            return ResponseEntity.ok(r);
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        if (reservaRepository.existsById(id)) {
            reservaRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
