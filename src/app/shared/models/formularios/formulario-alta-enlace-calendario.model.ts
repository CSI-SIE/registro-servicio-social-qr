import { FormControl } from "@angular/forms";
import { Validadores } from "../../validators/validadores";

export interface FormularioAltaEnlaceCalendario {
  linkCalendario: FormControl<string | null>;
}

export interface AltaEnlaceCalendario {
  linkCalendario: string;
}

export interface FormularioAltaEnlaceCalendarioErrores {
  linkCalendario: string | Validadores;
}
