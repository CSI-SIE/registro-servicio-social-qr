import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

/**
 * En el caso de los formularios con los que yo trabajo, suelo colocar un -17 a
 * la opción de un cuadro de selección que no es en sí una opción válida pero
 * que está ahí para informar algo.
 *
 * Por ejemplo:
 *
 *    <mat-option [value]="-17">Selecciona una opción</mat-option>
 *    <mat-option [value]="1">Opción A</mat-option>
 *    <mat-option [value]="2">Opción B</mat-option>
 *    <mat-option [value]="3">Opción C</mat-option>
 *
 * Pero hacer eso, da un falso positivo en la validación del formulario por lo
 * que es necesario indicarle a Angular que el valor -17 (o cualquier otro
 * elegido para fungir como pseudo-nulo) no es una opción válida antes de
 * permitir continuar.
 *
 * @returns Verdadero si el control tiene un valor pseudo-nulo o nulo si no.
 */
export function creaValidadorValorPseudoNulo(
  nuloAlternativo: string | number = -17,
): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const existeValorPseudoNulo = [null, nuloAlternativo].includes(
      control.value || '',
    );
    return !existeValorPseudoNulo || control.value === ''
      ? null
      : { valorPseudoNulo: true };
  };
}
