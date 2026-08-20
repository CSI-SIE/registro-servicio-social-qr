import { Service } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { InicioSesionCodigo } from './inicio-sesion/models/formularios/formulario-inicio-sesion';

@Service()
export class SesionService {
  private central: BehaviorSubject<any>;
  cambiosPantalla: Observable<any>;

  constructor() {
    this.central = new BehaviorSubject(null);
    this.cambiosPantalla = this.central.asObservable();
  }

  cerrarSesion(): void {
    this.central.next({
      cerrarSesion: null,
    });
  }

  iniciadoSesion(iniciaSesion: InicioSesionCodigo): void {
    this.central.next({
      sesionIniciada: iniciaSesion,
    });
  }

  actualizaResultados(idIest: number): void {
    this.central.next({
      actualizaResultados: {
        idIest,
      },
    });
  }
}
