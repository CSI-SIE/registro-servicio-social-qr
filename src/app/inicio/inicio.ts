import { Component, inject, OnDestroy, signal, WritableSignal } from '@angular/core';
import { TablaAlumnosServicioSocial } from '../tabla-alumnos-servicio-social/tabla-alumnos-servicio-social';
import { InicioSesion } from '../inicio-sesion/inicio-sesion';
import { BaseConApiComponent } from '@csi-sie/ngx-iest-base/core/base-con-api';
import { InicioSesionCodigo } from '../inicio-sesion/models/formularios/formulario-inicio-sesion';
import { SesionService } from '../sesion-service';
import { ConsultasService } from '../tabla-alumnos-servicio-social/consulta-api';
import { ConsultaValidaInicioSesion } from '../tabla-alumnos-servicio-social/consulta-valida-inicio-sesion';

@Component({
  selector: 'app-inicio',
  imports: [InicioSesion, TablaAlumnosServicioSocial],
  templateUrl: './inicio.html',
  styleUrl: './inicio.scss',
})
export class Inicio extends BaseConApiComponent implements OnDestroy {
  inicioSesionCodigo: WritableSignal<InicioSesionCodigo | null>;
  validezInicioSesion: WritableSignal<ConsultaValidaInicioSesion | null>;
  consultasService = inject(ConsultasService);
  sesionService = inject(SesionService);

  constructor() {
    super();
    this.inicioSesionCodigo = signal(null);
    this.validezInicioSesion = signal(null);

    const sesion$ = this.sesionService.cambiosPantalla.subscribe({
      next: (cambios) => {
        if (cambios && Object.hasOwn(cambios, 'cerrarSesion')) {
          this.inicioSesionCodigo.set(cambios.cerrarSesion);
        }
      },
    });
    this.suscripciones.update((suscripciones) => [...suscripciones, ...new Array(sesion$)]);
  }

  ngOnDestroy(): void {
    this.suscripciones().forEach((suscripcion) => {
      suscripcion.unsubscribe();
    });
  }

  procesaInicioSesionCodigo(inicioSesionCodigo: InicioSesionCodigo): void {
    // this.inicioSesionCodigo.set(inicioSesionCodigo);
    // this.sesionService.iniciadoSesion(inicioSesionCodigo);
    const validaSesion$ = this.consultasService
      .validaSesion({
        codigoProveedor: inicioSesionCodigo.codigoProveedor,
      })
      .subscribe({
        next: (detalles) => {
          this.validezInicioSesion.set(detalles);

          if (detalles.Valido === 1) {
            this.inicioSesionCodigo.set(inicioSesionCodigo);
            this.sesionService.iniciadoSesion(inicioSesionCodigo);
          } else {
            window.alert('Código incorrecto.');
          }
        },
        error: (errores) => {
          console.log(errores);
        },
      });

    this.suscripciones.update((suscripciones) => [...suscripciones, validaSesion$]);
  }

  cerrarSesion(): void {
    this.inicioSesionCodigo.set(null);
  }
}
