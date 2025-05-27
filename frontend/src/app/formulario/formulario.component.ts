import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ReservaService } from '../servicios/reserva.service';
import { Reserva } from '../modelos/reserva.model';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule } from '@angular/forms';

@Component({
  selector: 'app-formulario',
  imports: [CommonModule, FormsModule],
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})

export class FormularioComponent implements OnInit {
  constructor(private router: Router, 
              private reservaService: ReservaService, 
              private route: ActivatedRoute,
              private fb: FormBuilder) {}

  formulario!: FormGroup;
  idReserva?: number;
  modoEdicion = false;

  form: Reserva = {
  nombreProyecto: '',
  material: '',
  cantidadMaterial: 1,
  alumnos: 0,
  grupo: '',
  profesor: '',
  preparacion: false,
  fecha: '',
  horaInicio: '',
  horaFin: ''
  };

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const idParam = params.get('id');
      if (idParam) {
        this.modoEdicion = true;
        this.idReserva = parseInt(idParam);

        this.reservaService.obtenerReservaPorId(this.idReserva).subscribe(data => {
          this.form = data;
        });
      }
    });
  }

  materiales = [
    { nombre: 'Gafas Virtuales', cantidad: 5 },
    { nombre: 'Impresora 3D', cantidad: 2 },
    { nombre: 'Set de grabación', cantidad: 1 },
    { nombre: 'Pizarra de videoconferencia', cantidad: 1 }
  ];

  grupos = ['1º ESO A', '1º ESO B', '2º ESO A', '2º ESO B', '3º ESO A', '3º ESO B', '4º ESO A', '4º ESO B','1º CFGB INF','2º CFGB INF','1º CFGB MAN','2º CFGB MAN'];
  
  idFormulario: string | null = null;

  guardarReserva() {
    if (this.modoEdicion && this.idReserva) {
      this.reservaService.actualizarReserva(this.idReserva, this.form).subscribe(() => {
        alert('Reserva actualizada correctamente');
        this.router.navigate(['/servicios']);
      });
    } else {
      this.reservaService.crearReserva(this.form).subscribe(() => {
        alert('Reserva creada correctamente');
        this.router.navigate(['/servicios']);
      });
    }
  }

  volverInicio() {
    this.router.navigate(['']);
  }

  verReservas(){
    this.router.navigate(['/servicios']);
  }

  obtenerMaximoDisponible(material: string): number {
    const mat = this.materiales.find(m => m.nombre === material);
    return mat ? mat.cantidad : 1;
  }
}
