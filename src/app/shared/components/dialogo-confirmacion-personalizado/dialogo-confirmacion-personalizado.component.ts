import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';


import {
  MatDialogModule,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { HTMLSeguroPipe } from '../../pipes/html-seguro/html-seguro.pipe';

@Component({
  selector: 'app-dialogo-confirmacion-personalizado',
  standalone: true,
  imports: [
    CommonModule,
    HTMLSeguroPipe,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './dialogo-confirmacion-personalizado.component.html',
  styleUrls: ['./dialogo-confirmacion-personalizado.component.scss'],
})
export class DialogoConfirmacionPersonalizadoComponent {
  /**
   * Bandera para decirle a Angular que está bien interpretar el código HTML
   * proporcionado porque confías en él aún cuando puede ser potencialmente
   * peligroso.
   */
  HTMLdeConfianza: boolean;

  /**
   * Procesa los datos recibidos.
   *
   * @param matDialogRef Se inicializa una referencia a este mismo diálogo.
   * @param datos Datos de cualquier tipo enviados por el componente que invocó
   *     este diálogo.
   */
  constructor(
    public matDialogRef: MatDialogRef<DialogoConfirmacionPersonalizadoComponent>,
    @Inject(MAT_DIALOG_DATA)
    public datos: {
      titulo?: string;
      mensaje: string;
      HTMLdeConfianza?: boolean;
    },
  ) {
    if (Object.hasOwnProperty.call(this.datos, 'HTMLdeConfianza')) {
      this.HTMLdeConfianza = true;
    } else {
      this.HTMLdeConfianza = false;
    }
  }

  /**
   * Cierra el diálogo y devuelve al componente origen el valor establecido por
   * el usuario.
   *
   * @param respuesta 1 si confirma su decisión o un 0 para indicar que el
   *     usuario cambió de opinión.
   */
  cierraDialogo(respuesta: number): void {
    this.matDialogRef.close(respuesta);
  }
}
