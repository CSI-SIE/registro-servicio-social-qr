export interface SeguimientoReunionTutorMentor {
  idTutoria: number;
  asistio: boolean;
  horaInicio: Date | string;
  horaFin: Date | string;
  idTema: number;
  idActitud: number;
  compromisos: string;
  canalizacion: boolean;
  idCanaliza: number;
  comentariosCanaliza: string;
  idMotivoCanaliza: number;
  //cometariosGenerales: string;
}
