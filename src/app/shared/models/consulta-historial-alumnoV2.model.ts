export interface ConsultaHistorialAlumnoV2 {
  idIest: number;
  nombreAlumno: string;
  programaAcademico: string;
  estatusAlumno: string;
  periodosCursados: number;
  ultimoPeriodoCursado: string;
  promedioAritmetico: number;
  promedioPonderado: number;
  totalMateriasCursadas: number;
  totaldeMateriasAprobadas: number;
  totalCreditosObtenidosGeneral: number;
  totalCreditosObtenidosEgreso: string;
  porcentajeAvance: string;
  totalCreditosCursando: number;
  nombreTutor: string;
  correoAlumno: string;
  foto: string;
}
