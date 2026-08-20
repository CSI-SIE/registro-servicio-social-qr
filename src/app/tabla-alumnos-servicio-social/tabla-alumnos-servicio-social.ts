import {
  Component,
  inject,
  Input,
  OnInit,
  output,
  signal,
  TrackByFunction,
  WritableSignal,
} from '@angular/core';

//Importes de NGX-IEST
import { ColumnaTabla, TablaConApiComponent } from '@csi-sie/ngx-iest-base/core/tabla-con-api';

import { MatDialog } from '@angular/material/dialog';

//Importes Angular Material
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

//Importes formulario
import { InicioSesionCodigo } from '../inicio-sesion/models/formularios/formulario-inicio-sesion';

//Importes services
import { ConsultasService } from './consulta-api';
import { ConsultaValidaInicioSesion } from './consulta-valida-inicio-sesion';
import { ConsultaRegistrosAlumnosProovedor } from './consulta-registros-alumnos-proovedor';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tabla-alumnos-servicio-social',
  imports: [
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatListModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatSortModule,
    MatTableModule,
  ],
  templateUrl: './tabla-alumnos-servicio-social.html',
  styleUrl: './tabla-alumnos-servicio-social.scss',
})
export class TablaAlumnosServicioSocial
  extends TablaConApiComponent<ConsultaRegistrosAlumnosProovedor>
  implements OnInit
{
  /**
   * Inyección de dependencias
   */
  consultasService = inject(ConsultasService);
  matDialog = inject(MatDialog);
  /**
   * Detalles de la validez de sesión.
   */
  validezInicioSesion: WritableSignal<ConsultaValidaInicioSesion | null>;

  @Input() inicioSesionCodigo!: InicioSesionCodigo | null;
  cerrarSesionEvent = output<void>();
  /**
   * Nombre del componente actual
   */
  componente: string;
  /**
   *
   * Estructura de las columnas con sus propiedades de visibilidad.
   */
  columnasTabla: ColumnaTabla[];

  // eslint-disable-next-line @angular-eslint/prefer-inject
  constructor(private router: Router) {
    super();

    this.componente = 'TablaAlumnosServicioSocial';

    this.columnasTabla = [
      { campo: 'idPerson', oculto: false },
      { campo: 'nombre', oculto: false },
      { campo: 'carrera', oculto: false },
      { campo: 'correo', oculto: false },
      { campo: 'telefono', oculto: false },
    ];

    this.validezInicioSesion = signal(null);
  }

  ngOnInit(): void {
    this.recuperaValidezInicioSesion();
  }

  /**
   * Obten desde la API los detalles del evento seleccionado.
   */
  private recuperaValidezInicioSesion(): void {
    this.muestraIndicadorCarga.set(true);

    if (this.inicioSesionCodigo) {
      const validaSesion$ = this.consultasService
        .validaSesion({
          codigoProveedor: this.inicioSesionCodigo.codigoProveedor,
        })
        .subscribe({
          next: (detalles) => {
            this.validezInicioSesion.set(detalles);
            this.muestraIndicadorCarga.set(false);

            if (this.validezInicioSesion()!.Valido === 1) {
              this.consultaRegistroAlumnos();
            } else {
              window.alert('Código incorrecto. Por favor, actualice la página.');
            }
          },
          error: (errores) => {
            console.log(errores);
            if (!this.errorConexion()) {
              this.muestraMensajeErrorConexion();
              this.errorConexion.set(true);
            }
          },
        });
      this.suscripciones.update((suscripciones) => [...suscripciones, ...new Array(validaSesion$)]);
    }
  }

  /**
   * Esta función acelera los cambios realizados en la tabla al permitirle a
   * Angular sólo actualizar lo que ha cambiado en lugar de destruir todas las
   * filas y volverlas a crear.
   *
   * @param _ Índice del elemento en la actual iteración.
   * @param elemento Elemento en la actual iteración.
   *
   * @returns Identificador único.
   */
  fnSeguimiento: TrackByFunction<ConsultaRegistrosAlumnosProovedor> = (_, element) => element;

  private consultaRegistroAlumnos(): void {
    if (!this.cantidadElementosPaginaTabla) {
      this.muestraIndicadorCarga.set(true);
    }
    const consultaRegistroAlumnos$ = this.consultasService
      .consultaRegistroAlumnos({
        idEmpresa: this.validezInicioSesion()!.idOrganizacion,
      })
      .subscribe({
        next: (listado) => {
          this.tabla.data = listado;

          if (!this.cantidadElementosPaginaTabla) {
            this.muestraIndicadorCarga.set(false);
          }
        },
        error: (errores) => {
          //console.log(errores);
          if (!this.errorConexion()) {
            this.muestraMensajeErrorConexion();
            this.errorConexion.set(true);
          }
        },
      });
    this.suscripciones.update((suscripciones) => [...suscripciones, consultaRegistroAlumnos$]);
  }

  async abreDialogoEscaneoQR(): Promise<void> {
    const matSnackBarConfirmacion = this.matSnackBar.open(`Cargando diálogo...`, '', {
      duration: 600000,
      horizontalPosition: 'left',
      verticalPosition: 'bottom',
    });

    const { EscanerQr } = await import('../escaner-qr/escaner-qr').finally(() => {
      matSnackBarConfirmacion.dismiss();
    });

    const referenciaDialogoEscanerQr = this.matDialog.open(EscanerQr, {
      data: {
        idEmpresa: this.validezInicioSesion()?.idOrganizacion,
      },
    });
    referenciaDialogoEscanerQr.afterClosed().subscribe({
      next: (respuesta) => {
        if (respuesta === 1) {
          this.consultaRegistroAlumnos();
        }
      },
    });
  }
}
