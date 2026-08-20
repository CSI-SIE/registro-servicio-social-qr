import { FormControl } from '@angular/forms';
import { Validadores } from '../../validators/validadores';

/**
 * Modelo que define la estructura del formulario usado para reportar una falla.
 */
export interface FormularioDarAltaTutor {
  idTutor: FormControl<number | null>;
  idGrado: FormControl<number | null>;
}

/**
 * Modelo que describe los valores que retorna el formulario.
 */
export interface DarAltaTutor {
  idTutor: number;
  idGrado: number;
}

/**
 * Modelo que almacena todos los mensajes de error correspondientes a las vali-
 * daciones que el campo no cumplió.
 */
export interface FormularioDarAltaTutorErrores {
  idTutor: string | Validadores;
  idGrado: string | Validadores;
}
