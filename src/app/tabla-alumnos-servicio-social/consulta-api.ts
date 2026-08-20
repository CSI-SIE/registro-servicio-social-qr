import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ServicioBase } from '@csi-sie/ngx-iest-base/services';
import { Observable, takeWhile, map } from 'rxjs';
import { validaSesion } from './models/parametros-api/validaSesion';
import { ConsultaValidaInicioSesion } from './consulta-valida-inicio-sesion';
import { ConsultaRegistrosAlumnosProovedor } from './consulta-registros-alumnos-proovedor';
import { listadoAlumnos } from './models/parametros-api/listadoAlumnos';

@Injectable({
  providedIn: 'root',
})
export class ConsultasService extends ServicioBase {
  private router = inject(Router);

  /**
   * Consulta roles del identificador.
   */
  validaSesion(extras: validaSesion): Observable<ConsultaValidaInicioSesion> {
    const parametros = {
      servicio: 'servicioSocial',
      accion: 'validaSesionProveedor',
      tipoRespuesta: 'json',
    };
    return this.consulta({ ...parametros, ...extras }).pipe(
      takeWhile((respuesta) => {
        if (Object.hasOwnProperty.call(respuesta, 'successs')) {
          this.router.navigate(['/debe-iniciar-sesion-SIE']);
          return false;
        }
        return true;
      }),
      map((sesion: ConsultaValidaInicioSesion[]) => {
        return sesion.map((inicio: ConsultaValidaInicioSesion) => {
          inicio.idOrganizacion = +inicio.idOrganizacion;
          inicio.plazas = +inicio.plazas;
          inicio.Valido = +inicio.Valido;

          return inicio;
        })[0];
      }),
    );
  }

  /**
   * Consulta roles del identificador.
   */
  consultaRegistroAlumnos(extras: listadoAlumnos): Observable<ConsultaRegistrosAlumnosProovedor[]> {
    const parametros = {
      servicio: 'servicioSocial',
      accion: 'listadoAlumnos',
      tipoRespuesta: 'json',
    };
    return this.consulta({ ...parametros, ...extras }).pipe(
      takeWhile((respuesta) => {
        if (Object.hasOwnProperty.call(respuesta, 'successs')) {
          this.router.navigate(['/debe-iniciar-sesion-SIE']);
          return false;
        }
        return true;
      }),
      map((registro: ConsultaRegistrosAlumnosProovedor[]) => {
        return registro.map((alumno: ConsultaRegistrosAlumnosProovedor) => {
          alumno.idPerson = +alumno.idPerson;
          alumno.telefono = +alumno.telefono;
          alumno.inscritos = +alumno.inscritos;

          return alumno;
        });
      }),
    );
  }
}
