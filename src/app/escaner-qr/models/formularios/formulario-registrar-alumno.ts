import { FormControl } from '@angular/forms';
import { Validadores } from '../../../shared/validators/validadores';

/**
 * Modelo que define la estructura del formulario usado para procesar la
 * información.
 */
export interface FormularioRegistroAlumno {
  idEmpresa: FormControl<number | null>;
  idPersonAlumno: FormControl<number | null>;
  idAlumno: FormControl<number | null>;
  telefono: FormControl<number | null>;
}

/**
 * Modelo que describe los valores que retorna el formulario.
 */
export interface RegistroAlumno {
  idEmpresa: number;
  idPersonAlumno: number;
  idAlumno: number;
  telefono: number;
}

/**
 * Modelo que almacena todos los mensajes de error correspondientes a las vali-
 * daciones que el campo no cumplió.
 */
export interface FormularioRegistroAlumnoErrores {
  idEmpresa: string | Validadores;
  idPersonAlumno: string | Validadores;
  idAlumno: string | Validadores;
  telefono: string | Validadores;
}
