export interface ConsultaReportePorTutorMentor {
  IdIestAlumno: number;
  nombre: string;
  Clasificacion: string;
  abrCarrera: string;
  idtronco: number;
  tutor: string;
  IdIestTutor: number;
  TotalReuniones: number;
  TotalProgramadas: number;
  validadasProgramadas: number;
  noValidadasProgramadas: number;
  TotalnoProgramadas: number;
  validadasNoProgramadas: number;
  noValidadasNoProgramadas: number;
  numCanalizados: number;
  pendientes: number;
  noAsistio: number;
  Mentoria: string;
  correo: string;
}
