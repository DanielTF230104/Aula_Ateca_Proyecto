export interface Reserva {
  id?: number;
  nombreProyecto: string;
  material: string;
  cantidadMaterial: number;
  alumnos: number;
  grupo: string;
  profesor: string;
  preparacion: boolean;
  fecha: string;
  horaInicio: string;
  horaFin: string;
}