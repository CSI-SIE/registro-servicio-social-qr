import { FormControl } from '@angular/forms';
import { Validadores } from '../../validators/validadores';

/**
 * Modelo que define la estructura del formulario usado para procesar la
 * información.
 */
export interface FormularioSelectorFiltros {
  tipoFiltro: FormControl<number | null>;
  idTronco: FormControl<number | null>;
  idTipoAlumno: FormControl<number | null>;
}

/**
 * Modelo que describe los valores que retorna el formulario.
 */
export interface SelectorFiltros {
  tipoFiltro: number;
  idTronco: number;
  idTipoAlumno: number;
}

/**
 * Modelo que almacena todos los mensajes de error correspondientes a las vali-
 * daciones que el campo no cumplió.
 */
export interface FormularioSelectorFiltrosErrores {
  tipoFiltro: string | Validadores;
  idTronco: string | Validadores;
  idTipoAlumno: string | Validadores;
}
