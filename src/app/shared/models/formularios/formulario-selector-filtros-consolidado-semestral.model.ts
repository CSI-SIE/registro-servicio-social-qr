import { FormControl } from '@angular/forms';
import { Validadores } from '../../validators/validadores';

/**
 * Modelo que define la estructura del formulario usado para procesar la
 * información.
 */
export interface FormularioSelectorFiltrosConsolidadoSemestral {
  IdPeriodo: FormControl<number | null>;
  idTutor: FormControl<number | null>;
}

/**
 * Modelo que describe los valores que retorna el formulario.
 */
export interface SelectorFiltrosConsolidadoSemestral {
  IdPeriodo: number;
  idTutor: number;
}

/**
 * Modelo que almacena todos los mensajes de error correspondientes a las vali-
 * daciones que el campo no cumplió.
 */
export interface FormularioSelectorFiltrosConsolidadoSemestralErrores {
  IdPeriodo: string | Validadores;
  idTutor: string | Validadores;
}
