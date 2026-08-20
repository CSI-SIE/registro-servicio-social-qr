import { FormControl } from '@angular/forms';

export interface formularioBuscadorTutores {
  palabraClave: FormControl<string | null>;
  idPerson: FormControl<number | null>;
  //idGrado: FormControl<number | null>;
}