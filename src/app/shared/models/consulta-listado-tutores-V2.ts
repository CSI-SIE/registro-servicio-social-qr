export interface ConsultaListadoTutoresV2 {
  idPerson: number;
  tutor: string;
  personAlta: string;
  fechaRegistro: Date | string;
  alumnos: number;
  nombreTutorCorto: string;
}
