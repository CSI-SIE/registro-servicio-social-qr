import { FormControl } from '@angular/forms';
import { Validadores } from '../../validators/validadores';

export interface FormularioEditadoReunion {
  idTutoria: FormControl<number | null>;
  asistio: FormControl<number | null>;
  horaInicio: FormControl<Date | string | null>;
  horaFin: FormControl<Date | string | null>;
  idTema: FormControl<number | null>;
  textoOtros: FormControl<string | null>;
  idActitud: FormControl<number | null>;
  compromisos: FormControl<string | null>;
  canalizacion: FormControl<number | null>;
  idMotivoCanaliza: FormControl<number | null>;
  origenCanaliza: FormControl<number | null>;
  idCanaliza: FormControl<number | null>;
  textoOtrosCanaliza: FormControl<string | null>;
  comentariosCanaliza: FormControl<string | null>;
  comentariosGenerales: FormControl<string | null>;
}

export interface EditadoReunion {
  idTutoria: number;
  asistio: number;
  horaInicio: string;
  horaFin: string;
  idTema: number;
  textoOtros: string;
  idActitud: number;
  compromisos: string;
  canalizacion: number;
  idMotivoCanaliza: number;
  origenCanaliza: number;
  idCanaliza: number;
  textoOtrosCanaliza: string;
  comentariosCanaliza: string;
  comentariosGenerales: string;
}

export interface FormularioEditadoReunionErrores {
  idTutoria: string | Validadores;
  asistio: string | Validadores;
  horaInicio: string | Validadores;
  horaFin: string | Validadores;
  idTema: string | Validadores;
  textoOtros: string | Validadores;
  idActitud: string | Validadores;
  compromisos: string | Validadores;
  canalizacion: string | Validadores;
  idMotivoCanaliza: string | Validadores;
  origenCanaliza: string | Validadores;
  idCanaliza: string | Validadores;
  textoOtrosCanaliza: string | Validadores;
  comentariosCanaliza: string | Validadores;
  comentariosGenerales: string | Validadores;
}
