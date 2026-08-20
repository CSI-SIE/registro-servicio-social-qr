import { FormControl } from '@angular/forms';
import { Validadores } from '../../../shared/validators/validadores';

/**
 * Modelo que define la estructura del formulario usado para procesar la
 * información.
 */
export interface FormularioInicioSesionCodigo {
  codigoProveedor: FormControl<string | null>;
}

/**
 * Modelo que describe los valores que retorna el formulario.
 */
export interface InicioSesionCodigo {
  codigoProveedor: string;
}

/**
 * Modelo que almacena todos los mensajes de error correspondientes a las vali-
 * daciones que el campo no cumplió.
 */
export interface FormularioInicioSesionCodigoErrores {
  codigoProveedor: string | Validadores;
}
