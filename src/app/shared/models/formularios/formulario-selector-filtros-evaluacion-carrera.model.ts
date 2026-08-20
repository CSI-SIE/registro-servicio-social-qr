import { FormControl } from '@angular/forms';
import { Validadores } from '../../validators/validadores';

/**
 * Modelo que define la estructura del formulario usado para procesar la
 * información.
 */
export interface FormularioSelectorFiltrosEvaluacionCarrera {
  IdPeriodo: FormControl<number | null>;
  idTronco: FormControl<number | null>;
}

/**
 * Modelo que describe los valores que retorna el formulario.
 */
export interface SelectorFiltrosEvaluacionCarrera {
  IdPeriodo: number;
  idTronco: number;
}

/**
 * Modelo que almacena todos los mensajes de error correspondientes a las vali-
 * daciones que el campo no cumplió.
 */
export interface FormularioSelectorFiltrosEvaluacionCarreraErrores {
  IdPeriodo: string | Validadores;
  idTronco: string | Validadores;
}
