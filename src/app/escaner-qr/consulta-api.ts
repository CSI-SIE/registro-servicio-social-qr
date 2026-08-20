import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ServicioBase } from '@csi-sie/ngx-iest-base/services';
import { Observable, takeWhile, map } from 'rxjs';
import { lecturaQR } from './models/parametros-api/lecturaQR';
import { ConsultaEscaneoQR } from './consulta-escaneo-qr';

@Injectable({
  providedIn: 'root',
})
export class ConsultasService extends ServicioBase {
  private router = inject(Router);

  /**
   * Consulta roles del identificador.
   */
  lecturaQR(extras: lecturaQR): Observable<ConsultaEscaneoQR> {
    const parametros = {
      servicio: 'servicioSocial',
      accion: 'lecturaQR',
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
      map((qr: ConsultaEscaneoQR[]) => {
        return qr.map((escaneo: ConsultaEscaneoQR) => {
          escaneo.idIest = +escaneo.idIest;
          escaneo.valido = +escaneo.valido;
          escaneo.idAlumno = +escaneo.idAlumno;

          return escaneo;
        })[0];
      }),
    );
  }
}
