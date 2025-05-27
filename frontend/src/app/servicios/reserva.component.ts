import { Component, OnInit } from '@angular/core';
import { ReservaService } from '../servicios/reserva.service';
import { Reserva } from '../modelos/reserva.model';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FiltroReservasPipe } from "./filtroReservas.pipe";
import { FormsModule } from '@angular/forms';
import { AppComponent } from '../app.component';
import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'app-reserva',
  templateUrl: './reserva.component.html',
  styleUrls: ['./reserva.component.css'],
  imports: [CommonModule, FiltroReservasPipe, FormsModule]
})

export class ReservaComponent implements OnInit {
  filtroTexto: string = '';
  reservas: Reserva[] = [];
  reservasFiltradas: Reserva[] = [];

  constructor(private reservaService: ReservaService, private router: Router) {}

  ngOnInit(): void {
    this.cargarReservas();
  }

  cargarReservas() {
    this.reservaService.obtenerReservas().subscribe({
      next: (data) => this.reservas = data,
      error: (err) => console.error(err)
    });
  }

  eliminarReserva(id: number) {
    this.reservaService.eliminarReserva(id).subscribe({
      next: () => {
        alert("Reserva eliminada");
        this.cargarReservas();
      },
      error: (err) => {
        console.error(err);
        alert("Error eliminando reserva");
      }
    });
  }

  editarReserva(id: number) {
    this.router.navigate([`/formulario/${id}`]);
  }

  volverInicio() {
    this.router.navigate(['']);
  }
}
