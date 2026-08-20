import { Injectable } from '@angular/core';
import { ServicioBase } from '@csi-sie/ngx-iest-base/services';
import { RegistroAlumno } from './models/parametros-api/registroAlumno';
import { ProcesoRegistraAlumno } from './proceso-registra-alumno';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProcesosService extends ServicioBase {
  constructor() {
    super();
  }

  /**
   * Proceso dar de alta tutor/mentor.
   */
  registroAlumno(extras: RegistroAlumno): Observable<ProcesoRegistraAlumno> {
    const parametros = {
      servicio: 'procesos',
      accion: 'registra',
      tipoRespuesta: 'json',
    };
    return this.consulta({ ...parametros, ...extras }).pipe(
      map((respuesta) => {
        respuesta[0].error = +respuesta[0].error;

        return respuesta[0];
      }),
    );
  }
}
