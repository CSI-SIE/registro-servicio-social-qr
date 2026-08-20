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
  selector: 'app-dialogo-mensaje-personalizado',
  standalone: true,
  imports: [
    CommonModule,
    HTMLSeguroPipe,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './dialogo-mensaje-personalizado.component.html',
  styleUrls: ['./dialogo-mensaje-personalizado.component.scss'],
})
export class DialogoMensajePersonalizadoComponent {
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
    public matDialogRef: MatDialogRef<DialogoMensajePersonalizadoComponent>,
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
   * Cierra el diálogo.
   */
  cierraDialogo(): void {
    this.matDialogRef.close();
  }
}
