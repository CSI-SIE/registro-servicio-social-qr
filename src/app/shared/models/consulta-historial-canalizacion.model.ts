export interface ConsultaHistorialCanalizacion {
  idCanalizacion: number;
  FechaSolicitada: Date | string;
  motivo: string;
  idSolicita: number;
  nombreSolicita: string;
  origen: string;
  destino: string;
  validado: boolean;
  fechaAtencion: string;
  idAtendio: number;
  nombreAtendio: string;
}
