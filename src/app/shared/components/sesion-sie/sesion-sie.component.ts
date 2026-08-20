import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

/**
 * Este componente advierte al usuario que ha perdido (o no ha ingresado) su
 * sesión en el SIE y le invita a ingresar nuevamente sus credenciales. La
 * sesión es un requisito para poder trabajar en el módulo y continuar sin ella
 * derivará en errores o corrupción de datos.
 */
@Component({
  selector: 'app-sesion-sie',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule],
  templateUrl: './sesion-sie.component.html',
  styleUrls: ['./sesion-sie.component.scss'],
})
export class SesionSIEComponent {
  /**
   * Redirige al formulario de inicio de sesión en el SIE.
   */
  cargaInicioSesionSIE(): void {
    window.location.replace('https://sie.iest.edu.mx');
  }
}
