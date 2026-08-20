import { FormControl } from '@angular/forms';
import { Validadores } from '../../validators/validadores';

export interface FormularioAsignaTutor {
  idTutor: FormControl<number | null>;
  idAlumno: FormControl<number | null>;
  idCausa: FormControl<number | null>;
}

export interface AsignaTutor {
  idTutor: number;
  idAlumno: number;
  idCausa: number;
}

export interface FormularioAsignaTutorErrores {
  idTutor: string | Validadores;
  idAlumno: string | Validadores;
  idCausa: string | Validadores;
}
