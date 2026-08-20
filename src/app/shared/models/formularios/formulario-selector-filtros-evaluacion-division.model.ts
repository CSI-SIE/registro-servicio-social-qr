import { FormControl } from '@angular/forms';
import { Validadores } from '../../validators/validadores';

/**
 * Modelo que define la estructura del formulario usado para procesar la
 * información.
 */
export interface FormularioSelectorFiltrosEvaluacionDivision {
  IdPeriodo: FormControl<number | null>;
  idDivision: FormControl<number | null>;
}

/**
 * Modelo que describe los valores que retorna el formulario.
 */
export interface SelectorFiltrosEvaluacionDivision {
  IdPeriodo: number;
  idDivision: number;
}

/**
 * Modelo que almacena todos los mensajes de error correspondientes a las vali-
 * daciones que el campo no cumplió.
 */
export interface FormularioSelectorFiltrosEvaluacionDivisionErrores {
  IdPeriodo: string | Validadores;
  idDivision: string | Validadores;
}
