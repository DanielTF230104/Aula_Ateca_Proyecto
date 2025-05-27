import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtroReservas'
})
export class FiltroReservasPipe implements PipeTransform {
  transform(reservas: any[], texto: string): any[] {
    if (!texto) return reservas;
    texto = texto.toLowerCase();
    return reservas.filter(r =>
      r.proyecto.toLowerCase().includes(texto) ||
      r.grupo.toLowerCase().includes(texto)
    );
  }
}
