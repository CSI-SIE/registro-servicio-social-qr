import { Component, EventEmitter, inject, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';

import {
  FormularioConApiComponent,
  LimiteCaracteresTextarea,
} from '@csi-sie/ngx-iest-base/core/formulario-con-api';

import {
  FormularioInicioSesionCodigo as Formulario,
  FormularioInicioSesionCodigoErrores as FormularioErrores,
} from './models/formularios/formulario-inicio-sesion';

@Component({
  selector: 'app-inicio-sesion',
  imports: [
    MatButtonModule,
    MatExpansionModule,
    MatIconModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatSnackBarModule,
    MatTooltipModule,
    ReactiveFormsModule,
  ],
  templateUrl: './inicio-sesion.html',
  styleUrl: './inicio-sesion.scss',
})
export class InicioSesion
  extends FormularioConApiComponent<Formulario, FormularioErrores>
  implements OnDestroy
{
  @Output() inicioSesionCodigo = new EventEmitter();
  /**
   * Límite de caracteres en cada área de texto.
   */
  limiteCaracteres: LimiteCaracteresTextarea[] = [];

  muestraPanelFiltros: boolean;

  /**
   * Repositorio de mensajes de error.
   *
   * ef = errores - formulario
   */
  ef: FormularioErrores = {
    codigoProveedor: '',
  };
  /**
   * Mensajes de error predeterminados para cada validador.
   *
   * mvf = mensajes - validación - formulario
   */
  mvf: FormularioErrores = {
    codigoProveedor: {
      required: 'Requiere el código de inicio de sesión.',
    },
  };

  constructor() {
    const formBuilder = inject(FormBuilder);

    super(
      new FormGroup<Formulario>({
        codigoProveedor: formBuilder.control<string | null>(null, [Validators.required]),
      }),
    );

    this.muestraPanelFiltros = true;
  }

  ngOnDestroy(): void {
    this.limpiaSuscripcionesPendientes();
  }

  /**
   * Oculta el panel de filtros y envía a InicioComponent los cambios realizados
   * por el usuario.
   */
  estableceFiltros(): void {
    this.inicioSesionCodigo.emit(this.formulario.value);
  }
}
