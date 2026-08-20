/**
 * Validadores disponibles para un FormControl tal como se puede leer en:
 * https://angular.io/api/forms/Validators
 */
export interface Validadores {
  min?: string;
  max?: string;
  required?: string;
  requiredTrue?: string;
  email?: string;
  minlength?: string;
  maxlength?: string;
  pattern?: string;
  nullValidator?: string;
  compose?: string;
  composeAsync?: string;
  matEndDateInvalid?: string;
  matDatepickerParse?: string;
  valorPseudoNulo?: string;
}
