import { FormControl } from '@angular/forms';
import { Validadores } from '../../validators/validadores';

/**
 * Modelo que define la estructura del formulario usado para procesar la
 * información.
 */
export interface FormularioSelectorFiltrosPorTutorMentor {
  IdPeriodo: FormControl<number | null>;
  IdTronco: FormControl<number | null>;
  idTutor: FormControl<number | null>;
  idTipo: FormControl<number | null>;
}

/**
 * Modelo que describe los valores que retorna el formulario.
 */
export interface SelectorFiltrosPorTutorMentor {
  IdPeriodo: number;
  IdTronco: number;
  idTutor: number;
  idTipo: number;
}

/**
 * Modelo que almacena todos los mensajes de error correspondientes a las vali-
 * daciones que el campo no cumplió.
 */
export interface FormularioSelectorFiltrosPorTutorMentorErrores {
  IdPeriodo: string | Validadores;
  IdTronco: string | Validadores;
  idTutor: string | Validadores;
  idTipo: string | Validadores;
}
