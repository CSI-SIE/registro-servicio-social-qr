import {
  AfterViewInit,
  Component,
  inject,
  OnDestroy,
  output,
  signal,
  WritableSignal,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { EscanerQr } from './escaner-qr/escaner-qr';
import { Html5Qrcode, Html5QrcodeSupportedFormats } from 'html5-qrcode';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { BaseConApiComponent } from '@csi-sie/ngx-iest-base/core/base-con-api';
import { MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { InicioSesionCodigo } from './inicio-sesion/models/formularios/formulario-inicio-sesion';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SesionService } from './sesion-service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatButtonModule, MatIconModule, MatToolbarModule, EscanerQr],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App extends BaseConApiComponent {
  /**
   * Nombre de la aplicación. En lugar más notorio donde se puede ver es en la
   * barra principal.
   */
  readonly NOMBRE_APLICACION = 'Registro servicio social';

  matDialog = inject(MatDialog);
  ///matSnackBar = inject(MatSnackBar);
  sesionService = inject(SesionService);

  inicioSesionCodigo: WritableSignal<InicioSesionCodigo | null>;

  cerrarSesionEvent = output<void>();
  //suscripciones: Subscription[];

  constructor() {
    super();
    this.inicioSesionCodigo = signal(null);
    //this.suscripciones = [];

    const sesion$ = this.sesionService.cambiosPantalla.subscribe({
      next: (cambios) => {
        if (cambios && Object.hasOwn(cambios, 'sesionIniciada')) {
          this.inicioSesionCodigo.set(cambios.sesionIniciada);
        }
      },
    });
    this.suscripciones.update((suscripciones) => [...suscripciones, ...new Array(sesion$)]);
  }

  async cerrarSesionProovedor(): Promise<void> {
    const matSnackBarConfirmacion = this.matSnackBar.open(`Cargando diálogo...`, '', {
      duration: 600000,
      horizontalPosition: 'left',
      verticalPosition: 'bottom',
    });
    const { DialogoConfirmacionPersonalizadoComponent } =
      await import('./shared/components/dialogo-confirmacion-personalizado/dialogo-confirmacion-personalizado.component').finally(
        () => {
          matSnackBarConfirmacion.dismiss();
        },
      );

    const matSnackBarMensaje = this.matSnackBar.open(`Cargando diálogo...`, '', {
      duration: 600000,
      horizontalPosition: 'left',
      verticalPosition: 'bottom',
    });
    const { DialogoMensajePersonalizadoComponent } =
      await import('./shared/components/dialogo-mensaje-personalizado/dialogo-mensaje-personalizado.component').finally(
        () => {
          matSnackBarMensaje.dismiss();
        },
      );

    const confirmacion = this.matDialog.open(DialogoConfirmacionPersonalizadoComponent, {
      data: {
        titulo: 'Atención',
        mensaje: `¿Desea cerrar sesión?`,
      },
      minWidth: '300px',
    });

    confirmacion.afterClosed().subscribe({
      next: (respuesta) => {
        if (respuesta === 1) {
          this.inicioSesionCodigo.set(null);
          this.sesionService.cerrarSesion();
        }
      },
    });
  }

  // private scanner?: Html5Qrcode;

  // qrResult = signal<string | null>(null);
  // errorMessage = signal<string | null>(null);
  // scanning = signal(false);

  // ngAfterViewInit(): void {
  //   this.startScanner();
  // }

  // startScanner(): void {
  //   this.errorMessage.set(null);
  //   this.qrResult.set(null);

  //   this.scanner = new Html5Qrcode('qr-reader');

  //   const config = {
  //     fps: 10,
  //     qrbox: {
  //       width: 250,
  //       height: 250,
  //     },
  //   };

  //   this.scanner
  //     .start(
  //       { facingMode: 'environment' },
  //       config,
  //       (decodedText) => {
  //         this.onQrCodeScanned(decodedText);
  //       },
  //       () => {
  //         // Se ejecuta cuando un frame no contiene un QR.
  //         // No necesitamos hacer nada aquí.
  //       },
  //     )
  //     .then(() => {
  //       this.scanning.set(true);
  //     })
  //     .catch((error) => {
  //       console.error('Error al iniciar cámara:', error);

  //       this.errorMessage.set('No fue posible acceder a la cámara.');
  //     });
  // }

  // private onQrCodeScanned(decodedText: string): void {
  //   console.log('QR detectado:', decodedText);

  //   this.qrResult.set(decodedText);

  //   this.stopScanner();
  // }

  // stopScanner(): void {
  //   if (!this.scanner) {
  //     return;
  //   }

  //   this.scanner
  //     .stop()
  //     .then(() => {
  //       this.scanning.set(false);
  //     })
  //     .catch((error) => {
  //       console.error('Error al detener scanner:', error);
  //     });
  // }

  // ngOnDestroy(): void {
  //   this.stopScanner();
  // }
}
