import { FormControl } from '@angular/forms';
import { Validadores } from '../../validators/validadores';

export interface FormularioRegistraReunion {
  idAlumno: FormControl<number | null>;
  //comentarios: FormControl<string | null>;
  proximaCita: FormControl<Date | string | null>;
  idModalidad: FormControl<number | null>;
  idMotivo: FormControl<number | null>;
  proximaCitaAux: FormControl<Date | string | null>;
}

export interface RegistraReunion {
  idAlumno: number;
  //comentarios: string;
  proximaCita: string;
  idModalidad: number;
  idMotivo: number;
  proximaCitaAux: string;
}

export interface FormularioRegistraReunionErrores {
  idAlumno: string | Validadores;
  //comentarios: string | Validadores;
  proximaCita: string | Validadores;
  idModalidad: string | Validadores;
  idMotivo: string | Validadores;
  proximaCitaAux: string | Validadores;
}
